import { Component, effect, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AtrasoStore } from '@features/atraso/services/atraso.store';
import { EstudianteStore } from '@features/estudiantes/services/estudiante.store';

@Component({
  selector: 'app-atraso-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './atraso-form.component.html',
  styleUrl: './atraso-form.component.css',
})
export class AtrasoFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private _atrasoStore = inject(AtrasoStore);
  private _estStore = inject(EstudianteStore);
  private route = inject(ActivatedRoute);

  form = this.fb.group({
    id: [0],
    estudianteId: [null as number | null, Validators.required],
    fecha: ['', Validators.required],
    hora: ['', Validators.required],
    razon: ['', Validators.required],
  });

  get estStore() {
    return this._estStore;
  }

  constructor() {
    effect(() => {
      const atraso = this._atrasoStore.selectedAtraso();
      if (atraso) {
        this.form.get('estudianteId')?.clearValidators();
        this.form.get('estudianteId')?.updateValueAndValidity();

        this.form.patchValue({
          id: atraso.id ?? 0,
          fecha: this.formatDate(atraso.fecha),
          hora: atraso.hora ?? '',
          razon: atraso.razon ?? '',
          estudianteId: null
        });
      } else {
        this.form.get('estudianteId')?.setValidators(Validators.required);
        this.form.get('estudianteId')?.updateValueAndValidity();
      }
    });
  }

  ngOnInit() {
    this._estStore.loadEstudiantes();

    if (this.form.get('id')?.value === 0) {
      this.form.patchValue({
        fecha: new Date().toISOString().split('T')[0],
        hora: new Date().toTimeString().split(' ')[0].substring(0, 5)
      });
    }

    this.route.queryParamMap.subscribe(params => {
      const estudianteIdParam = params.get('estudianteId');
      if (estudianteIdParam && this.form.get('id')?.value === 0) {
        this.form.patchValue({ estudianteId: Number(estudianteIdParam) });
      }
    });
  }

  guardar() {
    if (!this.form.valid) return;

    const formValue = this.form.getRawValue();
    const payload = {
      id: formValue.id as number,
      fecha: new Date(formValue.fecha!) as any,
      hora: formValue.hora!,
      razon: formValue.razon!,
    };

    if (formValue.id && formValue.id !== 0) {
      this._atrasoStore.updateAtraso(payload);
    } else {
      this._atrasoStore.addAtraso(formValue.estudianteId!, payload);
    }
    this.resetForm();
  }

  cancelar() {
    this._atrasoStore.clearSelected();
    this.resetForm();
  }

  private resetForm() {
    this.form.reset({
      id: 0,
      estudianteId: null,
      fecha: new Date().toISOString().split('T')[0],
      hora: new Date().toTimeString().split(' ')[0].substring(0, 5),
      razon: '',
    });
    const estudianteIdParam = this.route.snapshot.queryParamMap.get('estudianteId');
    if (estudianteIdParam) {
      this.form.patchValue({ estudianteId: Number(estudianteIdParam) });
    }
  }

  private formatDate(date: any): string {
    if (!date) return '';
    if (date instanceof Date) return date.toISOString().split('T')[0];
    return date.toString().split('T')[0];
  }
}
