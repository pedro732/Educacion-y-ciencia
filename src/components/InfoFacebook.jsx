"use client";

import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const InfoFacebook = () => {
  useEffect(() => {
    // This component is now guaranteed to run only on the client thanks to dynamic import.
    // We just need to ensure the FB SDK has loaded before telling it to parse the page.
    try {
      if (typeof window !== 'undefined' && window.FB && window.FB.XFBML) {
        window.FB.XFBML.parse();
      }
    } catch (error) {
      console.error("Error al analizar XFBML de Facebook:", error);
    }
  }, []); // Empty dependency array ensures this runs once when the component mounts.

  const fbPages = [
    { title: "MideUC", url: "https://www.facebook.com/MideUC" },
    { title: "Sociedad española de Neurociencia", url: "https://www.facebook.com/SENC.neurociencia" },
    { title: "National Geographic", url: "https://www.facebook.com/natgeo" },
  ];
  
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {fbPages.map((page) => (
        <Card key={page.title} className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center font-headline text-accent">{page.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex items-center justify-center">
            <div 
              className="fb-page" 
              data-href={page.url}
              data-tabs="timeline" 
              data-height="400"
              data-small-header="true" 
              data-adapt-container-width="true" 
              data-hide-cover="true" 
              data-show-facepile="false"
            >
              <blockquote cite={page.url} className="fb-xfbml-parse-ignore">
                <a href={page.url}>Cargando {page.title}...</a>
              </blockquote>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default InfoFacebook;
