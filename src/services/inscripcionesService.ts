import { Inscripcion } from '@/types/inscripcion';
import { guardarInscripcion } from '@/db/indexedDB';

export async function enviarInscripcion(inscripcion: Inscripcion): Promise<void> {
  try {
    await fetch('http://localhost:5000/inscripciones', {
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
export async function obtenerInscripcionesDesdeBackend(): Promise<Inscripcion[]> {
  const response = await fetch('http://localhost:5000/inscripciones');
  if (!response.ok) throw new Error('Error al obtener inscripciones del backend');
  return response.json();
}
  