import React from 'react';
import { Leaf } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-foreground text-background py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4 font-headline">Educación y ciencia</h1>
        <p className="mb-6">
          Este sitio está elaborado para que puedas conocer más acerca del reino animal , de la importancia que revisten para nuestra vida. Te invitamos a tener este web entre tus favoritos.
        </p>
        <div className="flex items-center space-x-4">
          <Leaf className="h-8 w-8 mr-2" />
          <a href="#" aria-label="Facebook" className="hover:text-primary transition-colors">Facebook</a>
          <a href="#" aria-label="Instagram" className="hover:text-primary transition-colors">Instagram</a>
          <a href="#" aria-label="X (formerly Twitter)" className="hover:text-primary transition-colors">X</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
