// This file holds the Genkit flow for providing paper suggestions based on user requirements.

'use server';

/**
 * @fileOverview An AI agent to provide paper suggestions based on user requirements.
 *
 * - paperSuggestion - A function that takes user requirements and returns suggested paper solutions.
 * - PaperSuggestionInput - The input type for the paperSuggestion function.
 * - PaperSuggestionOutput - The return type for the paperSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PaperSuggestionInputSchema = z.object({
  paperType: z.string().describe('The type of paper required (e.g., glossy, matte, recycled).'),
  quantity: z.string().describe('The quantity of paper needed (e.g., reams, tons).'),
  useCase: z.string().describe('The intended use case for the paper (e.g., printing, packaging).'),
  finish: z.string().describe('The desired finish of the paper (e.g., coated, uncoated).'),
  sustainabilityStandards: z
    .string()
    .describe('The desired sustainability standards for the paper (e.g., FSC certified, recycled content).'),
  productCatalog: z
    .string()
    .describe('A description of the products available, including their relevant properties.'),
});

export type PaperSuggestionInput = z.infer<typeof PaperSuggestionInputSchema>;

const PaperSuggestionOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('An array of paper suggestions that match the user requirements based on the product catalog.'),
  reasoning: z
    .string()
    .describe(
      'The reasoning behind the paper suggestions, explaining why each suggestion is a good fit for the user requirements.'
    ),
});

export type PaperSuggestionOutput = z.infer<typeof PaperSuggestionOutputSchema>;

export async function paperSuggestion(input: PaperSuggestionInput): Promise<PaperSuggestionOutput> {
  return paperSuggestionFlow(input);
}

const paperSuggestionPrompt = ai.definePrompt({
  name: 'paperSuggestionPrompt',
  input: {schema: PaperSuggestionInputSchema},
  output: {schema: PaperSuggestionOutputSchema},
  prompt: `You are an expert paper consultant at Shabad Papers. A user is looking for paper suggestions based on their specific needs. Consider the user's requirements and available product catalog to find the best matches.

User Requirements:
- Paper Type: {{{paperType}}}
- Quantity: {{{quantity}}}
- Use Case: {{{useCase}}}
- Finish: {{{finish}}}
- Sustainability Standards: {{{sustainabilityStandards}}}

Product Catalog:
{{{productCatalog}}}

Based on these requirements and the available product catalog, suggest the best paper solutions from Shabad Papers. Explain your reasoning for each suggestion.

Respond in the following format:
{
  "suggestions": ["Paper Suggestion 1", "Paper Suggestion 2", ...],
  "reasoning": "Explanation of why these suggestions are a good fit."
}
`,
});

const paperSuggestionFlow = ai.defineFlow(
  {
    name: 'paperSuggestionFlow',
    inputSchema: PaperSuggestionInputSchema,
    outputSchema: PaperSuggestionOutputSchema,
  },
  async input => {
    const {output} = await paperSuggestionPrompt(input);
    return output!;
  }
);
