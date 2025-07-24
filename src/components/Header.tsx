'use client';

import { QrCode, ShoppingCart, UtensilsCrossed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Cart } from '@/components/Cart';
import { QrCodeDialog } from '@/components/QrCodeDialog';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

export function Header() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <a href="/" className="flex items-center space-x-2">
            <UtensilsCrossed className="h-7 w-7 text-primary" />
            <span className="inline-block font-bold text-2xl font-headline">Rasoi Raj</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <QrCode className="h-5 w-5" />
                  <span className="sr-only">Show QR Code</span>
                </Button>
              </DialogTrigger>
              <QrCodeDialog />
            </Dialog>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-5 w-5 justify-center rounded-full p-0"
                    >
                      {totalItems}
                    </Badge>
                  )}
                  <span className="sr-only">Open Cart</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <Cart />
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </div>
    </header>
  );
}
