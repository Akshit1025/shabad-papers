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
import { Loader, PlusCircle } from 'lucide-react';
import { MediaTable } from '@/components/admin/media-table';
import { MediaForm } from '@/components/admin/media-form';
import { DeleteMediaAlert } from '@/components/admin/delete-media-alert';

export default function MediaPage() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaToDelete, setMediaToDelete] = useState(null);
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
    setShowForm(true);
  };

  const handleEdit = (mediaItem) => {
    setSelectedMedia(mediaItem);
    setShowForm(true);
  };

  const handleDelete = (mediaItem) => {
    setMediaToDelete(mediaItem);
    setIsAlertOpen(true);
  };
  
  const handleFormClose = () => {
      setShowForm(false);
      setSelectedMedia(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Media</h1>
        <Button onClick={handleCreate} disabled={showForm}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Media
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
            <Loader className="h-12 w-12 animate-spin text-primary" />
        </div>
      ) : (
        <MediaTable 
            media={media} 
            onEdit={handleEdit} 
            onDelete={handleDelete}
        />
      )}
      
      {showForm && (
        <MediaForm
            onClose={handleFormClose}
            mediaItem={selectedMedia}
        />
      )}

      <DeleteMediaAlert
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        mediaItem={mediaToDelete}
      />

    </div>
  );
}
