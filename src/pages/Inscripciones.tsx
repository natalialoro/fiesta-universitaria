import { useInscripciones } from '../context/InscripcionesContext';
import Link from 'next/link';

export default function Inscripciones() {
  const { inscripciones } = useInscripciones();

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold text-center mb-6">Inscripciones</h1>
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Lista de Inscripciones</h2>
        {inscripciones.length === 0 ? (
          <p className="text-center text-gray-600">No hay inscripciones aún.</p>
        ) : (
          <ul>
            {inscripciones.map((inscripcion) => (
              <li key={inscripcion.id} className="mb-4 border-b pb-2">
                <h3 className="font-medium">{inscripcion.nombre}</h3>
                <p><strong>Correo:</strong> {inscripcion.correo}</p>
                <p><strong>Semestre:</strong> {inscripcion.semestre || 'No especificado'}</p>
                {inscripcion.acompanante && (
                  <p><strong>Acompañante:</strong> {inscripcion.nombreAcompanante}</p>
                )}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-6 text-center">
          <Link href="/" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Volver al formulario
          </Link>
        </div>
      </div>
    </main>
  );
}