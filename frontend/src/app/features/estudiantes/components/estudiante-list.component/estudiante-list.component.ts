import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudianteStore } from '@features/estudiantes/services/estudiante.store';
import { InasistenciaService } from '@features/inasistencia/services/inasistencia.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-estudiante-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './estudiante-list.component.html',
  styleUrl: './estudiante-list.component.css',
})
export class EstudianteListComponent {

  store = inject(EstudianteStore);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private inasistenciaService = inject(InasistenciaService);

  // Guardamos el cursoId actual para refrescar la lista después
  private currentCursoId: number | null = null;
  attendanceDate = signal(this.getToday());
  attendanceStatus = signal<Record<number, 'present' | 'absent'>>({});
  private attendanceRecordsByStudent: Record<number, number> = {};
  private absentIdsForDate = new Set<number>();
  attendanceError = signal<string | null>(null);
  sendingAttendance = signal(false);
  savedAttendance = signal(false);
//  savedStatus = signal<Record<number, 'present' | 'absent'>>({});
  private readonly attendanceEffect = effect(() => {
    this.applyAttendanceForDate();
  });

  ngOnInit(){
    this.route.queryParamMap.subscribe(params => {
      const cursoIdParam = params.get('cursoId');
      this.currentCursoId = cursoIdParam ? Number(cursoIdParam) : null;
      this.refreshList();
      this.loadAttendanceForDate();
    });
  }

  // Función auxiliar para refrescar los datos sin recargar la página
  private refreshList() {
    if (this.currentCursoId && !Number.isNaN(this.currentCursoId)) {
      this.store.loadEstudiantesByCurso(this.currentCursoId);
    } else {
      this.store.loadEstudiantes();
    }
  }

  sendAttendance(): void {
    const ausentes = this.store
      .estudiantes()
      .filter(estudiante => this.attendanceStatus()[estudiante.idEstudiante] === 'absent')
      .map(estudiante => estudiante.idEstudiante);

    const existingAbsentIds = new Set(
      Object.keys(this.attendanceRecordsByStudent).map(id => Number(id))
    );
    const currentAbsentIds = new Set(ausentes);
    const toAdd = ausentes.filter(id => !existingAbsentIds.has(id));
    const toDelete = Array.from(existingAbsentIds).filter(id => !currentAbsentIds.has(id));

    const requests = [
      ...toAdd.map(id => this.inasistenciaService.agregar(id, this.attendanceDate())),
      ...toDelete.map(id => this.inasistenciaService.quitar(this.attendanceRecordsByStudent[id]))
    ];

    this.attendanceError.set(null);
    this.sendingAttendance.set(true);

    if (requests.length === 0) {
      this.finishSending();
      this.savedAttendance.set(true);
      setTimeout(() => {
        this.savedAttendance.set(false);
      }, 2000);
      return;
    }

    forkJoin(requests).subscribe({
      next: () => {
        this.finishSending();
        this.refreshList();
        this.loadAttendanceForDate();
        this.savedAttendance.set(true);
        setTimeout(() => {
          this.savedAttendance.set(false);
        }, 2000);
      },
      error: () => {
        this.finishSending();
        this.attendanceError.set('Error al enviar asistencia');
      }
    });
  }

  editarEstudiante(estudiante:any){
    this.store.selectEstudiante(estudiante);
  }

  deleteEstudiante(id:number){
    if(confirm('¿Estás seguro de eliminar este estudiante?')){
      this.store.deleteEstudiante(id);
    }
  }

  goToInasistencias(): void {
    if (this.currentCursoId && !Number.isNaN(this.currentCursoId)) {
      this.router.navigate(['/inasistencias'], { queryParams: { cursoId: this.currentCursoId } });
      return;
    }
    this.router.navigate(['/inasistencias']);
  }

  goToAtrasos(): void {
    if (this.currentCursoId && !Number.isNaN(this.currentCursoId)) {
      this.router.navigate(['/atrasos'], { queryParams: { cursoId: this.currentCursoId } });
      return;
    }
    this.router.navigate(['/atrasos']);
  }

  private ensureAttendanceDefaults(): void {
    for (const estudiante of this.store.estudiantes()) {
      if (!this.attendanceStatus()[estudiante.idEstudiante]) {
        this.attendanceStatus.update(current => ({
          ...current,
          [estudiante.idEstudiante]: 'present'
        }));
      }
    }
  }

  isAttendanceSelected(estudianteId: number, status: 'present' | 'absent'): boolean {
    return this.attendanceStatus()[estudianteId] === status;
  }

  setAttendanceStatus(estudianteId: number, status: 'present' | 'absent'): void {
    this.attendanceStatus.update(current => ({
      ...current,
      [estudianteId]: status
    }));
  }

  onAttendanceDateChange(value: string): void {
    this.attendanceDate.set(value);
    this.loadAttendanceForDate();
  }

  private finishSending(): void {
    this.sendingAttendance.set(false);
  }

  private getToday(): string {
    return new Date().toISOString().split('T')[0];
  }

  private loadAttendanceForDate(): void {
    this.attendanceRecordsByStudent = {};
    this.absentIdsForDate = new Set<number>();
    this.applyAttendanceForDate();
    if (!this.attendanceDate()) {
      return;
    }

    const request$ = this.currentCursoId && !Number.isNaN(this.currentCursoId)
      ? this.inasistenciaService.getByCurso(this.currentCursoId)
      : this.inasistenciaService.getAll();

    request$.subscribe({
      next: data => {
        const fecha = this.attendanceDate();
        for (const item of data ?? []) {
          if (item.fecha === fecha && item.estudianteId != null) {
            this.attendanceRecordsByStudent[item.estudianteId] = item.id;
            this.absentIdsForDate.add(item.estudianteId);
          }
        }
        this.applyAttendanceForDate();
      },
      error: () => {
        this.attendanceError.set('Error al cargar asistencia del dia');
        this.applyAttendanceForDate();
      }
    });
  }

  private applyAttendanceForDate(): void {
    const nextStatus: Record<number, 'present' | 'absent'> = {};
    const estudiantes = this.store.estudiantes();
    for (const estudiante of estudiantes) {
      nextStatus[estudiante.idEstudiante] = 'present';
    }

    for (const estudianteId of this.absentIdsForDate) {
      if (nextStatus[estudianteId]) {
        nextStatus[estudianteId] = 'absent';
      }
    }

    this.attendanceStatus.set(nextStatus);
  }
}