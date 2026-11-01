import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Educación y Ciencias',
  description: 'Explora el fascinante mundo de la ciencia, la naturaleza y juegos educativos interactivos.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <div id="fb-root"></div>
        <Script id="facebook-sdk-init" strategy="lazyOnload">
          {`
            window.fbAsyncInit = function() {
              try {
                FB.init({
                  xfbml      : true,
                  version    : 'v20.0'
                });
              } catch (err) {
                console.error("Error inicializando Facebook SDK:", err);
              }
            };
      
            (function(d, s, id){
               var js, fjs = d.getElementsByTagName(s)[0];
               if (d.getElementById(id)) {return;}
               js = d.createElement(s); js.id = id;
               js.onerror = function(err) {
                 console.error("Error al descargar script de Facebook SDK:", err);
               };
               js.src = "https://connect.facebook.net/es_ES/sdk.js";
               fjs.parentNode.insertBefore(js, fjs);
             }(document, 'script', 'facebook-jssdk'));
          `}
        </Script>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
