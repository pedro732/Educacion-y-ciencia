'use client';
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout } from "lucide-react";
import ecologyData from '@/app/lib/ecology-topics.json';
import placeholderImageData from '@/app/lib/placeholder-images.json';
import { firebaseImages } from '@/app/lib/images';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ContentCarousel from "@/components/carousel/ContentCarousel";

interface EcologyTopic {
  id: string;
  title: string;
  description: string;
  category: string;
  imageId: string;
}

interface ImageInfo {
  imageUrl: string;
  aiHint: string;
  linkedFiles?: Record<string, string>;
}

const dynamicImageMap: Record<string, ImageInfo> = {
  eco11: {
    imageUrl: firebaseImages.ecology.pesticidas.url,
    aiHint: firebaseImages.ecology.pesticidas.aiHint,
    linkedFiles: {
      'INFOGRAFIA': firebaseImages.ecology.resumen.url,
    }
  },
  eco12: {
    imageUrl: firebaseImages.ecology.arrecife.url,
    aiHint: firebaseImages.ecology.arrecife.aiHint,
    linkedFiles: {
        'INFOGRAFÍA': firebaseImages.ecology.maximasPdf.url,
    }
  },
  eco13: {
    imageUrl: firebaseImages.ecology.lirio.url,
    aiHint: firebaseImages.ecology.lirio.aiHint,
    linkedFiles: {
        'NIVELES': firebaseImages.ecology.nivelesDeVida.url,
    }
  },
  eco14: {
    imageUrl: firebaseImages.ecology.ciervo.url,
    aiHint: firebaseImages.ecology.ciervo.aiHint,
    linkedFiles: {
        'INFOGRAFÍA': firebaseImages.ecology.claves.url,
    }
  },
  eco15: {
    imageUrl: firebaseImages.ambiente.ososSalmones.url,
    aiHint: firebaseImages.ambiente.ososSalmones.aiHint,
    linkedFiles: {
        'INFOGRAFIA': firebaseImages.ambiente.cosechaSalmones.url,
    }
  },
  eco16: {
    imageUrl: firebaseImages.ambiente.pinos.url,
    aiHint: firebaseImages.ambiente.pinos.aiHint,
  },
  eco17: {
      imageUrl: firebaseImages.ambiente.floracion.url,
      aiHint: firebaseImages.ambiente.floracion.aiHint,
      linkedFiles: {
          'SOBREPOBLACIÓN': firebaseImages.ambiente.crecimientoHumano.url,
          'FITORREMEDIACIÓN': firebaseImages.ambiente.fitorremediacion.url,
      }
  },
  eco18: {
    imageUrl: 'https://i.pinimg.com/736x/28/d3/14/28d314cf8921dad0a81b7ab91caa5f52.jpg',
    aiHint: 'energy flow matter cycle',
    linkedFiles: {
        'INFOGRAFIA': firebaseImages.ambiente.energiaNutrientes.url,
    }
  },
  eco19: {
    imageUrl: 'https://cdn.kastatic.org/ka-perseus-images/6c06b73f88362d40ae0a44f53dfc875514a97828.png',
    aiHint: 'earth energy budget',
    linkedFiles: {
        'RADIACION SOLAR': firebaseImages.ambiente.radiacionSolar.url,
    }
  },
  eco20: {
    imageUrl: firebaseImages.ambiente.latitudinal.url,
    aiHint: firebaseImages.ambiente.latitudinal.aiHint,
  },
  eco21: {
    imageUrl: firebaseImages.ambiente.uplift.url,
    aiHint: firebaseImages.ambiente.uplift.aiHint,
  },
  eco22: {
    imageUrl: firebaseImages.ambiente.circulation.url,
    aiHint: firebaseImages.ambiente.circulation.aiHint,
  },
  eco23: {
    imageUrl: firebaseImages.ambiente.global.url,
    aiHint: firebaseImages.ambiente.global.aiHint,
  },
  eco24: {
    imageUrl: firebaseImages.ambiente.coriolis.url,
    aiHint: firebaseImages.ambiente.coriolis.aiHint,
    linkedFiles: {
        'IMAGEN 2.10': firebaseImages.ambiente.vientos.url,
    }
  },
  eco25: {
    imageUrl: '/images/ecologia/corrientes_marinas.png',
    aiHint: 'global ocean surface currents map',
    linkedFiles: {
        'PDF DE GRÁFICOS': '/pdf/corrientes_marinas_graficos.pdf',
        'PDF': '/pdf/corrientes_marinas_graficos.pdf',
    }
  },
};

interface FullEcologyTopic extends EcologyTopic, ImageInfo {}

const allEcologyTopics: FullEcologyTopic[] = ecologyData.map(topic => {
  const dynamicImageInfo = dynamicImageMap[topic.id];
  const staticImageInfo = placeholderImageData.ecology.find(p => p.id === topic.imageId);

  let imageInfo: ImageInfo;

  if (dynamicImageInfo) {
    // It's a dynamic image from Firebase or an external URL
    imageInfo = dynamicImageInfo;
  } else if (staticImageInfo) {
    // It's a static image from placeholder-images.json
    imageInfo = {
      imageUrl: staticImageInfo.imageUrl,
      aiHint: staticImageInfo.aiHint,
      linkedFiles: undefined, // Static images from this file don't have linked files by default
    };
  } else {
    // No image found, provide defaults
    imageInfo = {
      imageUrl: '', 
      aiHint: '',
      linkedFiles: undefined,
    };
  }

  return {
    ...topic,
    ...imageInfo
  };
});


const topicsByCategory = allEcologyTopics.reduce((acc, topic) => {
  if (!acc[topic.category]) {
    acc[topic.category] = [];
  }
  acc[topic.category].push(topic);
  return acc;
}, {} as Record<string, FullEcologyTopic[]>);

const FileLink = ({ url, keyword }: { url: string; keyword: string }) => (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary hover:underline cursor-pointer font-bold"
    >
      {keyword}
    </a>
);

const RadiacionSolarExplanation = () => (
    <>
        <DialogHeader>
            <DialogTitle className="font-headline text-2xl text-accent">Presupuesto Energético de la Tierra</DialogTitle>
            <DialogDescription>
                Cómo fluye la energía desde el Sol, a través de la atmósfera, y de vuelta al espacio.
            </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto pr-4 text-foreground/90 text-sm space-y-3">
            <p>Esta imagen muestra el <strong>presupuesto energético de la Tierra</strong>, es decir, cómo fluye la energía desde que llega del Sol hasta que sale de nuevo al espacio. Para que el clima sea estable, lo que entra debe ser igual a lo que sale; sin embargo, aquí vemos cómo los <strong>gases de efecto invernadero</strong> retienen parte de ese calor.</p>
            <p>Aquí tienes el desglose detallado de los procesos, utilizando como base <strong>100 unidades</strong> de radiación solar entrante:</p>
            <hr className="my-2 border-border" />

            <h3 className="font-headline text-lg text-primary !mt-4">1. Energía Solar Entrante (Lado Izquierdo)</h3>
            <p>El Sol emite radiación de onda corta que llega a la parte superior de nuestra atmósfera.</p>
            <ul className="list-disc pl-5 space-y-1">
                <li><strong>Radiación Solar Entrante (100):</strong> Es la fuente total de energía.</li>
                <li><strong>Reflejada por la atmósfera (32):</strong> Antes de tocar el suelo, una parte rebota.
                    <ul className="list-['-_'] pl-5 pt-1">
                        <li>23 unidades son reflejadas por nubes, aerosoles y gases.</li>
                        <li>9 unidades son reflejadas directamente por la superficie (especialmente por el hielo y la nieve, debido al efecto <em>albedo</em>).</li>
                    </ul>
                </li>
                <li><strong>Absorbida por la atmósfera (19):</strong> El aire y las nubes atrapan una pequeña parte mientras baja.</li>
                <li><strong>Absorbida por la superficie (49):</strong> Casi la mitad de la energía solar llega al suelo y los océanos, calentándolos.</li>
            </ul>

            <h3 className="font-headline text-lg text-primary !mt-4">2. Transferencia de Calor desde la Superficie (Centro)</h3>
            <p>La Tierra no solo se calienta, también "mueve" ese calor hacia arriba mediante procesos físicos:</p>
            <ul className="list-disc pl-5 space-y-1">
                <li><strong>Calor sensible (7):</strong> Es el calor que sentimos. El aire en contacto con el suelo caliente se eleva (convección).</li>
                <li><strong>Calor latente / Evapotranspiración (23):</strong> Es la energía utilizada para evaporar agua. Cuando el vapor sube y se condensa en nubes, libera ese calor en la atmósfera.</li>
            </ul>

            <h3 className="font-headline text-lg text-primary !mt-4">3. El Efecto Invernadero y la Radiación de Onda Larga (Lado Derecho)</h3>
            <p>Aquí es donde ocurre el calentamiento global. La Tierra, al estar caliente, emite su propia energía, pero en forma de <strong>radiación de onda larga</strong> (infrarroja).</p>
            <ul className="list-disc pl-5 space-y-1">
                <li><strong>Emisión de la superficie (114):</strong> La Tierra emite mucha energía hacia arriba. Nota que este número es mayor a 100 porque la energía se "recicla" dentro de la atmósfera.</li>
                <li><strong>La barrera de Gases de Efecto Invernadero:</strong> Estos gases (CO₂, metano, etc.) dejan pasar la luz solar, pero atrapan la radiación infrarroja que intenta escapar.
                    <ul className="list-['-_'] pl-5 pt-1">
                        <li><strong>Transmisión Atmosférica (12):</strong> Solo una pequeña fracción del calor de la superficie logra escapar directamente al espacio por la "ventana atmosférica".</li>
                        <li><strong>Radiación de retorno (Back radiation) (95):</strong> La atmósfera devuelve la mayor parte del calor hacia la superficie. Este es el corazón del <strong>efecto invernadero</strong>. Sin esto, la Tierra sería un bloque de hielo, pero en exceso, causa el calentamiento actual.</li>
                    </ul>
                </li>
            </ul>

            <h3 className="font-headline text-lg text-primary !mt-4">4. Salida Final al Espacio</h3>
            <p>Para que el sistema no se sobrecaliente infinitamente, la energía debe salir:</p>
            <ul className="list-disc pl-5 space-y-1">
                <li><strong>Emitido por la atmósfera (48) y las nubes (9):</strong> El calor que eventualmente llega a las capas altas.</li>
                <li><strong>Radiación saliente de onda larga (68):</strong> Si sumas esto a las 32 unidades reflejadas al principio ($68 + 32 = 100$), el balance debería ser cero.</li>
            </ul>

            <hr className="my-2 border-border" />
            
            <h3 className="font-headline text-lg text-primary !mt-4">Resumen del mecanismo</h3>
            <p>Lo que la imagen explica visualmente es que la superficie de la Tierra recibe energía de dos fuentes: <strong>el Sol (49 unidades)</strong> y <strong>la atmósfera/nubes (95 unidades)</strong>. Al recibir tanto "calor de retorno", la temperatura de la superficie aumenta por encima de lo que debería si solo dependiera del Sol.</p>
        </div>
    </>
);

const EcologyCard = ({ topic }: { topic: FullEcologyTopic }) => {
    let descriptionParts: (string | JSX.Element)[] = [topic.description];

    // Pass 1: Handle File Links
    if (topic.linkedFiles) {
        const keywords = Object.keys(topic.linkedFiles);
        if (keywords.length > 0) {
            const regex = new RegExp(`(${keywords.join('|')})`, 'gi');
            const parts = topic.description.split(regex);
            
            descriptionParts = parts.map((part, index) => {
                const upperCasePart = part.toUpperCase();
                if (topic.linkedFiles && keywords.includes(upperCasePart)) {
                    return <FileLink key={`file-${index}`} url={topic.linkedFiles[upperCasePart]} keyword={part} />;
                }
                return part;
            });
        }
    }
    
    // Pass 2: Handle Explanation Dialog
    const triggerText = '( clic para ver la explicación)';
    const finalParts: (string | JSX.Element)[] = [];
    let triggerFound = false;

    descriptionParts.forEach((part, index) => {
        if (typeof part === 'string' && part.includes(triggerText)) {
            triggerFound = true;
            const subParts = part.split(triggerText);
            if (subParts[0]) finalParts.push(subParts[0]);
            
            finalParts.push(
                <Dialog key={`dialog-${index}`}>
                    <DialogTrigger asChild>
                        <span className="text-primary hover:underline cursor-pointer font-bold">
                            {triggerText}
                        </span>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl p-6">
                        <RadiacionSolarExplanation />
                    </DialogContent>
                </Dialog>
            );

            if (subParts[1]) finalParts.push(subParts[1]);
        } else {
            finalParts.push(part);
        }
    });

    return (
        <Card className="overflow-hidden shadow-lg h-full flex flex-col">
            <Dialog>
                <DialogTrigger asChild>
                    <div className="relative w-full aspect-video bg-muted cursor-pointer">
                    {topic.imageUrl && (
                        <Image
                        src={topic.imageUrl}
                        alt={topic.title}
                        fill
                        className="object-cover"
                        data-ai-hint={topic.aiHint}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    )}
                    </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl p-0">
                    <DialogHeader>
                        <DialogTitle className="sr-only">{topic.title}</DialogTitle>
                        <DialogDescription className="sr-only">Vista ampliada de la imagen para {topic.title}.</DialogDescription>
                    </DialogHeader>
                    <div className="relative aspect-video">
                    {topic.imageUrl && (
                        <Image
                        src={topic.imageUrl.includes('picsum') ? topic.imageUrl.replace(/(\d+)\/(\d+)/, (match, width, height) => `${Math.floor(parseInt(width)*1.5)}/${Math.floor(parseInt(height)*1.5)}`) : topic.imageUrl}
                        alt={topic.title}
                        fill
                        className="object-contain"
                        quality={100}
                        />
                    )}
                    </div>
                </DialogContent>
            </Dialog>
            
            <div className="flex flex-col flex-grow">
              <CardHeader>
                  <CardTitle className="font-headline text-2xl text-accent">{topic.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                  <div className="text-foreground/90 whitespace-pre-wrap">
                     {triggerFound ? finalParts : descriptionParts}
                  </div>
              </CardContent>
            </div>
        </Card>
    );
};

export default function EcologyPage() {
  const categoryOrder = ["La red de la vida", "Ecología", "La importancia del ambiente", "Ciclos Biogeoquímicos", "Ecosistemas Marinos", "Dinámicas de Ecosistemas"];
  const sortedCategories = Object.entries(topicsByCategory).sort(([a], [b]) => {
      const indexA = categoryOrder.indexOf(a);
      const indexB = categoryOrder.indexOf(b);
      if (indexA === -1 && indexB === -1) return a.localeCompare(b);
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
  });

  return (
    <div className="space-y-8">
      <header className="text-center py-8">
        <Sprout className="h-16 w-16 mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-headline font-bold text-primary">Explorando la Ecología</h1>
        <p className="text-lg text-accent mt-2 max-w-2xl mx-auto">
          Un viaje a través de los sistemas que sustentan la vida en nuestro planeta.
        </p>
      </header>

      <div className="space-y-12">
        {sortedCategories.map(([category, topics]) => (
          <div key={category} className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl font-headline font-bold text-primary text-center">{category}</h2>
            {topics.length > 1 ? (
              <ContentCarousel>
                {topics.map(topic => <EcologyCard key={topic.id} topic={topic} />)}
              </ContentCarousel>
            ) : (
              topics[0] && <div className="p-1"><EcologyCard topic={topics[0]} /></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
