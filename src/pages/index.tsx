import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

const schema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  correo: z.string().email("Correo inválido ejemplo@correo.edu.co").endsWith(".edu.co", "Debe ser un correo institucional .edu.co"),
  semestre: z
    .union([z.string().regex(/^(10|[1-9])$/, "Debe ser un número entre 1 y 10"), z.literal("")])
    .optional(),
  acompanante: z.boolean().optional(),
  nombreAcompanante: z.string().optional(),
  terminos: z.literal(true, {
    errorMap: () => ({ message: "Debes aceptar los términos y condiciones" }),
  }),
}).refine((data) => {
  if (data.acompanante) {
    return data.nombreAcompanante?.trim().length > 0;
  }
  return true;
}, {
  message: "El nombre del acompañante es obligatorio",
  path: ["nombreAcompanante"],
});

type FormData = z.infer<typeof schema>;

export default function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const vieneConAcompanante = watch("acompanante");
  const [enviado, setEnviado] = useState(false);

  const onSubmit = (data: FormData) => {
    console.log("Formulario enviado:", data);
    setEnviado(true);
  };

  return (
    <>
      <Head>
        <title>Inscripción Fiesta Universitaria</title>
      </Head>
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Formulario de Inscripción</h1>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-4">
              <label className="block mb-1">Nombre completo *</label>
              <input {...register("nombre")} className="w-full border px-3 py-2 rounded" />
              {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block mb-1">Correo institucional *</label>
              <input {...register("correo")} className="w-full border px-3 py-2 rounded" />
              {errors.correo && <p className="text-red-500 text-sm">{errors.correo.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block mb-1">Semestre (opcional)</label>
              <input {...register("semestre")} className="w-full border px-3 py-2 rounded" />
              {errors.semestre && <p className="text-red-500 text-sm">{errors.semestre.message}</p>}
            </div>

            <div className="mb-4">
              <label className="inline-flex items-center">
                <input type="checkbox" {...register("acompanante")} className="mr-2" />
                ¿Vienes con acompañante?
              </label>
            </div>

            {vieneConAcompanante && (
              <div className="mb-4">
                <label className="block mb-1">Nombre del acompañante *</label>
                <input {...register("nombreAcompanante")} className="w-full border px-3 py-2 rounded" />
                {errors.nombreAcompanante && (
                  <p className="text-red-500 text-sm">{errors.nombreAcompanante.message}</p>
                )}
              </div>
            )}

            <div className="mb-4">
              <label className="inline-flex items-center">
                <input type="checkbox" {...register("terminos")} className="mr-2" />
                Acepto los términos y condiciones *
              </label>
              {errors.terminos && <p className="text-red-500 text-sm">{errors.terminos.message}</p>}
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Enviar inscripción
            </button>

            {enviado && <p className="text-green-600 mt-4 font-medium">¡Formulario enviado con éxito!</p>}
          </form>
        </div>
      </main>
    </>
  );
}
