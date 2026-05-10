import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CursoStore } from '@features/cursos/services/curso.store';

@Component({
  selector: 'app-curso-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './curso-list.component.html',
  styleUrl: './curso-list.component.css',
})
export class CursoListComponent {
  store = inject(CursoStore);
  private router = inject(Router);

  ngOnInit(): void {
    this.store.loadCursos();
  }

  editarCurso(curso: any): void {
    this.store.selectCurso(curso);
  }

  deleteCurso(id: number): void {
    if (confirm('¿Estás seguro de eliminar este curso?')) {
      this.store.deleteCurso(id);
    }
  }

  verEstudiantes(cursoId: number): void {
    this.router.navigate(['/estudiantes'], { queryParams: { cursoId } });
  }
}
