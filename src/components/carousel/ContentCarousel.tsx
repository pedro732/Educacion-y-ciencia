
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "../ui/card";

interface ContentCarouselProps {
  children: React.ReactNode[];
}

export default function ContentCarousel({ children }: ContentCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? children.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === children.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!children || children.length === 0) {
    return <div>No hay contenido para mostrar.</div>;
  }

  return (
    <Card className="relative w-full max-w-2xl mx-auto overflow-hidden rounded-lg shadow-2xl p-0">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {children.map((child, index) => (
          <div key={index} className="flex-shrink-0 w-full p-1">
            {child}
          </div>
        ))}
      </div>

      {children.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full h-8 w-8 z-10"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full h-8 w-8 z-10"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {children.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  currentIndex === index ? "bg-primary" : "bg-primary/50 hover:bg-primary"
                }`}
                aria-label={`Ir a la diapositiva ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </Card>
  );
}
