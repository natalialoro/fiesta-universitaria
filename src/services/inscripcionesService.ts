import { Inscripcion } from '@/types/inscripcion';
import { guardarInscripcion } from '@/db/indexedDB';

export async function enviarInscripcion(inscripcion: Inscripcion): Promise<void> {
  try {
    await fetch('http://localhost:3001/inscripciones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inscripcion),
    });
    await guardarInscripcion(inscripcion);
  } catch (error) {
    console.error('Error enviando inscripción:', error);
    throw error;
  }
}
  