import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper, Feather } from "lucide-react";
import Image from "next/image";
import imageData from '@/app/lib/placeholder-images.json';

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "Las grandes migraciones, un espectáculo de la naturaleza",
      date: "junio, 16, 2025",
      excerpt: "Desde las profundidades del océano hasta las llanuras abiertas, África tiene muchas migraciones  de animales fascinantes.",
      image: imageData.blog[0].image,
      aiHint: imageData.blog[0].aiHint,
    },
    {
      id: 2,
      title: "La migración de los murciélagos en Zambia",
      date: "junio 16, 2025",
      excerpt: "Cada año, cuando llega el final de octubre, los murciélagos frugívoros (Eidolon helvum) se congregan en el Parque Nacional Kasanka de Zambia. A medida que pasan las semanas, más y más murciélagos vuelan desde el Congo hasta que se reúnen más de ocho millones de murciélagos desconcertantes en busca de frutas ricas en semillas.",
      image: imageData.blog[1].image,
      aiHint: imageData.blog[1].aiHint,
    },
    {
      id: 3,
      title: "Los elefantes : Muy inteligentes y muy sociables",
      date: "junio 16, 2025",
      excerpt: "Los elefantes tienen un complejo sistema de comunicación que ha sido ampliamente estudiado por los científicos. De igual manera, la organización que mantienen dentro de sus grupos, así como las muestras afectivas que llegan a entablar entre familiares y compañeros, los identifica como uno de los animales más inteligentes y sociables del reino animal.",
      image: imageData.blog[2].image,
      aiHint: imageData.blog[2].aiHint,
    },
    {
      id: 4,
      title: "Los chimpancés y los bonobos muestran por qué el sexo no solo sirve para reproducirse",
      date: "junio, 16, 2025",
      excerpt: "Un análisis de cómo utilizan el sexo las dos especies de primates para resolver conflictos sugiere que su función social existía en el pariente ancestral que compartimos con ellos",
      image: imageData.blog[3].image,
      aiHint: imageData.blog[3].aiHint,
      url:"https://elpais.com/ciencia/2025-03-12/los-chimpances-y-los-bonobos-muestran-por-que-el-sexo-no-solo-sirve-para-reproducirse.html"
    },
    
    {
      id: 5,
      title: "¿Cuándo y por qué evolucionó la masturbación en los primates? Un nuevo estudio aporta pistas.",
      date: "junio, 16, 2025",
      excerpt: "Aunque la masturbación es común en todo el reino animal, a primera vista parece una paradoja evolutiva: ¿por qué un animal desperdiciaría tiempo, energía y recursos reproductivos en el placer propio en lugar de copular con una pareja?",
      image: imageData.blog[4].image,
      aiHint: imageData.blog[4].aiHint,
      url:"https://www.sciencenews.org/article/masturbation-evolve-primates"
    },
    {
      id: 6,
      title: "La ciencia tiene una nueva teoría sobre el origen del beso: un ritual de limpieza entre primates",
      date: "agosto,21,2025",
      excerpt: "Un estudio sugiere que el acto humano de besarse es un residuo del acicalamiento, en el que los grandes simios utilizan la succión de los labios para limpiar el pelaje de sus familiares y amigos",
      image: imageData.blog[5].image,
      aiHint: imageData.blog[5].aiHint,
      url:"https://elpais.com/ciencia/2024-11-13/la-ciencia-tiene-una-nueva-teoria-sobre-el-origen-del-beso-un-ritual-de-limpieza-entre-primates.html?event_log=go"
    },
  ];

  return (
    <div className="space-y-8">
      <header className="text-center py-8">
        <Newspaper className="h-16 w-16 mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-headline font-bold text-primary">Safari Blog</h1>
        <p className="text-lg text-white/80 mt-2">
  Descubre fascinantes historias y comprende la vida salvaje
</p>

      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Card key={post.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="relative w-full aspect-video">
              <Image 
                src={post.image} 
                alt={post.title} 
                fill 
                className="object-cover"
                data-ai-hint={post.aiHint} 
              />
            </div>
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-accent">{post.title}</CardTitle>
              <CardDescription className="text-sm text-foreground/70">{post.date}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-foreground/90">{post.excerpt}</p>
            </CardContent>
            <div className="p-6 pt-0">
               <a href= {post.url}className="text-primary hover:underline font-semibold flex items-center">
                 Read More <Feather className="h-4 w-4 ml-1" />
               </a>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
