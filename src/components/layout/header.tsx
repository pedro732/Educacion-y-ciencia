
import Link from 'next/link';
import { Home, Newspaper, PawPrint, Sprout, Leaf, UploadCloud, DownloadCloud, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/', label: 'Inicio', icon: Home, isExternal: false },
  { href: '/blog', label: 'Blog', icon: Newspaper, isExternal: false },
  { href: '/zoologia', label: 'Zoología', icon: PawPrint, isExternal: false },
  { href: '/ecologia', label: 'Ecología', icon: Sprout, isExternal: false },
  { href: '/upload-test', label: 'Prueba', icon: UploadCloud, isExternal: false },
  { href: '/download', label: 'Descarga', icon: DownloadCloud, isExternal: false },
  { href: 'https://quark-charm.cl', label: 'Principal', icon: Globe, isExternal: true },
];

export default function Header() {
  return (
    <header className="bg-background shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-2xl font-headline font-bold text-primary hover:text-primary/80 transition-colors">
          <Leaf className="h-8 w-8" />
          Educación y Ciencia
        </Link>
        <ul className="flex items-center space-x-2 md:space-x-4">
          {navItems.map((item) => (
            <li key={item.label}>
              <Button variant="ghost" asChild className="text-foreground hover:bg-accent/10 hover:text-accent-foreground transition-colors px-3 py-2 rounded-md">
                <Link 
                  href={item.href} 
                  className="flex items-center gap-2"
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
