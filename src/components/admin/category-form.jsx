'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
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
import { Loader } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  slug: z.string().min(2, { message: 'Slug must be at least 2 characters.' }).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: 'Slug must be lowercase and contain no spaces.'}),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  longDescription: z.string().optional(),
  order: z.coerce.number().int().min(0, { message: 'Order must be a positive number.' }),
  visible: z.boolean().default(true),
  hasSubProducts: z.boolean().default(false),
  image: z.string().optional(),
  media: z.array(z.string()).optional(),
  benefits: z.array(z.string()).optional(),
  applications: z.array(z.string()).optional(),
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
  
  const { watch, setValue, getValues, reset } = form;
  const watchedName = watch('name');

  // Effect to auto-generate slug from name
  useEffect(() => {
    // Only auto-generate slug if creating a new category or if the slug is empty
    if (watchedName && (!isEditMode || !getValues('slug'))) {
      const slug = watchedName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      setValue('slug', slug, { shouldValidate: true });
    }
  }, [watchedName, isEditMode, setValue, getValues]);
  
  // Effect to reset form when category prop changes
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
        media: category.media || [], 
        benefits: category.benefits || [],
        applications: category.applications || [],
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


  const onSubmit = async (values) => {
    setLoading(true);
    try {
      if (isEditMode) {
        const categoryRef = doc(db, 'categories', category.id);
        await setDoc(categoryRef, { ...values, updatedAt: serverTimestamp() }, { merge: true });
        toast({
          title: 'Success',
          description: 'Category updated successfully.',
        });
      } else {
        await addDoc(collection(db, 'categories'), { ...values, createdAt: serverTimestamp() });
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

  const handleStringToArrayChange = (fieldOnChange) => (e) => {
    const value = e.target.value;
    const arr = value ? value.split(',').map(item => item.trim()).filter(Boolean) : [];
    fieldOnChange(arr);
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
                <CardContent className="space-y-4">
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Category Name</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Carbonless Paper" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., carbonless-paper" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
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
                    <FormField
                    control={form.control}
                    name="longDescription"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Long Description (Optional)</FormLabel>
                        <FormControl>
                            <Textarea placeholder="A detailed description for the category page." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
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
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Card Image Key</FormLabel>
                        <FormControl>
                            <Input placeholder="Key from placeholder-images.json" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="media"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Carousel Media Keys (comma-separated)</FormLabel>
                        <FormControl>
                             <Input
                                placeholder="key1, key2, key3"
                                value={Array.isArray(field.value) ? field.value.join(', ') : ''}
                                onChange={handleStringToArrayChange(field.onChange)}
                                onBlur={field.onBlur}
                                ref={field.ref}
                                name={field.name}
                             />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="benefits"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Benefits (comma-separated)</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Benefit one, Benefit two"
                                value={Array.isArray(field.value) ? field.value.join(', ') : ''}
                                onChange={handleStringToArrayChange(field.onChange)}
                                onBlur={field.onBlur}
                                ref={field.ref}
                                name={field.name}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="applications"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Applications (comma-separated)</FormLabel>
                        <FormControl>
                             <Input
                                placeholder="App one, App two"
                                value={Array.isArray(field.value) ? field.value.join(', ') : ''}
                                onChange={handleStringToArrayChange(field.onChange)}
                                onBlur={field.onBlur}
                                ref={field.ref}
                                name={field.name}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <div className='flex gap-8'>
                        <FormField
                        control={form.control}
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
                        control={form.control}
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
