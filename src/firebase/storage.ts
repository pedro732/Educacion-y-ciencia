
'use server';

import { storage } from './config';
import { ref, uploadString, getDownloadURL, listAll } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

/**
 * Uploads a file to Firebase Storage using a Base64 data URI.
 * @param dataUrl The file as a data URI string (e.g., 'data:image/png;base64,...').
 * @param originalFileName The original name of the file.
 * @param path The path in the storage bucket to upload to.
 * @returns A promise that resolves with the download URL of the uploaded file.
 */
export async function uploadImage(dataUrl: string, originalFileName: string, path: string = 'images'): Promise<string> {
  if (!storage) {
    throw new Error("Firebase Storage is not initialized.");
  }
  if (!dataUrl) {
    throw new Error("No file data provided for upload.");
  }

  const match = dataUrl.match(/^data:(.+);base64,(.+)$/);
  if (!match) {
    throw new Error("Invalid data URI format.");
  }
  const contentType = match[1];
  const base64Data = match[2];

  const fileName = `${uuidv4()}-${originalFileName}`;
  const storageRef = ref(storage, `${path}/${fileName}`);
  const metadata = {
    contentType: contentType,
  };

  try {
    const snapshot = await uploadString(storageRef, base64Data, 'base64', metadata);
    console.log("Upload successful:", snapshot.metadata.fullPath);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error: any) {
    console.error("Error uploading file to Firebase Storage:", error);
    throw new Error(`Failed to upload file: ${error.message || 'Unknown error'}`);
  }
}

/**
 * Gets the download URL for a file in Firebase Storage.
 * @param filePath The full path to the file in the storage bucket (e.g., 'images/my-image.jpg').
 * @returns A promise that resolves with the download URL.
 */
export async function getImageUrl(filePath: string): Promise<string> {
    if (!storage) {
        throw new Error("Firebase Storage is not initialized.");
    }
    if (!filePath) {
        throw new Error("No file path provided.");
    }

    const storageRef = ref(storage, filePath);

    try {
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    } catch (error: any) {
        console.error("Error getting file URL from Firebase Storage:", error);
        if (error.code === 'storage/object-not-found') {
            throw new Error(`File not found at path: ${filePath}`);
        }
        throw new Error("Failed to get file URL.");
    }
}

/**
 * Finds a file in a given folder by its suffix and returns its download URL.
 * @param fileName The name of the file to search for (e.g., 'my-photo.jpg').
 * @param path The folder path to search within (e.g., 'test-uploads').
 * @returns A promise that resolves with the download URL and the full name of the found file.
 */
export async function findAndGetDownloadUrl(fileName: string, path: string = 'test-uploads'): Promise<{ downloadURL: string; foundFileName: string }> {
  if (!storage) {
    throw new Error("Firebase Storage no está inicializado.");
  }
  if (!fileName) {
    throw new Error("No se proporcionó un nombre de archivo para la búsqueda.");
  }

  const folderRef = ref(storage, path);
  
  try {
    const res = await listAll(folderRef);
    const normalizedSearchName = fileName.toLowerCase();

    // Find the first item that ends with the desired file name (case-insensitive)
    const foundItem = res.items.find(itemRef => itemRef.name.toLowerCase().endsWith(normalizedSearchName));

    if (foundItem) {
      const downloadURL = await getDownloadURL(foundItem);
      return { downloadURL, foundFileName: foundItem.name };
    } else {
      // Also search in prefixes (subfolders) if you want to search recursively
      // This simple implementation does not search subfolders.
      throw new Error(`No se encontró ningún archivo que termine con "${fileName}" en la carpeta "${path}".`);
    }
  } catch (error: any) {
    console.error("Error al buscar el archivo:", error);
    // Re-throw specific errors or a generic one
    if (error.message.startsWith('No se encontró')) {
        throw error;
    }
    throw new Error(`Error al buscar en la carpeta "${path}". Es posible que la carpeta no exista o que haya un problema de permisos.`);
  }
}
