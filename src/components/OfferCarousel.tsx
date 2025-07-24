"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

import { offers } from "@/lib/offers";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";

export function OfferCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-4xl mx-auto"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {offers.map((offer) => (
          <CarouselItem key={offer.id}>
            <Card className="overflow-hidden">
              <CardContent className="p-0 flex flex-col md:flex-row items-center">
                <div className="relative w-full md:w-1/2 aspect-video">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    objectFit="cover"
                    data-ai-hint={offer.dataAiHint}
                  />
                </div>
                <div className="w-full md:w-1/2 p-6 flex flex-col justify-center items-start">
                  <h3 className="text-2xl font-bold font-headline text-primary">
                    {offer.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    {offer.description}
                  </p>
                  <Button className="mt-4">{offer.cta}</Button>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext className="hidden sm:flex" />
    </Carousel>
  );
}
