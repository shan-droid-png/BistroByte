"use client";

import { useState, useEffect } from 'react';
import { dishes } from '@/lib/data';
import { generateImage } from '@/ai/flows/generate-image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

interface GeneratedImage {
  dishId: number;
  imageUrl: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [loading, setLoading] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const generateAllImages = async () => {
      for (const dish of dishes) {
        setLoading((prev) => ({ ...prev, [dish.id]: true }));
        try {
          // Check if image already exists to avoid re-generating
          if (!images.some(img => img.dishId === dish.id)) {
            const result = await generateImage({ prompt: dish.name });
            setImages((prev) => [...prev, { dishId: dish.id, imageUrl: result.imageUrl }]);
          }
        } catch (error) {
          console.error(`Failed to generate image for ${dish.name}:`, error);
        } finally {
          setLoading((prev) => ({ ...prev, [dish.id]: false }));
        }
      }
    };

    generateAllImages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-5xl md:text-6xl">
          Dish Gallery
        </h1>
        <p className="mt-3 text-lg text-muted-foreground sm:mt-4">
          AI-generated images of our delicious offerings.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dishes.map((dish) => {
          const generatedImage = images.find((img) => img.dishId === dish.id);
          const isLoading = loading[dish.id] ?? true;

          return (
            <Card key={dish.id}>
              <CardHeader>
                <CardTitle className="font-headline">{dish.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square relative">
                  {isLoading ? (
                    <Skeleton className="w-full h-full rounded-md" />
                  ) : generatedImage ? (
                    <Image
                      src={generatedImage.imageUrl}
                      alt={`AI-generated image of ${dish.name}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  ) : (
                    <div className="w-full h-full rounded-md bg-muted flex items-center justify-center">
                       <p className="text-sm text-muted-foreground">Error</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
