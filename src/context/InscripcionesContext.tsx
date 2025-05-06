'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { obtenerInscripciones, guardarInscripcion, Inscripcion } from '../db/indexedDB';

interface ContextProps {
  inscripciones: Inscripcion[];
  agregarInscripcion: (data: Inscripcion) => void;
}

const InscripcionesContext = createContext<ContextProps | undefined>(undefined);

export const useInscripciones = () => {
  const context = useContext(InscripcionesContext);
  if (!context) throw new Error('useInscripciones debe usarse dentro de InscripcionesProvider');
  return context;
};

export const InscripcionesProvider = ({ children }: { children: React.ReactNode }) => {
  const [inscripciones, setInscripciones] = useState<Inscripcion[]>([]);

  useEffect(() => {
    obtenerInscripciones().then(setInscripciones);
  }, []);

  const agregarInscripcion = async (data: Inscripcion) => {
    try {
      await guardarInscripcion(data);
      setInscripciones([...inscripciones, data]);
      console.log('Inscripción agregada:', data);
    } catch (error) {
      console.error('Error al guardar inscripción:', error);
    }
  };

  return (
    <InscripcionesContext.Provider value={{ inscripciones, agregarInscripcion }}>
      {children}
    </InscripcionesContext.Provider>
  );
};
