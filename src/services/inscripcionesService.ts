export const enviarInscripcion = async (datos: any) => {
    try {
      const respuesta = await fetch('http://localhost:5000/inscripciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
      });
  
      if (!respuesta.ok) {
        throw new Error('Error al enviar los datos');
      }
  
      return await respuesta.json();
    } catch (error) {
      console.error('Error en el servicio:', error);
      throw error;
    }
  };
  