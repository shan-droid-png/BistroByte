"use client";

import { dishes, categories } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
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

      <div className="flex flex-col gap-12 max-w-4xl mx-auto">
        {categories.map((category) => {
          const categoryDishes = dishes.filter(
            (dish) => dish.category === category.id
          );
          if (categoryDishes.length === 0) return null;

          return (
            <section key={category.id} id={category.id}>
              <h2 className="text-3xl font-bold font-headline mb-6 flex items-center gap-3">
                <category.icon className="h-7 w-7 text-primary" />
                {category.name}
              </h2>
              <div className="flex flex-col gap-4">
                {categoryDishes.map((dish) => (
                  <Card
                    key={dish.id}
                    className="overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-xl w-full"
                  >
                    <CardContent className="p-4 flex items-center gap-6">
                      <div className="w-32 h-32 relative flex-shrink-0">
                        <Image
                          src={dish.image}
                          alt={`Photo of ${dish.name}`}
                          fill
                          objectFit="cover"
                          className="rounded-md"
                          data-ai-hint={dish.dataAiHint}
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-xl font-bold font-headline">
                          {dish.name}
                        </h3>
                        <p className="text-muted-foreground mt-1">
                          {dish.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
