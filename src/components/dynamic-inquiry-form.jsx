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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faChevronDown } from "@fortawesome/free-solid-svg-icons";

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
            if (field.required) {
                schema = schema.min(1, { message: field.errorMessage || "This field is required." });
            } else {
                schema = schema.optional().or(z.literal(''));
            }
            break;
        case 'number':
            schema = z.coerce.number();
            if (field.required) {
                schema = schema.min(1, { message: field.errorMessage || "Must be a positive number." });
            } else {
                schema = schema.optional();
            }
            break;
        case 'dropdown':
            if (field.multiple) {
                schema = z.array(z.string()).default([]);
                 if (field.required) {
                    schema = schema.min(1, { message: field.errorMessage || "Please select at least one option." });
                }
            } else {
                schema = z.string();
                if (field.required) {
                    schema = schema.min(1, { message: field.errorMessage || "This field is required." });
                } else {
                    schema = schema.optional().or(z.literal(''));
                }
            }
            break;
        case 'text':
        case 'textarea':
        default:
            schema = z.string();
            if (field.required) {
                schema = schema.min(1, { message: field.errorMessage || "This field is required." });
            } else {
                schema = schema.optional().or(z.literal(''));
            }
    }
    shape[field.name] = schema;
  });
  return z.object(shape);
}

/**
 * Renders a multi-select dropdown component.
 * @param {object} props - Component props.
 * @returns {JSX.Element}
 */
const MultiSelectDropdown = ({ field, formField, form }) => {
    const options = Array.isArray(field.options) ? field.options : [];
    const selectedValues = formField.value || [];

    const getTriggerText = () => {
        if (selectedValues.length === 0) return field.placeholder || "Select options...";
        if (selectedValues.length > 2) return `${selectedValues.length} selected`;
        // Find the labels for the selected values
        const selectedLabels = options.filter(opt => selectedValues.includes(opt));
        return selectedLabels.join(', ');
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between font-normal">
                    <span className="truncate">{getTriggerText()}</span>
                    <FontAwesomeIcon icon={faChevronDown} className="h-4 w-4 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[var(--radix-select-trigger-width)]">
                {options.map(option => (
                    <DropdownMenuCheckboxItem
                        key={option}
                        checked={selectedValues.includes(option)}
                        onCheckedChange={(checked) => {
                            const currentValues = form.getValues(formField.name) || [];
                            const newValues = checked
                                ? [...currentValues, option]
                                : currentValues.filter(val => val !== option);
                            form.setValue(formField.name, newValues, { shouldValidate: true });
                        }}
                    >
                        {option}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};


/**
 * Renders the appropriate form input based on field type.
 * @param {object} field - The field definition.
 * @param {object} formField - The field object from react-hook-form.
 * @param {object} form - The form instance from react-hook-form.
 * @returns {JSX.Element}
 */
const FormInput = ({ field, formField, form }) => {
    switch (field.type) {
        case 'textarea':
            return <Textarea placeholder={field.placeholder} {...formField} />;
        case 'email':
            return <Input type="email" placeholder={field.placeholder} {...formField} />;
        case 'number':
            return <Input type="number" placeholder={field.placeholder} {...formField} />;
        case 'dropdown':
            const options = Array.isArray(field.options) ? field.options : [];
            if (field.multiple) {
                return <MultiSelectDropdown field={field} formField={formField} form={form} />
            }
            return (
                <Select onValueChange={formField.onChange} defaultValue={formField.value}>
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder={field.placeholder || "Select an option"} />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {options.map(option => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            );
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
  
  // Set up default values from the definition
  const defaultValues = formDefinition.fields.reduce((acc, field) => {
    if (field.type === 'dropdown' && field.multiple) {
        acc[field.name] = field.defaultValue || [];
    } else {
        acc[field.name] = field.defaultValue || "";
    }
    return acc;
  }, {});
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  async function onSubmit(values) {
    setLoading(true);
    try {
      const valuesToSubmit = { ...values };
      // Convert array values to comma-separated string for submission
      Object.keys(valuesToSubmit).forEach(key => {
        if (Array.isArray(valuesToSubmit[key])) {
          valuesToSubmit[key] = valuesToSubmit[key].join(', ');
        }
      });

      const response = await submitInquiry(valuesToSubmit);
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
                  <FormInput field={field} formField={formField} form={form} />
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
