import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PawPrint, Microscope, BookOpen } from "lucide-react";
import Image from "next/image";
import imageData from '@/app/lib/placeholder-images.json';

interface AnimalProfile {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  imageUrl: string;
  aiHint: string;
  habitat: string;
  diet: string;
}

const animalProfiles: AnimalProfile[] = [
  {
    id: "1",
    name: "León Africano",
    scientificName: "Panthera leo",
    description: "Conocidos como el rey de la selva. Los leones son grandes felinos carnívoros. Ellos están en la cima de los depredadores con sus cuerpos poderosos",
    imageUrl: imageData.zoology[0].imageUrl,
    aiHint: imageData.zoology[0].aiHint,
    habitat: "Pastizales, sabanas y bosques abiertos",
    diet: "Carnívoro (cebras, ñus, búfalos)"
  },
  {
    id: "2",
    name: "Elefante Africano",
    scientificName: "Loxodonta africana",
    description: "Los elefantes, el animal terrestre más grande, son conocidos por su inteligencia, fuertes lazos familiares y largos colmillos. Desempeñan un papel crucial en su ecosistema.",
    imageUrl: imageData.zoology[1].imageUrl,
    aiHint: imageData.zoology[1].aiHint,
    habitat: "Sabanas, bosques y desiertos",
    diet: "Herbívoro (hierbas, hojas, corteza, frutas)"
  },
  {
    id: "3",
    name: "Jirafa",
    scientificName: "Giraffa camelopardalis",
    description: "Las jirafas, el mamífero más alto del mundo, se reconocen por sus cuellos extremadamente largos y su pelaje manchado. Son gentiles gigantes que pastan en el follaje alto..",
    imageUrl: imageData.zoology[2].imageUrl,
    aiHint: imageData.zoology[2].aiHint,
    habitat: "Sabanas, pastizales y bosques abiertos",
    diet: "Herbívora (hojas de acacia, ramitas, frutas)"
  },
];

export default function ZoologyPage() {
  return (
    <div className="space-y-8">
      <header className="text-center py-8">
        <PawPrint className="h-16 w-16 mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-headline font-bold text-primary">Zoología Africana</h1>
        <p className="text-lg text-foreground/80 mt-2">
          Explora el fascinante mundo de animales africanos
        </p>
      </header>

      <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8">
        {animalProfiles.map((animal) => (
          <Card key={animal.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row">
            <div className="relative w-full md:w-1/3 aspect-square md:aspect-auto">
              <Image 
                src={animal.imageUrl} 
                alt={animal.name} 
                fill 
                className="object-cover"
                data-ai-hint={animal.aiHint} 
              />
            </div>
            <div className="md:w-2/3 flex flex-col">
              <CardHeader>
                <CardTitle className="font-headline text-3xl text-accent">{animal.name}</CardTitle>
                <CardDescription className="italic text-foreground/70">{animal.scientificName}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <p className="text-foreground/90">{animal.description}</p>
                <div>
                  <h3 className="font-semibold text-primary flex items-center"><Microscope className="h-5 w-5 mr-2" />Habitat:</h3>
                  <p className="text-foreground/80 pl-7">{animal.habitat}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary flex items-center"><BookOpen className="h-5 w-5 mr-2" />Diet:</h3>
                  <p className="text-foreground/80 pl-7">{animal.diet}</p>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
