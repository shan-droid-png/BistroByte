'use client';

import { GalleryHorizontal, QrCode, UtensilsCrossed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QrCodeDialog } from '@/components/QrCodeDialog';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import Link from 'next/link';

export function Header() {

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur-sm">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <a href="/" className="flex items-center space-x-2">
            <UtensilsCrossed className="h-7 w-7 text-primary" />
            <span className="inline-block font-bold text-2xl font-headline">Rasoi Raj</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Link href="/gallery" passHref>
              <Button variant="ghost" size="icon">
                <GalleryHorizontal className="h-5 w-5" />
                <span className="sr-only">Image Gallery</span>
              </Button>
            </Link>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <QrCode className="h-5 w-5" />
                  <span className="sr-only">Show QR Code</span>
                </Button>
              </DialogTrigger>
              <QrCodeDialog />
            </Dialog>
          </nav>
        </div>
      </div>
    </header>
  );
}
