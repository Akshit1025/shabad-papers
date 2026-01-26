/**
 * @fileOverview The admin page for managing product categories.
 * It provides full CRUD (Create, Read, Update, Delete) functionality.
 */
'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Loader, PlusCircle } from 'lucide-react';
import { CategoriesTable } from '@/components/admin/categories-table';
import { CategoryForm } from '@/components/admin/category-form';
import { DeleteCategoryAlert } from '@/components/admin/delete-category-alert';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const q = query(collection(db, 'categories'), orderBy('order', 'asc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const categoriesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(categoriesData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching categories: ", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not fetch categories.",
      });
      setLoading(false);
    });

    return () => unsubscribe();
  }, [toast]);

  const handleCreate = () => {
    setSelectedCategory(null);
    setShowForm(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setShowForm(true);
  };

  const handleDelete = (category) => {
    setCategoryToDelete(category);
    setIsAlertOpen(true);
  };
  
  const handleFormClose = () => {
      setShowForm(false);
      setSelectedCategory(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Categories</h1>
        <Button onClick={handleCreate} disabled={showForm}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Category
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
            <Loader className="h-12 w-12 animate-spin text-primary" />
        </div>
      ) : (
        <CategoriesTable 
            categories={categories} 
            onEdit={handleEdit} 
            onDelete={handleDelete}
        />
      )}
      
      {showForm && (
        <CategoryForm
            onClose={handleFormClose}
            category={selectedCategory}
        />
      )}

      <DeleteCategoryAlert
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        category={categoryToDelete}
      />

    </div>
  );
}
