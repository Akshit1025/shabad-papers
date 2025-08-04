"use server";

import { z } from "zod";
import { paperSuggestion, type PaperSuggestionInput } from "@/ai/flows/paper-suggestion";
import { productCatalogForAI } from "@/lib/data";

const paperSuggestionSchema = z.object({
  paperType: z.string(),
  quantity: z.string(),
  useCase: z.string(),
  finish: z.string(),
  sustainabilityStandards: z.string().optional(),
});

export async function getPaperSuggestion(input: z.infer<typeof paperSuggestionSchema>) {
  const parsedInput = paperSuggestionSchema.safeParse(input);
  if (!parsedInput.success) {
    return { error: "Invalid input." };
  }

  const aiInput: PaperSuggestionInput = {
    ...parsedInput.data,
    productCatalog: productCatalogForAI,
    sustainabilityStandards: parsedInput.data.sustainabilityStandards || "Not specified",
  };

  try {
    const result = await paperSuggestion(aiInput);
    return { data: result };
  } catch (error) {
    console.error("AI suggestion error:", error);
    return { error: "Failed to get AI suggestion. Please try again later." };
  }
}

const inquirySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    message: z.string(),
});

export async function submitInquiry(input: z.infer<typeof inquirySchema>) {
    const parsedInput = inquirySchema.safeParse(input);
    if (!parsedInput.success) {
        return { success: false, error: "Invalid input." };
    }

    // In a real application, you would send an email, save to a database, etc.
    // For this example, we'll just log it to the console.
    console.log("New inquiry received:", parsedInput.data);

    return { success: true };
}
