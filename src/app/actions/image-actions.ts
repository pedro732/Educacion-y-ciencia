
"use server";
import imageData from '@/app/lib/placeholder-images.json';

export interface AnimalImage {
  id: string;
  url: string;
  alt: string;
  hint?: string; 
}

export async function getAnimalImages(): Promise<AnimalImage[]> {
  try {
    return imageData.carousel;
  } catch (error) {
    console.error("Error al obtener imágenes de animales:", error);
    return [];
  }
}
