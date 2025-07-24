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

const IMAGE_CACHE_KEY = 'bistrobyte_gallery_images';

export default function GalleryPage() {
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [loading, setLoading] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const getCachedImages = () => {
      try {
        const cached = window.localStorage.getItem(IMAGE_CACHE_KEY);
        return cached ? JSON.parse(cached) : [];
      } catch (error) {
        console.error("Failed to read from localStorage", error);
        return [];
      }
    };
    
    const cachedImages = getCachedImages();
    setImages(cachedImages);

    const generateAllImages = async () => {
      const newImages = [...cachedImages];
      for (const dish of dishes) {
        // Check if image is already cached to avoid re-generating
        if (!newImages.some(img => img.dishId === dish.id)) {
          setLoading((prev) => ({ ...prev, [dish.id]: true }));
          try {
            const result = await generateImage({ prompt: dish.name });
            const newImage = { dishId: dish.id, imageUrl: result.imageUrl };
            newImages.push(newImage);
            setImages([...newImages]);

            // Save the updated cache to localStorage
            try {
              window.localStorage.setItem(IMAGE_CACHE_KEY, JSON.stringify(newImages));
            } catch (error) {
              console.error("Failed to write to localStorage", error);
            }

          } catch (error) {
            console.error(`Failed to generate image for ${dish.name}:`, error);
          } finally {
            setLoading((prev) => ({ ...prev, [dish.id]: false }));
          }
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
          const isLoading = loading[dish.id] ?? !generatedImage;

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
