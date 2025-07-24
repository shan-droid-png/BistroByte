"use client";

import { useState } from 'react';
import type { Dish } from '@/lib/types';
import { dietarySuggestions, type DietarySuggestionsOutput } from '@/ai/flows/dietary-suggestions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const dietaryOptions = [
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'gluten-free', label: 'Gluten-Free' },
  { value: 'dairy-free', label: 'Dairy-Free' },
  { value: 'nut-free', label: 'Nut-Free' },
];

export function DietarySuggestions({ dish }: { dish: Dish }) {
  const [selectedDiet, setSelectedDiet] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DietarySuggestionsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async () => {
    if (!selectedDiet) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await dietarySuggestions({
        dishName: dish.name,
        dietaryRestriction: selectedDiet,
        dishIngredients: dish.ingredients.join(', '),
      });
      setResult(response);
    } catch (e) {
      setError('Could not get suggestions at this time. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Dietary Check</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Check if this dish can be adapted for your dietary needs.
      </p>
      <div className="flex gap-2 mb-4">
        <Select value={selectedDiet} onValueChange={setSelectedDiet}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a dietary restriction..." />
          </SelectTrigger>
          <SelectContent>
            {dietaryOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleCheck} disabled={!selectedDiet || loading}>
          Check
        </Button>
      </div>

      {loading && (
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      )}
      
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <Alert variant={result.suitable ? 'default' : 'destructive'}>
          {result.suitable ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertTitle>
            {result.suitable
              ? `Suitable for ${dietaryOptions.find(d => d.value === selectedDiet)?.label || selectedDiet} diet!`
              : `Not suitable for ${dietaryOptions.find(d => d.value === selectedDiet)?.label || selectedDiet} diet.`}
          </AlertTitle>
          <AlertDescription>
            {result.suggestions}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
