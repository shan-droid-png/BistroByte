'use server';

/**
 * @fileOverview AI-powered dietary restriction tool. Recommends substitutions to dishes, based on common dietary restrictions (vegetarian, gluten free, etc).
 *
 * - dietarySuggestions - A function that handles the dietary suggestions process.
 * - DietarySuggestionsInput - The input type for the dietarySuggestions function.
 * - DietarySuggestionsOutput - The return type for the dietarySuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DietarySuggestionsInputSchema = z.object({
  dishName: z.string().describe('The name of the dish.'),
  dietaryRestriction: z
    .string()
    .describe(
      'The dietary restriction to consider (e.g., vegetarian, gluten-free, dairy-free).' 
    ),
  dishIngredients: z.string().describe('The ingredients of the dish.'),
});

export type DietarySuggestionsInput = z.infer<typeof DietarySuggestionsInputSchema>;

const DietarySuggestionsOutputSchema = z.object({
  suitable: z.boolean().describe('Whether the dish is suitable for the dietary restriction.'),
  suggestions: z.string().describe('Suggested substitutions for the dish.'),
});

export type DietarySuggestionsOutput = z.infer<typeof DietarySuggestionsOutputSchema>;

export async function dietarySuggestions(input: DietarySuggestionsInput): Promise<DietarySuggestionsOutput> {
  return dietarySuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dietarySuggestionsPrompt',
  input: {schema: DietarySuggestionsInputSchema},
  output: {schema: DietarySuggestionsOutputSchema},
  prompt: `You are a helpful assistant that suggests dietary substitutions for dishes based on dietary restrictions.

  Determine if the dish is suitable for the given dietary restriction, and provide specific substitution suggestions.

  Dish Name: {{{dishName}}}
  Dietary Restriction: {{{dietaryRestriction}}}
  Dish Ingredients: {{{dishIngredients}}}

  Consider the following:
  - Common substitutions for each dietary restriction.
  - The impact of substitutions on the dish's overall flavor and nutritional profile.
  - Whether the dish can be easily modified to meet the restriction, or if a completely different dish is more appropriate.

  Output should be in JSON format:
  {
    "suitable": true/false,
    "suggestions": "Specific substitution suggestions"
  }`,
});

const dietarySuggestionsFlow = ai.defineFlow(
  {
    name: 'dietarySuggestionsFlow',
    inputSchema: DietarySuggestionsInputSchema,
    outputSchema: DietarySuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

