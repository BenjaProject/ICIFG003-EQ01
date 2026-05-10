import { Component, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CursoStore } from '@features/cursos/services/curso.store';
import { EstudianteStore } from '@features/estudiantes/services/estudiante.store';

@Component({
  selector: 'app-estudiante-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './estudiante-form.component.html',
  styleUrl: './estudiante-form.component.css',
})
export class EstudianteFormComponent {
  private fb = inject(FormBuilder);
  private _estStore = inject(EstudianteStore);
  cursoStore = inject(CursoStore);

  getStore(){
    return this._estStore;
  }

  form = this.fb.group({
    idEstudiante: [0],
    nombre1: ['', Validators.required],
    nombre2: ['', Validators.required],
    apellido1: ['', Validators.required],
    apellido2: ['', Validators.required],
    run: ['', Validators.required],
    idCurso: [null]
  });

  constructor(){
    effect(() => {
      const estudiante = this._estStore.selectedEst();
      if(estudiante){
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
  }


  guardar(){
    if(!this.form.valid) return;
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
    if(formValue.idEstudiante){
      this._estStore.updateEstudiante(payload as any);
    }
    else{
      this._estStore.addEstudiante(payload as any);
    }
    this.form.reset({
      idEstudiante: 0,
      nombre1: '',
      nombre2: '',
      apellido1: '',
      apellido2: '',
      run: '',
      idCurso: null,
    });
  }

  cancelar(){
    this._estStore.clearSelected();
    this.form.reset({
      idEstudiante: 0,
      nombre1: '',
      nombre2: '',
      apellido1: '',
      apellido2: '',
      run: '',
      idCurso: null,
    });
  }


}
