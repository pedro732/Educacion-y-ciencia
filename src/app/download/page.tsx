
'use client';

import React, { useState } from 'react';
import { findAndGetDownloadUrl } from '@/firebase/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DownloadCloud, Search, File as FileIcon, AlertCircle, Loader, CheckCircle } from 'lucide-react';

export default function DownloadPage() {
  const [fileName, setFileName] = useState<string>('');
  const [folder, setFolder] = useState<string>('test-uploads');
  const [status, setStatus] = useState<'idle' | 'searching' | 'found' | 'error' | 'downloading'>('idle');
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [foundFileName, setFoundFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName) {
      setError('Por favor, introduce el nombre del archivo a buscar.');
      setStatus('error');
      return;
    }

    setStatus('searching');
    setError(null);
    setDownloadUrl(null);
    setFoundFileName(null);

    try {
      const result = await findAndGetDownloadUrl(fileName, folder);
      setDownloadUrl(result.downloadURL);
      setFoundFileName(result.foundFileName);
      setStatus('found');
    } catch (err: any) {
      console.error("Error al buscar archivo:", err);
      setError(err.message || 'Ocurrió un error desconocido.');
      setStatus('error');
    }
  };

  const handleDownload = async () => {
    if (downloadUrl && foundFileName) {
      setStatus('downloading');
      setError(null);
      try {
        // Fetch the file from the cross-origin URL
        const response = await fetch(downloadUrl);
        if (!response.ok) {
          throw new Error(`Error al descargar el archivo: ${response.statusText}`);
        }
        const blob = await response.blob();

        // Create a temporary link element to trigger the download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', foundFileName);
        document.body.appendChild(link);
        link.click();
        
        // Clean up the temporary link and object URL
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
        setStatus('found'); // Return to found state after successful download
      } catch (err: any) {
        console.error("Error al descargar archivo:", err);
        setError(`Fallo en la descarga: ${err.message}`);
        setStatus('error');
      }
    }
  };


  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-4">
            <DownloadCloud className="h-10 w-10 text-primary" />
            <div>
              <CardTitle className="font-headline text-3xl text-accent">Descargar Archivo</CardTitle>
              <CardDescription>Busca y descarga un archivo por su nombre desde el almacenamiento.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="file-name">1. Nombre del archivo a buscar</Label>
              <Input
                id="file-name"
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="Ej: mi-documento.pdf"
                required
              />
               <p className="text-sm text-muted-foreground">La búsqueda no distingue mayúsculas de minúsculas.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="folder-name">2. Carpeta de búsqueda (opcional)</Label>
              <Input
                id="folder-name"
                type="text"
                value={folder}
                onChange={(e) => setFolder(e.target.value)}
                placeholder="Ej: documentos"
              />
              <p className="text-sm text-muted-foreground">Se buscará en la carpeta <code>/{folder}</code> de tu Storage.</p>
            </div>

            <Button type="submit" disabled={status === 'searching' || !fileName} className="w-full">
              {status === 'searching' ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Buscando...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  3. Buscar Archivo
                </>
              )}
            </Button>
          </form>

           {(status !== 'idle' && status !== 'searching') && (
            <div className="mt-6">
              {status === 'error' && (
                <div className="flex items-center gap-2 rounded-md border border-destructive bg-destructive/10 p-3 text-destructive">
                  <AlertCircle className="h-5 w-5" />
                  <p><strong>Error:</strong> {error}</p>
                </div>
              )}
              {status === 'found' && downloadUrl && (
                <div className="space-y-4 rounded-md border border-green-500 bg-green-50 p-4 dark:bg-green-950">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                    <CheckCircle className="h-5 w-5" />
                    <p className="font-semibold">¡Archivo encontrado!</p>
                  </div>
                  
                  <div className="rounded-md border bg-muted p-4">
                    <div className="flex items-start">
                        <FileIcon className="h-12 w-12 text-muted-foreground flex-shrink-0" />
                        <div className="ml-4 flex-grow text-left">
                            <p className="text-sm font-semibold truncate" title={foundFileName || ''}>{foundFileName}</p>
                            <p className="text-sm text-muted-foreground">Listo para descargar.</p>
                        </div>
                    </div>
                     <Button onClick={handleDownload} disabled={status === 'downloading'} className="w-full sm:w-auto mt-4">
                        {status === 'downloading' ? (
                           <>
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                            Descargando...
                           </>
                        ) : (
                           <>
                            <DownloadCloud className="mr-2 h-4 w-4" />
                            Descargar
                           </>
                        )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    Al hacer clic en "Descargar", el archivo se guardará directamente en tu disco duro.
                  </p>
                </div>
              )}
            </div>
           )}
        </CardContent>
      </Card>
    </div>
  );
}
