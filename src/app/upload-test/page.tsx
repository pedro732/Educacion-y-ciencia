
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { uploadImage } from '@/firebase/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadCloud, CheckCircle, AlertCircle, Loader, File as FileIcon, LockKeyhole } from 'lucide-react';

// Helper function to read a file as a data URL
const fileToDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => {
            console.error("Error al leer el archivo:", error);
            reject(error);
        };
        reader.readAsDataURL(file);
    });
};

export default function UploadTestPage() {
  // --- Contraseña de seguridad ---
  // Aquí puedes cambiar la contraseña cuando lo desees.
  const CORRECT_PASSWORD = 'Subida_75';
  // -----------------------------

  const [file, setFile] = useState<File | null>(null);
  const [folder, setFolder] = useState<string>('test-uploads');
  const [password, setPassword] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isImage, setIsImage] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setIsImage(selectedFile.type.startsWith('image/'));
      // Reset status on new file selection
      setStatus('idle');
      setError(null);
      setUploadedFileUrl(null);
    }
  };

  const handleUpload = async () => {
    if (!file || !password) {
      const errMsg = 'Por favor, selecciona un archivo e introduce la contraseña.';
      console.error(errMsg);
      setError(errMsg);
      setStatus('error');
      return;
    }

    if (password !== CORRECT_PASSWORD) {
      const errMsg = 'Contraseña incorrecta.';
      console.error(errMsg);
      setError(errMsg);
      setStatus('error');
      return;
    }

    setStatus('uploading');
    setError(null);
    setUploadedFileUrl(null);

    try {
      // Convert file to a Base64 data URI string
      const dataUrl = await fileToDataURL(file);
      
      // Call the upload function with the data URL
      const downloadURL = await uploadImage(dataUrl, file.name, folder);

      setUploadedFileUrl(downloadURL);
      setStatus('success');
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error al subir el archivo.');
      setStatus('error');
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-4">
            <UploadCloud className="h-10 w-10 text-primary" />
            <div>
              <CardTitle className="font-headline text-3xl text-accent">Subir archivos</CardTitle>
              <CardDescription>Sube cualquier archivo </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="file-upload">1. Selecciona un archivo</Label>
            <Input id="file-upload" type="file" onChange={handleFileChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">2. Introduce la contraseña</Label>
            <div className="relative">
              <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña de subida"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="folder-name">3. Especifica una carpeta (opcional)</Label>
            <Input
              id="folder-name"
              type="text"
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
              placeholder="Ej: documentos, videos..."
            />
            <p className="text-sm text-muted-foreground">El archivo se subirá a la carpeta <code>/{folder}</code> en tu Storage.</p>
          </div>

          <Button onClick={handleUpload} disabled={status === 'uploading' || !file || !password} className="w-full">
            {status === 'uploading' ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Subiendo...
              </>
            ) : (
              '4. Subir Archivo'
            )}
          </Button>

          {status !== 'idle' && (
            <div className="mt-6 space-y-4">
              {status === 'error' && (
                <div className="flex items-center gap-2 rounded-md border border-destructive bg-destructive/10 p-3 text-destructive">
                  <AlertCircle className="h-5 w-5" />
                  <p><strong>Error:</strong> {error}</p>
                </div>
              )}
              {status === 'success' && uploadedFileUrl && (
                <div className="space-y-4 rounded-md border border-green-500 bg-green-50 p-4 dark:bg-green-950">
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                        <CheckCircle className="h-5 w-5" />
                        <p className="font-semibold">¡Subida completada con éxito!</p>
                    </div>
                  
                  <div>
                    <Label>URL del archivo:</Label>
                    <Input type="text" readOnly value={uploadedFileUrl} className="mt-1 bg-white dark:bg-muted" />
                  </div>

                  {isImage ? (
                     <div>
                        <Label>Vista previa del archivo:</Label>
                        <div className="relative mt-2 h-64 w-full overflow-hidden rounded-md border">
                          <Image src={uploadedFileUrl} alt="Vista previa del archivo subido" layout="fill" objectFit="contain" />
                        </div>
                      </div>
                  ) : (
                    <div className="mt-4 flex items-center gap-3 rounded-md border bg-muted p-4">
                      <FileIcon className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-semibold">No se puede previsualizar este tipo de archivo.</p>
                        <a href={uploadedFileUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                          Abrir archivo en una nueva pestaña
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
