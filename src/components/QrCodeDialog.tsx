"use client";

import { useState, useEffect } from 'react';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

export function QrCodeDialog() {
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Scan to view menu</DialogTitle>
        <DialogDescription>
          Point your phone's camera at this QR code to open the menu on your device.
        </DialogDescription>
      </DialogHeader>
      <div className="flex items-center justify-center p-4">
        {url ? (
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(url)}&bgcolor=F2EBD3&color=C06014`}
            alt="QR Code"
            width={250}
            height={250}
            className="rounded-lg"
          />
        ) : (
          <Skeleton className="h-[250px] w-[250px] rounded-lg" />
        )}
      </div>
    </DialogContent>
  );
}
