'use client';

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { doc, addDoc, setDoc, collection, serverTimestamp } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Loader, PlusCircle, Trash2, UploadCloud } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  slug: z.string().min(2, { message: 'Slug must be at least 2 characters.' }).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: 'Slug must be lowercase and contain no spaces.'}),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  longDescription: z.string().optional(),
  order: z.coerce.number().int().min(0, { message: 'Order must be a positive number.' }),
  visible: z.boolean().default(true),
  hasSubProducts: z.boolean().default(false),
  image: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  media: z.array(z.object({ value: z.string().url({ message: "Please enter a valid URL." }) })),
  benefits: z.array(z.object({ value: z.string().min(1, "Benefit cannot be empty.") })),
  applications: z.array(z.object({ value: z.string().min(1, "Application cannot be empty.") })),
});

export function CategoryForm({ onClose, category }) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const isEditMode = !!category;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      longDescription: '',
      order: 0,
      visible: true,
      hasSubProducts: false,
      image: '',
      media: [],
      benefits: [],
      applications: [],
    },
  });
  
  const { control, watch, setValue, getValues, reset } = form;

  const { fields: mediaFields, append: appendMedia, remove: removeMedia } = useFieldArray({ control, name: "media" });
  const { fields: benefitFields, append: appendBenefit, remove: removeBenefit } = useFieldArray({ control, name: "benefits" });
  const { fields: applicationFields, append: appendApplication, remove: removeApplication } = useFieldArray({ control, name: "applications" });

  const watchedName = watch('name');
  const hasSubProducts = watch('hasSubProducts');

  useEffect(() => {
    if (watchedName && (!isEditMode || !getValues('slug'))) {
      const slug = watchedName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      setValue('slug', slug, { shouldValidate: true });
    }
  }, [watchedName, isEditMode, setValue, getValues]);
  
  useEffect(() => {
    if (isEditMode && category) {
      reset({
        name: category.name || '',
        slug: category.slug || '',
        description: category.description || '',
        longDescription: category.longDescription || '',
        order: category.order || 0,
        visible: category.visible !== undefined ? category.visible : true,
        hasSubProducts: category.hasSubProducts !== undefined ? category.hasSubProducts : false,
        image: category.image || '',
        media: category.media?.map(m => ({ value: m })) || [], 
        benefits: category.benefits?.map(b => ({ value: b })) || [],
        applications: category.applications?.map(a => ({ value: a })) || [],
      });
    } else {
      reset({
        name: '',
        slug: '',
        description: '',
        longDescription: '',
        order: 0,
        visible: true,
        hasSubProducts: false,
        image: '',
        media: [],
        benefits: [],
        applications: [],
      });
    }
  }, [category, isEditMode, reset]);


  const onSubmit = async (data) => {
    setLoading(true);
    
    const valuesToSave = {
      ...data,
      media: data.media.map(m => m.value),
      benefits: data.benefits.map(b => b.value),
      applications: data.applications.map(a => a.value),
    };

    try {
      if (isEditMode) {
        const categoryRef = doc(db, 'categories', category.id);
        await setDoc(categoryRef, { ...valuesToSave, updatedAt: serverTimestamp() }, { merge: true });
        toast({
          title: 'Success',
          description: 'Category updated successfully.',
        });
      } else {
        await addDoc(collection(db, 'categories'), { ...valuesToSave, createdAt: serverTimestamp() });
        toast({
          title: 'Success',
          description: 'Category created successfully.',
        });
      }
      onClose();
    } catch (error) {
      console.error('Error saving category: ', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save category.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mt-6">
        <CardHeader>
            <CardTitle>{isEditMode ? 'Edit Category' : 'Create New Category'}</CardTitle>
            <CardDescription>
                {isEditMode ? 'Update the details of this category.' : 'Fill in the details to create a new category.'}
            </CardDescription>
        </CardHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                            control={control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel>Category Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Carbonless Paper" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="order"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Display Order</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem className="md:col-span-3">
                                    <FormLabel>Slug</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., carbonless-paper" {...field} />
                                    </FormControl>
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
                                <FormLabel>Short Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="A brief summary for the category card." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     {!hasSubProducts && (
                        <FormField
                            control={control}
                            name="longDescription"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Long Description (Optional)</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="A detailed description for the category page." {...field} rows={5} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                    
                    <div className="space-y-4 rounded-lg border p-4">
                        <h3 className="text-lg font-medium">Main Image</h3>
                         <FormField
                            control={control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Card Image URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://example.com/image.jpg" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="space-y-2">
                             <p className="text-sm text-muted-foreground">
                                Alternatively, upload an image. File upload is not yet functional.
                            </p>
                            <div className="flex items-center justify-center w-full">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6 w-full border-2 border-dashed rounded-lg cursor-not-allowed bg-muted/50">
                                    <UploadCloud className="w-10 h-10 mb-4 text-muted-foreground" />
                                    <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-muted-foreground">Main card image (JPG, PNG, etc.)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {!hasSubProducts && (
                        <div className="space-y-4 rounded-lg border p-4">
                            <h3 className="text-lg font-medium">Carousel Media</h3>
                            <div className="space-y-2">
                                <FormLabel>Media URLs (Images & Videos)</FormLabel>
                                {mediaFields.map((field, index) => (
                                    <FormField
                                        key={field.id}
                                        control={control}
                                        name={`media.${index}.value`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex items-center gap-2">
                                                    <FormControl>
                                                        <Input placeholder="https://example.com/media.jpg" {...field} />
                                                    </FormControl>
                                                    <Button type="button" variant="destructive" size="icon" onClick={() => removeMedia(index)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                ))}
                                <Button type="button" variant="outline" size="sm" onClick={() => appendMedia({ value: '' })}>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Add Media URL
                                </Button>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    Alternatively, upload media. File upload is not yet functional.
                                </p>
                                <div className="flex items-center justify-center w-full">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6 w-full border-2 border-dashed rounded-lg cursor-not-allowed bg-muted/50">
                                        <UploadCloud className="w-10 h-10 mb-4 text-muted-foreground" />
                                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-muted-foreground">Images or Videos for the carousel</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    <div className="space-y-4 rounded-lg border p-4">
                        <h3 className="text-lg font-medium">Additional Details</h3>
                        <div className="space-y-2">
                            <FormLabel>Benefits</FormLabel>
                            {benefitFields.map((field, index) => (
                                <FormField
                                    key={field.id}
                                    control={control}
                                    name={`benefits.${index}.value`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex items-center gap-2">
                                                <FormControl>
                                                    <Input placeholder="e.g., High durability" {...field} />
                                                </FormControl>
                                                <Button type="button" variant="destructive" size="icon" onClick={() => removeBenefit(index)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}
                            <Button type="button" variant="outline" size="sm" onClick={() => appendBenefit({ value: '' })}>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add Benefit
                            </Button>
                        </div>
                        <div className="space-y-2">
                            <FormLabel>Applications</FormLabel>
                            {applicationFields.map((field, index) => (
                                <FormField
                                    key={field.id}
                                    control={control}
                                    name={`applications.${index}.value`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex items-center gap-2">
                                                <FormControl>
                                                    <Input placeholder="e.g., Food packaging" {...field} />
                                                </FormControl>
                                                <Button type="button" variant="destructive" size="icon" onClick={() => removeApplication(index)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}
                            <Button type="button" variant="outline" size="sm" onClick={() => appendApplication({ value: '' })}>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add Application
                            </Button>
                        </div>
                    </div>

                    <div className='flex gap-8'>
                        <FormField
                            control={control}
                            name="visible"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm flex-1">
                                    <div className="space-y-0.5">
                                        <FormLabel>Visible</FormLabel>
                                        <FormMessage />
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="hasSubProducts"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm flex-1">
                                    <div className="space-y-0.5">
                                        <FormLabel>Has Sub-Products</FormLabel>
                                        <FormMessage />
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
                    Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                    {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                    {isEditMode ? 'Save Changes' : 'Create Category'}
                    </Button>
                </CardFooter>
            </form>
        </Form>
    </Card>
  );
}
