"use client";

import { useCart } from '@/hooks/use-cart';
import type { Dish } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { DietarySuggestions } from './DietarySuggestions';
import { Separator } from './ui/separator';

interface DishDetailDialogProps {
  dish: Dish;
}

export function DishDetailDialog({ dish }: DishDetailDialogProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(dish);
    toast({
      title: 'Added to cart',
      description: `${dish.name} has been added to your order.`,
    });
  };

  return (
    <DialogContent className="sm:max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-video relative">
            <Image
              src={dish.image}
              alt={dish.name}
              layout="fill"
              className="w-full h-full rounded-lg object-cover"
              data-ai-hint={dish.dataAiHint}
            />
        </div>
        <div className="flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-3xl font-headline">{dish.name}</DialogTitle>
            <DialogDescription className="text-base pt-2">{dish.description}</DialogDescription>
          </DialogHeader>
          
          <div className="my-4">
              <p className="text-2xl font-bold text-primary">₹{dish.price.toFixed(2)}</p>
          </div>

          <DialogFooter className="mt-auto flex-col-reverse sm:flex-col-reverse items-stretch gap-2">
            <Button size="lg" onClick={handleAddToCart}>
              Add to Order
            </Button>
          </DialogFooter>

          <Separator className="my-4" />
          
          <DietarySuggestions dish={dish} />

        </div>
      </div>
    </DialogContent>
  );
}
