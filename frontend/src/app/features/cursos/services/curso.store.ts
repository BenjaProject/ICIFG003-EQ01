import { inject, Injectable, signal } from '@angular/core';
import { CursoService } from './curso.service';
import { Curso } from '../models/curso';

@Injectable({
  providedIn: 'root',
})
export class CursoStore {
  private cursoService = inject(CursoService);

  cursos = signal<Curso[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  selectedCurso = signal<Curso | null>(null);

  loadCursos(): void {
    this.loading.set(true);
    this.error.set(null);
    this.cursoService.getAll().subscribe({
      next: data => {
        this.cursos.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        const message = err?.error?.message ?? err?.error ?? 'Error al cargar cursos';
        this.error.set(message);
        this.loading.set(false);
      },
    });
  }

  selectCurso(curso: Curso): void {
    this.selectedCurso.set(curso);
  }

  clearSelected(): void {
    this.selectedCurso.set(null);
  }

  addCurso(curso: Curso): void {
    this.error.set(null);
    this.cursoService.create(curso).subscribe({
      next: data => this.cursos.update(list => [...list, data]),
      error: (err) => {
        const message = err?.error?.message ?? err?.error ?? 'Error al agregar curso';
        this.error.set(message);
      },
    });
  }

  updateCurso(curso: Curso): void {
    this.error.set(null);
    this.cursoService.update(curso).subscribe({
      next: () => {
        this.loadCursos();
        this.clearSelected();
      },
      error: (err) => {
        const message = err?.error?.message ?? err?.error ?? 'Error al actualizar curso';
        this.error.set(message);
      }
    });
  }

  deleteCurso(id: number): void {
    this.error.set(null);
    this.cursoService.delete(id).subscribe({
      next: () => {
        this.loadCursos();
      },
      error: (err) => {
        const message = err?.error?.message ?? err?.error ?? 'Error al eliminar curso';
        this.error.set(message);
      }
    });
  }
}
