import { Curso } from "@features/cursos/models/curso";

export interface Estudiante{
    idEstudiante: number,
    nombre1: string,
    nombre2:string,
    apellido1: string,
    apellido2: string,
    run: string,
    curso: Curso | null,
    cantAtrasos: number,
    cantInasistencias: number
}