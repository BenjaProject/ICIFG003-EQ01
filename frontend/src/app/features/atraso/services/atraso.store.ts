import { inject, Injectable, signal } from "@angular/core";
import { AtrasoService } from "./atraso.service";
import { Atraso } from "../models/atraso";

@Injectable({
  providedIn: 'root',
})
export class AtrasoStore{
    private atrasoService = inject(AtrasoService);
    atrasos = signal<Atraso[]>([]);
    loading = signal(false);
    error = signal<string | null>(null);
    selectedAtraso = signal<Atraso | null>(null);
    currentEstudianteId = signal<number | null>(null);
    currentCursoId = signal<number | null>(null);

    loadAtrasos(){
        this.loading.set(true);
        this.error.set(null);
        this.currentEstudianteId.set(null);
        this.currentCursoId.set(null);
        this.atrasoService.getAll().subscribe({
            next: data =>{
                this.atrasos.set(data);
                this.loading.set(false);
            },
            error: err =>{
                const message = err?.error?.message ?? err?.error ?? 'Error al cargar atrasos';
                this.error.set(message);
                this.loading.set(false);
            }  
        })
    }

    loadAtrasosByEstudiante(estudianteId: number){
        this.loading.set(true);
        this.error.set(null);
        this.currentEstudianteId.set(estudianteId);
        this.currentCursoId.set(null);
        this.atrasoService.getByEstudiante(estudianteId).subscribe({
            next: data =>{
                this.atrasos.set(data);
                this.loading.set(false);
            },
            error: (err) =>{
                const message = err?.error?.message ?? err?.error ?? 'Error al cargar atrasos por estudiante';
                this.error.set(message);
                this.loading.set(false);
            }
        })
    }

    loadAtrasosByCurso(cursoId: number){
        this.loading.set(true);
        this.error.set(null);
        this.currentEstudianteId.set(null);
        this.currentCursoId.set(cursoId);
        this.atrasoService.getByCurso(cursoId).subscribe({
            next: data =>{
                this.atrasos.set(data);
                this.loading.set(false);
            },
            error: (err) =>{
                const message = err?.error?.message ?? err?.error ?? 'Error al cargar atrasos por curso';
                this.error.set(message);
                this.loading.set(false);
            }
        })
    }

    selectAtraso(atraso: Atraso){
        this.selectedAtraso.set(atraso);
    }

    clearSelected(){
        this.selectedAtraso.set(null);
    }

    addAtraso(estudianteId: number, atraso: Partial<Atraso>){
        this.error.set(null);
        this.atrasoService.create(estudianteId, atraso).subscribe({
            next: () => {
                const estId = this.currentEstudianteId();
                const cursoId = this.currentCursoId();
                if (estId) {
                    this.loadAtrasosByEstudiante(estId);
                } else if (cursoId) {
                    this.loadAtrasosByCurso(cursoId);
                } else {
                    this.loadAtrasos();
                }
            },
            error: err => {
                const message = err?.error?.message ?? err?.error ?? 'Error al agregar atraso';
                this.error.set(message);
            }
        });
    }

    updateAtraso(atraso: Partial<Atraso>){
        if(!atraso.id) return;
        this.error.set(null);
        this.atrasoService.update(atraso.id, atraso).subscribe({
            next: () => {
                const estId = this.currentEstudianteId();
                const cursoId = this.currentCursoId();
                if (estId) {
                    this.loadAtrasosByEstudiante(estId);
                } else if (cursoId) {
                    this.loadAtrasosByCurso(cursoId);
                } else {
                    this.loadAtrasos();
                }
                this.clearSelected();
            },
            error: (err) => {
                const message = err?.error?.message ?? err?.error ?? 'Error al actualizar atraso';
                this.error.set(message);
            }
        });
    }

    deleteAtraso(id: number){
        this.error.set(null);
        this.atrasoService.delete(id).subscribe({
            next: () => {
                const estId = this.currentEstudianteId();
                const cursoId = this.currentCursoId();
                if (estId) {
                    this.loadAtrasosByEstudiante(estId);
                } else if (cursoId) {
                    this.loadAtrasosByCurso(cursoId);
                } else {
                    this.loadAtrasos();
                }
            },
            error: (err) => {
                const message = err?.error?.message ?? err?.error ?? 'Error al eliminar atraso';
                this.error.set(message);
            }
        });
    }
}
