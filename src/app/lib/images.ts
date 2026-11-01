'use client';

// This function centralizes the logic for building Firebase Storage URLs.
// It uses environment variables to ensure the bucket name is always correct.
function getFirebaseStorageUrl(filePath: string, token: string): string {
  const bucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  if (!bucket) {
    console.error("Firebase Storage bucket environment variable is not set.");
    return "";
  }
  // The path needs to be URL encoded. e.g., 'folder/image.jpg' becomes 'folder%2Fimage.jpg'
  const encodedPath = encodeURIComponent(filePath);
  return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodedPath}?alt=media&token=${token}`;
}

// Define all dynamic image and file URLs here.
export const firebaseImages = {
  ecology: {
    pesticidas: {
      url: getFirebaseStorageUrl(
        "interconexiones/pesticidas.jpg",
        "81ce450b-1816-44b5-96ab-f775d8695ea9"
      ),
      aiHint: "amphibian pesticides",
    },
    resumen: {
      url: getFirebaseStorageUrl(
        "interconexiones/resumen.jpg",
        "c2d5e8f0-1a2b-3c4d-5e6f-7a8b9c0d1e2f"
      ),
    },
    arrecife: {
      url: getFirebaseStorageUrl(
        "ecologia/arrecife_coral.jpg",
        "cdee5476-97ab-4e3c-8ff8-e0800ba67a5d"
      ),
      aiHint: "coral reef definition",
    },
    maximasPdf: {
      url: getFirebaseStorageUrl(
        "ecologia/maximas.pdf",
        "4c1516f4-7ba5-4768-999f-c7e67ebc0026"
      ),
    },
    lirio: {
      url: getFirebaseStorageUrl(
        "ecologia/lirio.jpg",
        "34e74c90-ccdc-4952-b789-54d68ccd32d3"
      ),
      aiHint: "water lily",
    },
    nivelesDeVida: {
       url: getFirebaseStorageUrl(
        "ecologia/niveles_devida.jpg",
        "a7ed5f36-40c9-4d54-b3c8-826253221807"
      ),
    },
    ciervo: {
      url: getFirebaseStorageUrl(
        "ecologia/ciervo.jpg",
        "27fd7e1b-afe1-423d-a7df-e18c4aedf9cf"
      ),
aiHint: "deer nature",
    },
    claves: {
      url: getFirebaseStorageUrl(
        "ecologia/claves.jpg",
        "a3985a67-42f0-4c61-ae99-0289058b09b0"
      ),
    },
  },
  ambiente: {
    ososSalmones: {
      url: getFirebaseStorageUrl(
        "ambiente/osos_salmones.jpg",
        "b3dd738f-97fe-41f9-b0c4-cc33ac310e37"
      ),
      aiHint: "bears salmon",
    },
    cosechaSalmones: {
      url: getFirebaseStorageUrl(
        "ambiente/cosecha_salmones.jpg",
        "1745a926-481a-49eb-8ae2-6664eec8333a"
      ),
    },
    pinos: {
      url: getFirebaseStorageUrl(
        "ambiente/pinos.jpg",
        "c521a15e-a7a6-4282-924f-cb58272ecfdd"
      ),
      aiHint: "pine trees drought",
    },
    floracion: {
      url: getFirebaseStorageUrl(
        "ambiente/floracion.jpg",
        "7e29f98c-7b1f-406f-8e15-aba9d5cc3886"
      ),
      aiHint: "algae bloom"
    },
    crecimientoHumano: {
      url: getFirebaseStorageUrl(
        "ambiente/crecimiento_humano.jpg",
        "07085a61-cb5b-469e-b0fc-368f9cfca1d0"
      ),
    },
    fitorremediacion: {
      url: getFirebaseStorageUrl(
        "ambiente/fitorremediacion.jpg",
        "5a87156b-6de8-4f62-a221-de0792495037"
      ),
    },
    energiaNutrientes: {
      url: getFirebaseStorageUrl(
        "ambiente/energia_nutrientes.jpg",
        "b7e8c1a9-3d5f-4a8e-9b1c-2f3a4b5c6d7e"
      ),
    },
    radiacionSolar: {
      url: getFirebaseStorageUrl(
        "ambiente/radiacion.jpg",
        "c2d5e8f0-1a2b-3c4d-5e6f-7a8b9c0d1e2f"
      ),
    },
    latitudinal: {
      url: getFirebaseStorageUrl(
        "ambiente/planeta.jpg",
        "e70f7479-bbe4-4e00-bd48-c60813d6d283"
      ),
      aiHint: "planet earth",
    },
    uplift: {
      url: getFirebaseStorageUrl(
        "ambiente/uplift.jpg",
        "a689a368-ca16-457f-93a4-5d8bdfce67ff"
      ),
      aiHint: "air uplift",
    },
    circulation: {
      url: getFirebaseStorageUrl(
        "ambiente/circulation.jpg",
        "25b7d50c-1d47-4039-95a6-050466e9a100"
      ),
      aiHint: "air circulation",
    },
    global: {
      url: getFirebaseStorageUrl(
        "ambiente/global.jpg",
        "d237c39d-9ad5-4067-a316-e5f03f3c0b17"
      ),
      aiHint: "global circulation",
    },
    coriolis: {
      url: getFirebaseStorageUrl(
        "ambiente/Coriolis traducido.jpg",
        "f11670ff-a382-4abc-a415-cd87daf5b59b"
      ),
      aiHint: "coriolis effect",
    },
    vientos: {
      url: getFirebaseStorageUrl(
        "ambiente/vientos.jpg",
        "a123bc98-4afb-4ffb-bb16-5d7be59db3bc"
      ),
      aiHint: "earth wind patterns",
    },
  },
};
