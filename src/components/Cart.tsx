'use client';

import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';

export function Cart() {
  const { items, totalPrice, totalItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const { toast } = useToast();

  const handlePlaceOrder = () => {
    if (items.length === 0) {
      toast({
        title: "Your cart is empty",
        description: "Add some items to place an order.",
        variant: 'destructive',
      });
      return;
    }
    
    clearCart();
    toast({
      title: 'Order Placed!',
      description: 'Thank you for your order. It will be ready shortly.',
    });
  };

  return (
    <>
      <SheetHeader>
        <SheetTitle>My Order ({totalItems})</SheetTitle>
      </SheetHeader>
      <div className="flex h-full flex-col">
        {items.length > 0 ? (
          <>
            <ScrollArea className="flex-grow pr-4">
              <div className="flex flex-col gap-4 py-4">
                {items.map((item) => (
                  <div key={item.dish.id} className="flex items-start gap-4">
                    <Image
                      src={item.dish.image}
                      alt={item.dish.name}
                      width={64}
                      height={64}
                      className="rounded-md object-cover"
                      data-ai-hint={item.dish.dataAiHint}
                    />
                    <div className="flex-grow">
                      <p className="font-semibold">{item.dish.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ₹{item.dish.price.toFixed(2)}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.dish.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.dish.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                       <p className="font-semibold">
                       ₹{(item.dish.price * item.quantity).toFixed(2)}
                       </p>
                       <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => removeFromCart(item.dish.id)}
                       >
                         <Trash2 className="h-4 w-4" />
                       </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <SheetFooter className="mt-auto">
              <div className="w-full space-y-4 pt-4">
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <Button className="w-full" size="lg" onClick={handlePlaceOrder}>
                  Place Order
                </Button>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <ShoppingCart className="h-20 w-20 text-muted-foreground/50" />
            <h3 className="text-xl font-semibold">Your cart is empty</h3>
            <p className="text-muted-foreground">
              Looks like you haven't added anything to your order yet.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
