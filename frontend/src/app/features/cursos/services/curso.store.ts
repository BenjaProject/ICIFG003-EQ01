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
    this.cursoService.getAll().subscribe({
      next: data => {
        this.cursos.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error al cargar cursos');
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
    this.cursoService.create(curso).subscribe({
      next: data => this.cursos.update(list => [...list, data]),
      error: () => {
        this.error.set('Error al agregar curso');
      },
    });
  }

  updateCurso(curso: Curso): void {
    this.cursoService.update(curso).subscribe(data => {
      this.cursos.update(list =>
        list.map(item => (item.idCurso === data.idCurso ? data : item))
      );
      this.clearSelected();
    });
  }

  deleteCurso(id: number): void {
    this.cursoService.delete(id).subscribe({
      next: () => {
        this.cursos.update(list => list.filter(item => item.idCurso !== id));
      },
    });
  }
}
