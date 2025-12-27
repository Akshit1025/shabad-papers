/**
 * @fileOverview A dynamically generated form based on a definition from Firestore.
 * This component renders form fields, handles validation, and submits data.
 */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitInquiry } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

/**
 * Builds a Zod validation schema from a form definition.
 * @param {Array<object>} fields - The array of field definitions.
 * @returns {z.ZodObject} The generated Zod schema.
 */
function buildSchema(fields) {
  const shape = {};
  fields.forEach(field => {
    let schema;
    switch (field.type) {
      case 'email':
        schema = z.string().email({ message: "Please enter a valid email." });
        break;
      case 'number':
        schema = z.coerce.number().min(1, { message: "Must be greater than 0."});
        break;
      default:
        schema = z.string();
    }

    if (field.required) {
      if (field.type === 'email') {
        schema = schema.min(1, { message: "This field is required." });
      } else {
        schema = schema.min(field.minLength || 1, { message: field.errorMessage || "This field is required." });
      }
    } else {
      schema = schema.optional();
    }
    
    shape[field.name] = schema;
  });
  return z.object(shape);
}


/**
 * Renders the appropriate form input based on field type.
 * @param {object} field - The field definition.
 * @param {object} formField - The field object from react-hook-form.
 * @returns {JSX.Element}
 */
const FormInput = ({ field, formField }) => {
    switch (field.type) {
        case 'textarea':
            return <Textarea placeholder={field.placeholder} {...formField} />;
        case 'email':
            return <Input type="email" placeholder={field.placeholder} {...formField} />;
        case 'number':
            return <Input type="number" placeholder={field.placeholder} {...formField} />;
        case 'text':
        default:
            return <Input placeholder={field.placeholder} {...formField} />;
    }
};

/**
 * A dynamic form component for submitting inquiries.
 * @param {object} props - Component props.
 * @param {object} props.formDefinition - The form definition object from Firestore.
 * @param {function} props.onFormSubmit - Callback function executed after successful submission.
 * @returns {JSX.Element} The rendered form component.
 */
export function DynamicInquiryForm({ formDefinition, onFormSubmit }) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const formSchema = buildSchema(formDefinition.fields);
  
  // Set up default values, including the product name from the definition
  const defaultValues = formDefinition.fields.reduce((acc, field) => {
    acc[field.name] = field.defaultValue || "";
    return acc;
  }, {});
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  async function onSubmit(values) {
    setLoading(true);
    try {
      const response = await submitInquiry(values);
      if(response.success) {
        toast({
            title: "Inquiry Sent!",
            description: "Thank you for your message. We'll be in touch soon.",
        });
        form.reset();
        if (onFormSubmit) onFormSubmit();
      } else {
        toast({
            variant: "destructive",
            title: "Error",
            description: response.error || "Failed to send inquiry.",
        });
      }
    } catch (e) {
       toast({
            variant: "destructive",
            title: "Error",
            description: "An unexpected error occurred. Please try again.",
        });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {formDefinition.fields.map(field => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <FormInput field={field} formField={formField} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" disabled={loading} className="w-full">
          {loading && <FontAwesomeIcon icon={faSpinner} className="mr-2 h-4 w-4 animate-spin" />}
          Send Inquiry
        </Button>
      </form>
    </Form>
  );
}
