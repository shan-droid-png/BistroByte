"use client";

import { useState, useEffect } from 'react';
import { dishes, categories } from '@/lib/data';
import type { Dish } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { DishDetailDialog } from '@/components/DishDetailDialog';
import { generateImage } from '@/ai/flows/generate-image';
import { Skeleton } from '@/components/ui/skeleton';

interface GeneratedImage {
  dishId: number;
  imageUrl: string;
}

const IMAGE_CACHE_KEY = 'bistrobyte_gallery_images';

export function Menu() {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0].id);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>({});

  const filteredDishes = dishes.filter(dish => dish.category === selectedCategory);

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
    if (cachedImages.length > 0) {
      setGeneratedImages(cachedImages);
    }
  }, []);
  
  const handleDishSelect = async (dish: Dish) => {
    const existingImage = generatedImages.find(img => img.dishId === dish.id);
    if (!existingImage && !loadingStates[dish.id]) {
      setLoadingStates(prev => ({ ...prev, [dish.id]: true }));
      try {
        const result = await generateImage({ prompt: dish.name });
        const newImage = { dishId: dish.id, imageUrl: result.imageUrl };
        setGeneratedImages(prevImages => {
          const updatedImages = [...prevImages, newImage];
          try {
            window.localStorage.setItem(IMAGE_CACHE_KEY, JSON.stringify(updatedImages));
          } catch (error) {
             console.error("Failed to write to localStorage", error);
          }
          return updatedImages;
        });
        setSelectedDish({ ...dish, image: result.imageUrl });
      } catch (error) {
        console.error(`Failed to generate image for ${dish.name}:`, error);
        // Set selected dish anyway to show details, will use placeholder image
        setSelectedDish(dish);
      } finally {
        setLoadingStates(prev => ({ ...prev, [dish.id]: false }));
      }
    } else {
        const image = existingImage ? existingImage.imageUrl : dish.image;
        setSelectedDish({ ...dish, image });
    }
  };

  return (
    <>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category.id)}
            className="gap-2 transition-all"
          >
            <category.icon className="h-4 w-4" />
            <span>{category.name}</span>
          </Button>
        ))}
      </div>

      <Dialog open={!!selectedDish} onOpenChange={(isOpen) => !isOpen && setSelectedDish(null)}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDishes.map((dish) => {
            const generatedImage = generatedImages.find(img => img.dishId === dish.id);
            const imageUrl = generatedImage?.imageUrl || dish.image;
            const isLoading = loadingStates[dish.id];

            return(
            <DialogTrigger key={dish.id} asChild onClick={() => handleDishSelect(dish)}>
              <Card className="group flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer">
                <CardHeader className="p-0">
                  <div className="overflow-hidden aspect-[4/2.5] relative">
                    {isLoading ? (
                      <Skeleton className="w-full h-full" />
                    ) : (
                    <Image
                      src={imageUrl}
                      alt={dish.name}
                      width={400}
                      height={250}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      data-ai-hint={dish.dataAiHint}
                    />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow p-4">
                  <CardTitle className="text-xl font-headline">{dish.name}</CardTitle>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{dish.description}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <p className="text-lg font-bold text-primary">₹{dish.price.toFixed(2)}</p>
                  <Button variant="secondary">Details</Button>
                </CardFooter>
              </Card>
            </DialogTrigger>
          )})}
        </div>
        {selectedDish && <DishDetailDialog dish={selectedDish} />}
      </Dialog>
    </>
  );
}
