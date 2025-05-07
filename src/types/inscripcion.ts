export interface Inscripcion {
    id: string;
    nombre: string;
    correo: string;
    semestre?: string;
    acompanante?: boolean;
    nombreAcompanante?: string;
    terminos: boolean;
  }