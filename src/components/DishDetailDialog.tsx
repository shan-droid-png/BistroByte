"use client";

import { useCart } from '@/hooks/use-cart';
import type { Dish } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

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
        <div className="aspect-video relative bg-muted rounded-lg flex items-center justify-center">
            <video key={dish.video} src={dish.video} controls autoPlay loop muted className="w-full h-full rounded-lg object-cover" />
        </div>
        <div className="flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-3xl font-headline">{dish.name}</DialogTitle>
            <DialogDescription className="text-base pt-2">{dish.description}</DialogDescription>
          </DialogHeader>
          
          <div className="my-4">
              <p className="text-2xl font-bold text-primary">₹{dish.price.toFixed(2)}</p>
          </div>
          
          <DialogFooter className="mt-auto">
            <Button size="lg" className="w-full" onClick={handleAddToCart}>
              Add to Order
            </Button>
          </DialogFooter>

        </div>
      </div>
    </DialogContent>
  );
}
