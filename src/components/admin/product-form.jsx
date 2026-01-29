'use client';

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { doc, addDoc, setDoc, collection, serverTimestamp } from 'firebase/firestore';
import Image from 'next/image';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader, PlusCircle, Trash2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  slug: z.string().min(2, { message: 'Slug must be at least 2 characters.' }).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: 'Slug must be lowercase and contain no spaces.' }),
  categorySlug: z.string().min(1, { message: 'Please select a category.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  longDescription: z.string().optional(),
  order: z.coerce.number().int().min(0, { message: 'Order must be a positive number.' }),
  image: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  media: z.array(z.object({ value: z.string().url({ message: "Please enter a valid URL." }) })),
});

export function ProductForm({ onClose, product, categories }) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const isEditMode = !!product;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      slug: '',
      categorySlug: '',
      description: '',
      longDescription: '',
      order: 0,
      image: '',
      media: [],
    },
  });

  const { control, watch, setValue, getValues, reset } = form;

  const { fields: mediaFields, append: appendMedia, remove: removeMedia } = useFieldArray({ control, name: "media" });

  const watchedName = watch('name');

  useEffect(() => {
    if (watchedName && (!isEditMode || !getValues('slug'))) {
      const slug = watchedName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      setValue('slug', slug, { shouldValidate: true });
    }
  }, [watchedName, isEditMode, setValue, getValues]);

  useEffect(() => {
    if (isEditMode && product) {
      reset({
        name: product.name || '',
        slug: product.slug || '',
        categorySlug: product.categorySlug || '',
        description: product.description || '',
        longDescription: product.longDescription || '',
        order: product.order || 0,
        image: product.image || '',
        media: product.media?.map(m => ({ value: m })) || [],
      });
    } else {
      reset({
        name: '',
        slug: '',
        categorySlug: '',
        description: '',
        longDescription: '',
        order: 0,
        image: '',
        media: [],
      });
    }
  }, [product, isEditMode, reset]);

  const onSubmit = async (data) => {
    setLoading(true);

    const valuesToSave = {
      ...data,
      media: data.media.map(m => m.value),
    };

    try {
      if (isEditMode) {
        const productRef = doc(db, 'products', product.id);
        await setDoc(productRef, { ...valuesToSave, updatedAt: serverTimestamp() }, { merge: true });
        toast({
          title: 'Success',
          description: 'Product updated successfully.',
        });
      } else {
        await addDoc(collection(db, 'products'), { ...valuesToSave, createdAt: serverTimestamp() });
        toast({
          title: 'Success',
          description: 'Product created successfully.',
        });
      }
      onClose();
    } catch (error) {
      console.error('Error saving product: ', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save product.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>{isEditMode ? 'Edit Product' : 'Create New Product'}</CardTitle>
        <CardDescription>
          {isEditMode ? 'Update the details of this product.' : 'Fill in the details to create a new product.'}
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
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Pink Carbonless Paper" {...field} />
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
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., pink-carbonless-paper" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="categorySlug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.filter(category => category.hasSubProducts).map(category => (
                          <SelectItem key={category.id} value={category.slug}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                    <Textarea placeholder="A brief summary for the product card." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="longDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Long Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="A detailed description for the product page." {...field} rows={5} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4 rounded-lg border p-4">
              <h3 className="text-lg font-medium">Main Image</h3>
              <FormField
                control={control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Image URL</FormLabel>
                     <div className="flex items-center gap-4">
                        <FormControl>
                          <Input placeholder="https://example.com/image.jpg" {...field} />
                        </FormControl>
                        {field.value && (
                            <Image
                                src={field.value}
                                alt="Image preview"
                                width={64}
                                height={64}
                                className="h-16 w-16 rounded-md border object-cover"
                            />
                        )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4 rounded-lg border p-4">
              <h3 className="text-lg font-medium">Carousel Media</h3>
              <div className="space-y-2">
                <FormLabel>Media URLs (Images & Videos)</FormLabel>
                {mediaFields.map((item, index) => (
                   <FormField
                        key={item.id}
                        control={control}
                        name={`media.${index}.value`}
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center gap-2">
                                    <FormControl>
                                        <Input placeholder="https://example.com/media.jpg" {...field} />
                                    </FormControl>
                                    {field.value && (
                                        <Image
                                            src={field.value}
                                            alt={`Media preview ${index + 1}`}
                                            width={40}
                                            height={40}
                                            className="h-10 w-10 rounded-md border object-cover"
                                        />
                                    )}
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
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              {isEditMode ? 'Save Changes' : 'Create Product'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
