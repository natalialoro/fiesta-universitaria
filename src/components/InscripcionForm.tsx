import React from 'react';
import { useForm } from 'react-hook-form';

const InscripcionForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data: any) => {
    fetch('http://localhost:5000/inscripciones', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => console.log('Formulario enviado:', data))
    .catch(error => console.error('Error:', error));
  };

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
        {errors.nombre && <p className="text-red-500">{errors.nombre.message}</p>}
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
        {errors.correo && <p className="text-red-500">{errors.correo.message}</p>}
      </div>

      <div>
        <label htmlFor="semestre" className="block">Semestre</label>
        <input
          id="semestre"
          type="number"
          {...register('semestre', { min: 1, max: 10 })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {errors.semestre && <p className="text-red-500">El semestre debe estar entre 1 y 10</p>}
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
        {watch('acompanante') && (
          <div>
            <label htmlFor="acompananteNombre" className="block">Nombre del acompañante</label>
            <input
              id="acompananteNombre"
              type="text"
              {...register('acompananteNombre', { required: 'Este campo es obligatorio' })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.acompananteNombre && <p className="text-red-500">{errors.acompananteNombre.message}</p>}
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
        {errors.terminos && <p className="text-red-500">{errors.terminos.message}</p>}
      </div>

      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Enviar</button>
    </form>
  );
};

export default InscripcionForm;
