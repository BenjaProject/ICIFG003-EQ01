import { inject, Injectable, signal } from "@angular/core";
import { EstudiantesService } from "./estudiantes.service";
import { Estudiante } from "../models/estudiante";

@Injectable({
  providedIn: 'root',
})
export class EstudianteStore{
    private estService=inject(EstudiantesService);
    estudiantes = signal<Estudiante[]>([]);
    loading =signal(false);
    error = signal<string | null>(null);
    selectedEst = signal<Estudiante | null>(null);
    currentCursoId = signal<number | null>(null);


    loadEstudiantes(){
        this.loading.set(true);
        this.error.set(null);
        this.currentCursoId.set(null);
        this.estService.getAll().subscribe({
            next: data =>{
                this.estudiantes.set(data);
                this.loading.set(false);
            },
            error: err =>{
                const message = err?.error?.message ?? err?.error ?? 'Error al cargar estudiantes';
                this.error.set(message);
                this.loading.set(false);
            }  
        })
    }

    loadEstudiantesByCurso(cursoId: number){
        this.loading.set(true);
        this.error.set(null);
        this.currentCursoId.set(cursoId);
        this.estService.getByCurso(cursoId).subscribe({
            next: data =>{
                this.estudiantes.set(data);
                this.loading.set(false);
            },
            error: (err) =>{
                const message = err?.error?.message ?? err?.error ?? 'Error al cargar estudiantes por curso';
                this.error.set(message);
                this.loading.set(false);
            }
        })
    }
    selectEstudiante(est: Estudiante){
        this.selectedEst.set(est);
    }

    clearSelected(){
        this.selectedEst.set(null);
    }
    addEstudiante(est: Estudiante){
        this.error.set(null);
        this.estService.create(est).subscribe({
            next: e => this.estudiantes.update(list => [...list, e]),
            error: err => {
                const message = err?.error?.message ?? err?.error ?? 'Error al agregar estudiante';
                this.error.set(message);
            }
        });
    }
    updateEstudiante(est: Estudiante){
        this.error.set(null);
        this.estService.update(est).subscribe({
            next: e => {
                const cursoId = this.currentCursoId();
                if (cursoId) {
                    this.loadEstudiantesByCurso(cursoId);
                } else {
                    this.estudiantes.update(list => list.map(s => s.idEstudiante === e.idEstudiante ? e : s));
                }
                this.clearSelected();
            },
            error: (err) => {
                const message = err?.error?.message ?? err?.error ?? 'Error al actualizar estudiante';
                this.error.set(message);
            }
        });
    }
    deleteEstudiante(id: number){
        this.error.set(null);
        this.estService.delete(id).subscribe({
            next: () => {
                const cursoId = this.currentCursoId();
                if (cursoId) {
                    this.loadEstudiantesByCurso(cursoId);
                } else {
                    this.loadEstudiantes();
                }
            },
            error: (err) => {
                const message = err?.error?.message ?? err?.error ?? 'Error al eliminar estudiante';
                this.error.set(message);
            }

        });
    }
}