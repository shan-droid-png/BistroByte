"use client";

import { useState } from 'react';
import { dishes, categories } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0].id);

  const filteredDishes = dishes.filter(dish => dish.category === selectedCategory);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-headline tracking-tight sm:text-5xl md:text-6xl">
          Dish Gallery
        </h1>
        <p className="mt-3 text-lg text-muted-foreground sm:mt-4">
          A visual journey through our delicious offerings.
        </p>
      </div>

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

      <div className="flex flex-col gap-4 max-w-4xl mx-auto">
        {filteredDishes.map((dish) => {
          return (
            <Card 
              key={dish.id}
              className="overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-xl w-full"
            >
              <CardContent className="p-4 flex items-center gap-6">
                <div className="w-32 h-32 relative flex-shrink-0">
                    <Image
                      src={dish.image}
                      alt={`Photo of ${dish.name}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                      data-ai-hint={dish.dataAiHint}
                    />
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold font-headline">{dish.name}</h3>
                  <p className="text-muted-foreground mt-1">{dish.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
