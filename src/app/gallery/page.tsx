"use client";

import { dishes } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function GalleryPage() {

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dishes.map((dish) => {
          return (
            <Card 
              key={dish.id}
              className="overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
            >
              <CardHeader>
                <CardTitle className="font-headline">{dish.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square relative">
                    <Image
                      src={dish.image}
                      alt={`Photo of ${dish.name}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                      data-ai-hint={dish.dataAiHint}
                    />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
