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


    loadEstudiantes(){
        this.loading.set(true);
        this.error.set(null);
        this.estService.getAll().subscribe({
            next: data =>{
                this.estudiantes.set(data);
                this.loading.set(false);
            },
            error: err =>{
                this.error.set('Error al cargar estudiantes');
                this.loading.set(false);
            }  
        })
    }

    loadEstudiantesByCurso(cursoId: number){
        this.loading.set(true);
        this.error.set(null);
        this.estService.getByCurso(cursoId).subscribe({
            next: data =>{
                this.estudiantes.set(data);
                this.loading.set(false);
            },
            error: () =>{
                this.error.set('Error al cargar estudiantes por curso');
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
        this.estService.create(est).subscribe({
            next: e => this.estudiantes.update(list => [...list, e]),
            error: err => {
                this.error.set('Error al agregar estudiante');
            }
        });
    }
    updateEstudiante(est: Estudiante){
        this.estService.update(est).subscribe(
            e => {this.estudiantes.update(list => list.map(s => s.idEstudiante === e.idEstudiante ? e : s));
            this.clearSelected();
            });
    }
    deleteEstudiante(id: number){
        this.estService.delete(id).subscribe({
            next: () => {
                this.estudiantes.update(list =>
                    list.filter(s => s.idEstudiante !== id)
                );
            }

        });
    }
}