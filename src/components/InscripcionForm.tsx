import React from 'react';
import { useForm } from 'react-hook-form';
import { Inscripcion } from '@/types/inscripcion';

const InscripcionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inscripcion>();

  const onSubmit = (data: Inscripcion) => {
    fetch('http://localhost:5000/inscripciones', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => console.log('Formulario enviado:', data))
      .catch((error) => console.error('Error:', error));
  };

  const mostrarAcompanante = watch('acompanante');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
      <div>
        <label htmlFor="nombre" className="block">Nombre completo</label>
        <input
          id="nombre"
          type="text"
          {...register('nombre', { required: 'Este campo es obligatorio' })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.nombre?.message && <p className="text-red-500">{errors.nombre.message}</p>}
      </div>

      <div>
        <label htmlFor="correo" className="block">Correo institucional</label>
        <input
          id="correo"
          type="email"
          {...register('correo', {
            required: 'Este campo es obligatorio',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@edu\.co$/,
              message: 'El correo debe ser institucional (.edu.co)',
            }
          })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.correo?.message && <p className="text-red-500">{errors.correo.message}</p>}
      </div>

      <div>
        <label htmlFor="semestre" className="block">Semestre</label>
        <input
          id="semestre"
          type="number"
          {...register('semestre')}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.semestre?.message && <p className="text-red-500">{errors.semestre.message}</p>}
      </div>

      <div>
        <label className="block">
          <input
            type="checkbox"
            {...register('acompanante')}
            className="mr-2"
          />
          ¿Vienes con acompañante?
        </label>

        {mostrarAcompanante && (
          <div>
            <label htmlFor="nombreAcompanante" className="block">Nombre del acompañante</label>
            <input
              id="nombreAcompanante"
              type="text"
              {...register('nombreAcompanante', {
                required: mostrarAcompanante ? 'Este campo es obligatorio' : false,
              })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.nombreAcompanante?.message && <p className="text-red-500">{errors.nombreAcompanante.message}</p>}
          </div>
        )}
      </div>

      <div>
        <label className="block">
          <input
            type="checkbox"
            {...register('terminos', { required: 'Debes aceptar los términos y condiciones' })}
            className="mr-2"
          />
          Acepto los términos y condiciones
        </label>
        {errors.terminos?.message && <p className="text-red-500">{errors.terminos.message}</p>}
      </div>

      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Enviar</button>
    </form>
  );
};

export default InscripcionForm;