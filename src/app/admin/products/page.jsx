/**
 * @fileOverview The admin page for managing products.
 * It provides full CRUD (Create, Read, Update, Delete) functionality.
 */
'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Loader, PlusCircle } from 'lucide-react';
import { ProductsTable } from '@/components/admin/products-table';
import { ProductForm } from '@/components/admin/product-form';
import { DeleteProductAlert } from '@/components/admin/delete-product-alert';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    // Listener for Categories
    const catQuery = query(collection(db, 'categories'), orderBy('name', 'asc'));
    const unsubscribeCategories = onSnapshot(catQuery, (querySnapshot) => {
      const categoriesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(categoriesData);
    }, (error) => {
      console.error("Error fetching categories: ", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not fetch categories.",
      });
    });

    // Listener for Products
    const prodQuery = query(collection(db, 'products'), orderBy('order', 'asc'));
    const unsubscribeProducts = onSnapshot(prodQuery, (querySnapshot) => {
      const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching products: ", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not fetch products.",
      });
      setLoading(false);
    });

    return () => {
      unsubscribeCategories();
      unsubscribeProducts();
    };
  }, [toast]);

  const handleCreate = () => {
    setSelectedProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleDelete = (product) => {
    setProductToDelete(product);
    setIsAlertOpen(true);
  };
  
  const handleFormClose = () => {
      setShowForm(false);
      setSelectedProduct(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Products</h1>
        <Button onClick={handleCreate} disabled={showForm}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Product
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
            <Loader className="h-12 w-12 animate-spin text-primary" />
        </div>
      ) : (
        <ProductsTable 
            products={products}
            categories={categories} 
            onEdit={handleEdit} 
            onDelete={handleDelete}
        />
      )}
      
      {showForm && (
        <ProductForm
            onClose={handleFormClose}
            product={selectedProduct}
            categories={categories}
        />
      )}

      <DeleteProductAlert
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        product={productToDelete}
      />

    </div>
  );
}
