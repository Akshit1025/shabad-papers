/**
 * @fileOverview A dialog component containing a form for product inquiries.
 * This component is reusable and renders a dynamic form based on a definition from Firestore.
 */
"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DynamicInquiryForm } from "@/components/dynamic-inquiry-form";
import { Loader, Send, AlertCircle } from "lucide-react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";


/**
 * Fetches a form definition from Firestore.
 * @param {string} formId - The ID of the form definition to fetch (usually the category slug).
 * @returns {Promise<object|null>} The form definition object or null if not found.
 */
async function fetchFormDefinition(formId) {
    if (!formId) return null;
    try {
        const docRef = doc(db, "formDefinitions", formId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.warn(`No form definition found for ID: ${formId}`);
            return null;
        }
    } catch (error) {
        console.error("Error fetching form definition:", error);
        return null;
    }
}


/**
 * A dialog with a form for making a product inquiry.
 * @param {object} props - Component props.
 * @param {string} props.productName - The name of the product for the inquiry.
 * @param {string} props.formDefinitionId - The ID to fetch the form definition from Firestore.
 * @returns {JSX.Element} The rendered dialog component.
 */
export function ProductInquiryDialog({ productName, formDefinitionId }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formDefinition, setFormDefinition] = useState(null);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    if (open && !formDefinition) {
      const loadDefinition = async () => {
        setLoading(true);
        setError(null);
        try {
          let definition = await fetchFormDefinition(formDefinitionId);
          if (!definition) {
             // Fallback to a default form definition if none is found
             console.log(`No specific form for ${formDefinitionId}, falling back to default.`);
             definition = await fetchFormDefinition('default');
             if (!definition) {
                throw new Error("Default form definition could not be loaded.");
             }
          }

          // Pre-fill the product name if a 'product' field exists
          const productField = definition.fields.find(f => f.name === 'product');
          if(productField) {
            productField.defaultValue = productName;
          }
          const messageField = definition.fields.find(f => f.name === 'message');
          if (messageField && !messageField.defaultValue) {
             messageField.defaultValue = `I'd like to inquire about ${productName}.`;
          }

          setFormDefinition(definition);
        } catch(e) {
          setError(e.message || "Could not load the inquiry form.");
          toast({
              variant: "destructive",
              title: "Error",
              description: e.message || "Failed to load inquiry form.",
          });
        } finally {
            setLoading(false);
        }
      };
      loadDefinition();
    }
  }, [open, formDefinitionId, productName, toast, formDefinition]);


  const renderContent = () => {
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-8 gap-4">
                <Loader className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Loading Form...</p>
            </div>
        );
    }

    if (error) {
         return (
            <div className="flex flex-col items-center justify-center p-8 gap-4 text-destructive">
                <AlertCircle className="h-8 w-8" />
                <p className="text-center">{error}</p>
                <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
            </div>
        );
    }
    
    if (formDefinition) {
        return (
            <div className="pt-4">
                <DynamicInquiryForm 
                    formDefinition={formDefinition} 
                    onFormSubmit={() => setOpen(false)}
                />
            </div>
        );
    }

    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg">
          Enquire Now
          <Send className="ml-2 h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{formDefinition?.title || `Inquire about ${productName}`}</DialogTitle>
          <DialogDescription>
            {formDefinition?.description || "Fill out the form and we'll get back to you soon."}
          </DialogDescription>
        </DialogHeader>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}
