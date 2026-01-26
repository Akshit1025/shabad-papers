'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';


export function DeleteCategoryAlert({ isOpen, onClose, category }) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    if (!category) return;

    setLoading(true);
    try {
      await deleteDoc(doc(db, 'categories', category.id));
      toast({
        title: 'Success',
        description: `Category "${category.name}" has been deleted.`,
      });
      onClose();
    } catch (error) {
      console.error('Error deleting category: ', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete category.',
      });
    } finally {
      setLoading(false);
    }
  };
  
  if (!isOpen) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the category
            <span className="font-bold"> "{category?.name}"</span>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={handleDelete} disabled={loading} variant="destructive">
                 {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                Continue
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
