'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { doc, addDoc, setDoc, collection, serverTimestamp } from 'firebase/firestore';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  url: z.string().url({ message: "Please enter a valid URL." }),
});

const isVideoUrl = (url) => {
    if (typeof url !== 'string') return false;
    return url.match(/\.(mp4|webm|ogg)(\?.*)?$/i);
};

export function MediaForm({ onClose, mediaItem }) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const isEditMode = !!mediaItem;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      url: '',
    },
  });
  
  const { control, reset, watch } = form;
  const watchedUrl = watch('url');
  const isVideo = isVideoUrl(watchedUrl);

  useEffect(() => {
    if (isEditMode && mediaItem) {
      reset({
        name: mediaItem.name || '',
        url: mediaItem.url || '',
      });
    } else {
      reset({
        name: '',
        url: '',
      });
    }
  }, [mediaItem, isEditMode, reset]);

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      if (isEditMode) {
        const mediaRef = doc(db, 'media', mediaItem.id);
        await setDoc(mediaRef, { ...values, updatedAt: serverTimestamp() }, { merge: true });
        toast({
          title: 'Success',
          description: 'Media updated successfully.',
        });
      } else {
        await addDoc(collection(db, 'media'), { ...values, createdAt: serverTimestamp() });
        toast({
          title: 'Success',
          description: 'Media added successfully.',
        });
      }
      onClose();
    } catch (error) {
      console.error('Error saving media: ', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save media.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Media Name</FormLabel>
                      <FormControl>
                          <Input placeholder="e.g., Carbonless Paper Stack" {...field} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="url"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Media URL</FormLabel>
                      <div className="flex items-start gap-4">
                        <FormControl>
                            <Input placeholder="https://example.com/image.jpg" {...field} />
                        </FormControl>
                        {watchedUrl && (
                            isVideo ? (
                                <video
                                    src={watchedUrl}
                                    muted
                                    autoPlay
                                    loop
                                    playsInline
                                    className="h-16 w-16 rounded-md border object-cover bg-black"
                                />
                            ) : (
                                <Image
                                    src={watchedUrl}
                                    alt="Image preview"
                                    width={64}
                                    height={64}
                                    className="h-16 w-16 rounded-md border object-cover"
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                            )
                        )}
                      </div>
                      <FormMessage />
                      </FormItem>
                  )}
                />
            </div>
            <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
                Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                {isEditMode ? 'Save Changes' : 'Add Media'}
                </Button>
            </div>
        </form>
    </Form>
  );
}
