import { openDB } from 'idb';

const DB_NAME = 'FiestaDB';
const STORE_NAME = 'inscripciones';

export interface Inscripcion {
  id?: number;
  nombre: string;
  correo: string;
  semestre?: string;
  acompanante?: boolean;
  nombreAcompanante?: string;
  terminos: boolean;
}

export async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
}

export async function guardarInscripcion(data: Inscripcion): Promise<void> {
  const db = await initDB();
  await db.add(STORE_NAME, data);
}

export async function obtenerInscripciones(): Promise<Inscripcion[]> {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
}

export async function borrarTodasLasInscripciones(): Promise<void> {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await tx.store.clear();
  await tx.done;
}
