import ImageCarousel from '@/components/carousel/image-carousel';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import FacebookLoader from '@/components/facebook-loader';
import Puzzle from '@/components/Puzzle';
import JuegoGato from '@/components/JuegoGato';
import Ahorcado from '@/components/Ahorcado/ahorcado/src/App';
import imageData from '@/app/lib/placeholder-images.json';

export default function HomePage() {
  const images = imageData.carousel.map(img => ({...img, url: img.url.replace(/1200x600/g, "1200/600")}));

  return (
    <div className="space-y-12">
      <section className="text-center py-8">
        <h1 className="text-5xl font-headline font-bold text-primary mb-4">
          Bienvenidos a Educación y Ciencias
        </h1>
        <p className="text-xl text-accent max-w-2xl mx-auto">
          Embarcate en un viaje visual en el corazón de la vida salvaje. Explora sorprendentes imágenes de animales majestuosos en sus ambientes naturales.
        </p>
      </section>

      <section>
        <ImageCarousel images={images} />
      </section>

      <section className="grid md:grid-cols-2 gap-8 pt-8">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="font-headline text-3xl text-accent">Nuestra Misión</CardTitle>
            <CardDescription className="text-foreground/70">Descubrir.Aprender.Conservar.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/90">
              En esta página mostraremos la sorprendente belleza del reino animal y promover la conciencia de la importancia de su conservación. A través de imágenes cautivadoras e información relevante, queremos inspirarte para que profundices en el conocimiento del mundo natural y las increíbles formas de vida que lo habitan.
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="font-headline text-3xl text-accent">Explorar mas</CardTitle>
            <CardDescription className="text-foreground/70">Sumergete profundamente en el reino animal</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/90">
              Visita nuestro<a href="/blog" className="text-primary hover:underline">Blog</a> Para fascinantes articulos e historias  del mundo natural, o saber más sobre la <a href="/zoologia" className="text-primary hover:underline">Zoología</a> sección para detallada información sobre el reino animal. Tu aventura comienza aquí.
            </p>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-3xl font-headline font-bold text-center mb-4">Juegos Educativos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-accent">Rompecabezas</CardTitle>
            </CardHeader>
            <CardContent>
              <Puzzle imageUrl={imageData.puzzle.imageUrl} numberOfPieces={16} />
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-accent">Juego del Gato</CardTitle>
            </CardHeader>
            <CardContent>
              <JuegoGato />
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 md:col-span-2">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-accent">El Ahorcado</CardTitle>
            </CardHeader>
            <CardContent>
              <Ahorcado />
            </CardContent>
          </Card>
        </div>
      </section>
      <section>
        <FacebookLoader />
      </section>
    </div>
  );
}
