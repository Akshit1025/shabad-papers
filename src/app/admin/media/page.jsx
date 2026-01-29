/**
 * @fileOverview The admin page for managing media assets.
 * It provides full CRUD (Create, Read, Update, Delete) functionality for images and videos.
 */
'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Loader, PlusCircle, Grid, List } from 'lucide-react';
import { MediaTable } from '@/components/admin/media-table';
import { MediaGrid } from '@/components/admin/media-grid';
import { MediaForm } from '@/components/admin/media-form';
import { DeleteMediaAlert } from '@/components/admin/delete-media-alert';

export default function MediaPage() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaToDelete, setMediaToDelete] = useState(null);
  const [view, setView] = useState('grid');
  const { toast } = useToast();

  useEffect(() => {
    const q = query(collection(db, 'media'), orderBy('name', 'asc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const mediaData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMedia(mediaData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching media: ", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not fetch media assets.",
      });
      setLoading(false);
    });

    return () => unsubscribe();
  }, [toast]);

  const handleCreate = () => {
    setSelectedMedia(null);
    setIsFormOpen(true);
  };

  const handleEdit = (mediaItem) => {
    setSelectedMedia(mediaItem);
    setIsFormOpen(true);
  };

  const handleDelete = (mediaItem) => {
    setMediaToDelete(mediaItem);
    setIsAlertOpen(true);
  };
  
  const handleFormOpenChange = (open) => {
    setIsFormOpen(open);
    if (!open) {
      setSelectedMedia(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Media</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-md bg-muted p-1">
            <Button variant={view === 'grid' ? 'secondary' : 'ghost'} size="icon" onClick={() => setView('grid')} className="h-8 w-8">
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant={view === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => setView('list')} className="h-8 w-8">
              <List className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={handleCreate}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Media
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
            <Loader className="h-12 w-12 animate-spin text-primary" />
        </div>
      ) : (
        view === 'grid' ? (
          <MediaGrid 
            media={media}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <MediaTable 
            media={media} 
            onEdit={handleEdit} 
            onDelete={handleDelete}
          />
        )
      )}
      
      <Dialog open={isFormOpen} onOpenChange={handleFormOpenChange}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>{selectedMedia ? 'Edit Media' : 'Add New Media'}</DialogTitle>
            <DialogDescription>
                {selectedMedia ? 'Update the details of this media item.' : 'Fill in the details to add a new media item.'}
            </DialogDescription>
          </DialogHeader>
          <MediaForm
              onClose={() => handleFormOpenChange(false)}
              mediaItem={selectedMedia}
          />
        </DialogContent>
      </Dialog>

      <DeleteMediaAlert
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        mediaItem={mediaToDelete}
      />

    </div>
  );
}
