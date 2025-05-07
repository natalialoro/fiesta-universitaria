'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Inscripcion } from '@/types/inscripcion';
import { guardarInscripcion } from '@/db/indexedDB';
import { enviarInscripcion, obtenerInscripcionesDesdeBackend } from '@/services/inscripcionesService';


interface InscripcionesContextType {
  inscripciones: Inscripcion[];
  agregarInscripcion: (inscripcion: Omit<Inscripcion, 'id'>) => Promise<void>;
  borrarInscripcionesLocal: () => void;
}

const InscripcionesContext = createContext<InscripcionesContextType | undefined>(undefined);

export const InscripcionesProvider = ({ children }: { children: React.ReactNode }) => {
  const [inscripciones, setInscripciones] = useState<Inscripcion[]>([]);

  useEffect(() => {
    const cargarInscripciones = async () => {
      try {
        const data = await obtenerInscripcionesDesdeBackend();
        setInscripciones(data);
      } catch (error) {
        console.error('Error cargando inscripciones desde el backend:', error);
      }
    };
    cargarInscripciones();
  }, []);
  

  const agregarInscripcion = async (inscripcion: Omit<Inscripcion, 'id'>) => {
    const inscripcionConId: Inscripcion = {
      ...inscripcion,
      id: crypto.randomUUID(),
    };

    try {
      await guardarInscripcion(inscripcionConId);
      await enviarInscripcion(inscripcionConId);       
      setInscripciones((prev) => [...prev, inscripcionConId]); 
    } catch (error) {
      console.error('Error al agregar inscripción:', error);
    }
  };

  const borrarInscripcionesLocal = () => {
    setInscripciones([]);
  };

  return (
    <InscripcionesContext.Provider value={{ inscripciones, agregarInscripcion, borrarInscripcionesLocal }}>
      {children}
    </InscripcionesContext.Provider>
  );
};

export const useInscripciones = () => {
  const context = useContext(InscripcionesContext);
  if (!context) {
    throw new Error('useInscripciones debe ser usado dentro de un InscripcionesProvider');
  }
  return context;
};


