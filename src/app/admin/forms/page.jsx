/**
 * @fileOverview The admin page for managing form definitions.
 * It provides full CRUD (Create, Read, Update, Delete) functionality for inquiry forms.
 */
'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Loader, PlusCircle } from 'lucide-react';
import { FormsTable } from '@/components/admin/forms-table';
import { FormBuilder } from '@/components/admin/form-builder';
import { DeleteFormAlert } from '@/components/admin/delete-form-alert';

export default function FormsPage() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBuilder, setShowBuilder] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [formToDelete, setFormToDelete] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const q = query(collection(db, 'formDefinitions'), orderBy('title', 'asc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const formsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setForms(formsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching form definitions: ", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not fetch form definitions.",
      });
      setLoading(false);
    });

    return () => unsubscribe();
  }, [toast]);

  const handleCreate = () => {
    setSelectedForm(null);
    setShowBuilder(true);
  };

  const handleEdit = (form) => {
    setSelectedForm(form);
    setShowBuilder(true);
  };

  const handleDelete = (form) => {
    setFormToDelete(form);
    setIsAlertOpen(true);
  };
  
  const handleBuilderClose = () => {
      setShowBuilder(false);
      setSelectedForm(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Inquiry Forms</h1>
        <Button onClick={handleCreate} disabled={showBuilder}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Form
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
            <Loader className="h-12 w-12 animate-spin text-primary" />
        </div>
      ) : showBuilder ? (
         <FormBuilder
            onClose={handleBuilderClose}
            formDefinition={selectedForm}
        />
      ) : (
        <FormsTable 
            forms={forms}
            onEdit={handleEdit} 
            onDelete={handleDelete}
        />
      )}

      <DeleteFormAlert
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        formDefinition={formToDelete}
      />
    </div>
  );
}
