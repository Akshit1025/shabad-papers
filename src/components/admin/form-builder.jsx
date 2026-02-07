/**
 * @fileOverview A comprehensive form builder for creating and editing dynamic form definitions.
 */
'use client';

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader, PlusCircle, Trash2, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const optionSchema = z.object({
  value: z.string().min(1, { message: "Option value cannot be empty." }),
});

const fieldSchema = z.object({
  name: z.string().min(1, 'Name is required').regex(/^[a-zA-Z0-9_]+$/, 'Name must be a valid variable name (letters, numbers, underscore)'),
  label: z.string().min(1, 'Label is required'),
  type: z.enum(['text', 'email', 'textarea', 'number', 'dropdown']),
  placeholder: z.string().optional(),
  required: z.boolean().default(false),
  multiple: z.boolean().default(false),
  errorMessage: z.string().optional(),
  options: z.array(optionSchema).optional(),
  info: z.string().optional(),
}).refine(data => {
    if (data.type === 'dropdown') {
        return data.options && data.options.length > 0;
    }
    return true;
}, {
    message: 'At least one option is required for dropdown fields.',
    path: ['options'],
});

const formBuilderSchema = z.object({
  id: z.string().min(2, 'ID must be at least 2 characters').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'ID must be lowercase and contain no spaces.'),
  title: z.string().min(2, 'Title must be at least 2 characters.'),
  description: z.string().optional(),
  fields: z.array(fieldSchema).min(1, 'At least one field is required.'),
});


function FieldOptions({ fieldIndex, control }) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `fields.${fieldIndex}.options`
    });

    return (
        <div className="col-span-12 space-y-3">
            <FormLabel>Dropdown Options</FormLabel>
            {fields.map((item, k) => (
                <FormField
                    key={item.id}
                    control={control}
                    name={`fields.${fieldIndex}.options.${k}.value`}
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex items-center gap-2">
                                <FormControl>
                                    <Input placeholder={`Option ${k + 1}`} {...field} />
                                </FormControl>
                                <Button type="button" variant="destructive" size="icon" onClick={() => remove(k)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            ))}
             <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ value: '' })}
            >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Option
            </Button>
        </div>
    );
}

export function FormBuilder({ onClose, formDefinition }) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const isEditMode = !!formDefinition;

  const form = useForm({
    resolver: zodResolver(formBuilderSchema),
    defaultValues: {
      id: '',
      title: '',
      description: '',
      fields: [],
    },
  });

  const { control, reset, watch, setValue, formState: { errors } } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fields',
  });
  
  const watchedTitle = watch('title');
  const watchedFields = watch('fields');

  useEffect(() => {
    if (watchedTitle && !isEditMode) {
      const id = watchedTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      setValue('id', id, { shouldValidate: true });
    }
  }, [watchedTitle, isEditMode, setValue]);

  useEffect(() => {
    if (isEditMode && formDefinition) {
       reset({
        ...formDefinition,
        fields: (formDefinition.fields || []).map(field => ({
          ...field,
          placeholder: field.placeholder || '',
          errorMessage: field.errorMessage || '',
          info: field.info || '',
          options: Array.isArray(field.options) ? field.options.map(opt => ({ value: opt })) : [],
        })),
      });
    } else {
      reset({
        id: '',
        title: '',
        description: '',
        fields: [{ name: 'name', label: 'Your Name', type: 'text', required: true, placeholder: 'John Doe', options: [], info: '', errorMessage: '' }],
      });
    }
  }, [formDefinition, isEditMode, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const dataToSave = {
        ...data,
        fields: data.fields.map(field => {
          const newField = { ...field };
          if (field.type === 'dropdown' && Array.isArray(field.options)) {
            newField.options = field.options.map(opt => opt.value);
          } else if (field.type !== 'dropdown') {
            delete newField.options;
          }
          return newField;
        })
      };

      const formRef = doc(db, 'formDefinitions', data.id);
      await setDoc(formRef, dataToSave, { merge: isEditMode });
      toast({
        title: 'Success',
        description: `Form definition "${data.title}" saved successfully.`,
      });
      onClose();
    } catch (error) {
      console.error('Error saving form definition: ', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save form definition.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditMode ? 'Edit Form Definition' : 'Create New Form'}</CardTitle>
        <CardDescription>
          {isEditMode ? 'Update the details of this inquiry form.' : 'Build a new inquiry form for your products.'}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Form Title</FormLabel>
                    <FormControl><Input placeholder="e.g., Paper Inquiry" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Form ID (Slug)</FormLabel>
                    <FormControl><Input placeholder="e.g., paper-inquiry" {...field} disabled={isEditMode} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl><Textarea placeholder="A short description for the form dialog." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Form Fields</h3>
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="grid grid-cols-12 gap-x-4 gap-y-2 rounded-lg border p-4 relative">
                    <div className="col-span-12 md:col-span-3">
                        <FormField
                            control={control}
                            name={`fields.${index}.name`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Field Name</FormLabel>
                                    <FormControl><Input placeholder="customer_name" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                     <div className="col-span-12 md:col-span-3">
                        <FormField
                            control={control}
                            name={`fields.${index}.label`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Field Label</FormLabel>
                                    <FormControl><Input placeholder="Your Name" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="col-span-12 md:col-span-3">
                       <FormField
                          control={control}
                          name={`fields.${index}.type`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                <SelectContent>
                                  <SelectItem value="text">Text</SelectItem>
                                  <SelectItem value="email">Email</SelectItem>
                                  <SelectItem value="textarea">Textarea</SelectItem>
                                  <SelectItem value="number">Number</SelectItem>
                                  <SelectItem value="dropdown">Dropdown</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                    </div>
                    <div className="col-span-12 md:col-span-3">
                      <div className="flex gap-4 h-full items-center">
                        <FormField
                          control={control}
                          name={`fields.${index}.required`}
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 flex-1">
                              <FormLabel>Required</FormLabel>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        {watchedFields[index].type === 'dropdown' && (
                           <FormField
                              control={control}
                              name={`fields.${index}.multiple`}
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 flex-1">
                                  <FormLabel>Multiple</FormLabel>
                                  <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                        )}
                      </div>
                    </div>
                    
                    {watchedFields[index].type === 'dropdown' ? (
                       <FieldOptions fieldIndex={index} control={control} />
                    ) : (
                        <div className="col-span-12 md:col-span-6">
                            <FormField
                                control={control}
                                name={`fields.${index}.placeholder`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Placeholder (Optional)</FormLabel>
                                        <FormControl><Input placeholder="e.g. John Doe" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}

                     <div className="col-span-12 md:col-span-6">
                        <FormField
                            control={control}
                            name={`fields.${index}.errorMessage`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Error Message (Optional)</FormLabel>
                                    <FormControl><Input placeholder="Please enter your name" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        <FormField
                            control={control}
                            name={`fields.${index}.info`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Info Tooltip (Optional)</FormLabel>
                                    <FormControl><Input placeholder="Help text for the user" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => remove(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
               {errors.fields?.root && <p className="text-sm font-medium text-destructive">{errors.fields.root.message}</p>}
               {errors.fields && !errors.fields.root && <p className="text-sm font-medium text-destructive">There are errors in the form fields above.</p>}
              <Button type="button" variant="outline" onClick={() => append({ name: '', label: '', type: 'text', required: false, placeholder: '', options: [], errorMessage: '', info: '' })}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Field
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              {isEditMode ? 'Save Changes' : 'Create Form'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
