"use client";

import { useState } from 'react';
import { useCart } from '@/hooks/use-cart';
import type { Dish } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { generateVideo } from '@/ai/flows/generate-video';
import { Loader2, Film } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface DishDetailDialogProps {
  dish: Dish;
}

export function DishDetailDialog({ dish }: DishDetailDialogProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);

  const handleAddToCart = () => {
    addToCart(dish);
    toast({
      title: 'Added to cart',
      description: `${dish.name} has been added to your order.`,
    });
  };

  const handleGenerateVideo = async () => {
    setIsVideoLoading(true);
    setVideoError(null);
    setVideoUrl(null);
    try {
      const response = await generateVideo({ prompt: dish.name });
      if (response.videoDataUri) {
        setVideoUrl(response.videoDataUri);
      } else {
        setVideoError('Could not generate video at this time.');
      }
    } catch (e) {
      console.error(e);
      setVideoError('An unexpected error occurred while generating the video. Please try again later.');
    } finally {
      setIsVideoLoading(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-video relative bg-muted rounded-lg flex items-center justify-center">
            {videoUrl ? (
                <video src={videoUrl} controls autoPlay className="w-full h-full rounded-lg object-cover" />
            ) : (
                <Image
                  src={dish.image}
                  alt={dish.name}
                  layout="fill"
                  className="w-full h-full rounded-lg object-cover"
                  data-ai-hint={dish.dataAiHint}
                />
            )}
        </div>
        <div className="flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-3xl font-headline">{dish.name}</DialogTitle>
            <DialogDescription className="text-base pt-2">{dish.description}</DialogDescription>
          </DialogHeader>
          
          <div className="my-4">
              <p className="text-2xl font-bold text-primary">₹{dish.price.toFixed(2)}</p>
          </div>
          
          {videoError && (
             <Alert variant="destructive" className="my-4">
                <AlertTitle>Video Generation Failed</AlertTitle>
                <AlertDescription>{videoError}</AlertDescription>
             </Alert>
          )}

          <DialogFooter className="mt-auto flex-col-reverse sm:flex-row items-stretch gap-2">
            <Button size="lg" onClick={handleAddToCart}>
              Add to Order
            </Button>
            <Button size="lg" variant="secondary" onClick={handleGenerateVideo} disabled={isVideoLoading}>
              {isVideoLoading ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                <Film className="mr-2"/>
              )}
              {isVideoLoading ? 'Generating...' : 'Generate Video'}
            </Button>
          </DialogFooter>

        </div>
      </div>
    </DialogContent>
  );
}
