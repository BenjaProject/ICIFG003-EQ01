import { Component, effect, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CursoStore } from '@features/cursos/services/curso.store';
import { EstudianteStore } from '@features/estudiantes/services/estudiante.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-estudiante-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './estudiante-form.component.html',
  styleUrl: './estudiante-form.component.css',
})
export class EstudianteFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private _estStore = inject(EstudianteStore);
  private route = inject(ActivatedRoute);
  cursoStore = inject(CursoStore);

  private namePattern = '^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$';

  // 1. Validador personalizado para detectar RUN duplicado en tiempo real
  runDuplicateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const runValue = control.value;
      if (!runValue) return null;

      // Obtenemos el ID actual para no chocar con nosotros mismos al editar
      const currentId = this.form?.get('idEstudiante')?.value;
      
      const exists = this._estStore.estudiantes().some(
        est => est.run === runValue && est.idEstudiante !== currentId
      );

      return exists ? { runInUse: true } : null;
    };
  }

  // 2. Definición del formulario con el validador incluido
  form = this.fb.group({
    idEstudiante: [0],
    nombre1: ['', [Validators.required, Validators.pattern(this.namePattern)]],
    nombre2: ['', [Validators.required, Validators.pattern(this.namePattern)]],
    apellido1: ['', [Validators.required, Validators.pattern(this.namePattern)]],
    apellido2: ['', [Validators.required, Validators.pattern(this.namePattern)]],
    run: ['', [Validators.required, this.runDuplicateValidator()]],
    idCurso: [null as number | null, Validators.required]
  });

  getStore() {
    return this._estStore;
  }

  constructor() {
    effect(() => {
      const estudiante = this._estStore.selectedEst();
      if (estudiante) {
        const cursoId = (estudiante as any)?.curso?.idCurso ?? (estudiante as any)?.curso?.id ?? 0;
        this.form.patchValue({
          idEstudiante: (estudiante as any).idEstudiante ?? 0,
          nombre1: (estudiante as any).nombre1 ?? '',
          nombre2: (estudiante as any).nombre2 ?? '',
          apellido1: (estudiante as any).apellido1 ?? '',
          apellido2: (estudiante as any).apellido2 ?? '',
          run: (estudiante as any).run ?? '',
          idCurso: cursoId,
        });
      }
    });
  }

  ngOnInit(): void {
    this.cursoStore.loadCursos();

    this.route.queryParamMap.subscribe(params => {
      const cursoIdParam = params.get('cursoId');
      if (cursoIdParam && this.form.get('idEstudiante')?.value === 0) {
        this.form.patchValue({ idCurso: Number(cursoIdParam) });
      }
    });
  }

  guardar() {
    if (!this.form.valid) return;

    const formValue = this.form.getRawValue();
    const cursoId = Number(formValue.idCurso);
    
    const payload = {
      idEstudiante: formValue.idEstudiante,
      nombre1: formValue.nombre1,
      nombre2: formValue.nombre2,
      apellido1: formValue.apellido1,
      apellido2: formValue.apellido2,
      run: formValue.run,
      curso: cursoId ? { idCurso: cursoId } : null,
    };

    if (formValue.idEstudiante) {
      this._estStore.updateEstudiante(payload as any);
    } else {
      this._estStore.addEstudiante(payload as any);
    }

    this.resetForm();
  }

  cancelar() {
    this._estStore.clearSelected();
    this.resetForm();
  }

  private resetForm() {
    this.form.reset({
      idEstudiante: 0,
      nombre1: '',
      nombre2: '',
      apellido1: '',
      apellido2: '',
      run: '',
      idCurso: null,
    });
    
    const cursoIdParam = this.route.snapshot.queryParamMap.get('cursoId');
    if (cursoIdParam) {
      this.form.patchValue({ idCurso: Number(cursoIdParam) });
    }
  }
}