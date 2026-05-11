import { Curso } from "@features/cursos/models/curso";
import { Atraso } from "@features/atraso/models/atraso";
import { Inasistencia } from "@features/inasistencia/models/inasistencia";

export interface Estudiante{
    idEstudiante: number,
    nombre1: string,
    nombre2:string,
    apellido1: string,
    apellido2: string,
    run: string,
    curso: Curso | null,
    cantidadAtrasos: number,
    cantidadInasistencias: number,
    atrasos?: Atraso[],
    inasistencias?: Inasistencia[]
}