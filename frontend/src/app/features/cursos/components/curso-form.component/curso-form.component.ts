import { Component, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CursoStore } from '@features/cursos/services/curso.store';

@Component({
  selector: 'app-curso-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './curso-form.component.html',
  styleUrl: './curso-form.component.css',
})
export class CursoFormComponent {
  private fb = inject(FormBuilder);
  private cursoStore = inject(CursoStore);

  form = this.fb.group({
    idCurso: [0],
    nombreCurso: ['', Validators.required],
  });

  constructor() {
    effect(() => {
      const curso = this.cursoStore.selectedCurso();
      if (curso) {
        this.form.patchValue(curso);
      }
    });
  }

  guardar(): void {
    if (!this.form.valid) return;
    const curso = this.form.value;
    if (curso.idCurso) {
      this.cursoStore.updateCurso(curso as any);
    } else {
      this.cursoStore.addCurso(curso as any);
    }
    this.form.reset({ idCurso: 0, nombreCurso: '' });
  }

  cancelar(): void {
    this.cursoStore.clearSelected();
    this.form.reset({ idCurso: 0, nombreCurso: '' });
  }
}
