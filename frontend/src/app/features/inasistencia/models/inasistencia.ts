export interface Inasistencia{
    id: number,
    fecha: string,
    justificada: boolean,
    estudianteId: number | null,
    cursoId: number | null,
    nombreCurso: string,
    nombreEstudiante: string,
    apellidoEstudiante: string
}