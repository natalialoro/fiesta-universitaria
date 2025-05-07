import { openDB } from 'idb';
import { Inscripcion } from '@/types/inscripcion';

const DB_NAME = 'FiestaDB';
const STORE_NAME = 'inscripciones';

export async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
}

export async function guardarInscripcion(data: Inscripcion): Promise<void> {
  const db = await initDB();
  await db.put(STORE_NAME, data);
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
