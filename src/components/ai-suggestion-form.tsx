"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getPaperSuggestion } from "@/app/actions";
import type { PaperSuggestionOutput } from "@/ai/flows/paper-suggestion";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Paperclip, ThumbsUp } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  paperType: z.string().min(3, "Please describe the paper type."),
  quantity: z.string().min(1, "Please specify the quantity."),
  useCase: z.string().min(5, "Please describe the use case."),
  finish: z.string().min(3, "Please describe the desired finish."),
  sustainabilityStandards: z.string().optional(),
});

export function AiSuggestionForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PaperSuggestionOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paperType: "",
      quantity: "",
      useCase: "",
      finish: "",
      sustainabilityStandards: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await getPaperSuggestion(values);
      if (res.error) {
        setError(res.error);
      } else {
        setResult(res.data);
      }
    } catch (e) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="shadow-2xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Your Requirements</CardTitle>
        <CardDescription>Fill out the form below and let our AI find the best paper for you.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="paperType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paper Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Glossy, matte, recycled" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 10 reams, 2 tons" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="useCase"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Intended Use Case</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Printing brochures, packaging for electronics" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="finish"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desired Finish</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Coated, uncoated, silk" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sustainabilityStandards"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sustainability Needs (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., FSC certified, high recycled content" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full md:w-auto">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Get Suggestion"
              )}
            </Button>
          </form>
        </Form>
        {error && (
            <Alert variant="destructive" className="mt-6">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        {result && (
            <div className="mt-8 pt-8 border-t">
                <h3 className="text-2xl font-headline font-bold mb-4 flex items-center gap-2">
                    <ThumbsUp className="h-6 w-6 text-accent"/>
                    Our Recommendations
                </h3>
                <div className="space-y-6">
                    <div>
                        <h4 className="font-semibold text-lg mb-2">Suggested Products:</h4>
                        <ul className="list-none space-y-2">
                            {result.suggestions.map((suggestion, index) => (
                                <li key={index} className="flex items-center gap-2 p-3 rounded-md bg-secondary">
                                    <Paperclip className="h-5 w-5 text-primary"/>
                                    <span className="font-medium text-secondary-foreground">{suggestion}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-semibold text-lg mb-2">Reasoning:</h4>
                        <p className="text-muted-foreground bg-secondary p-4 rounded-md">{result.reasoning}</p>
                    </div>
                </div>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
