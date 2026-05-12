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
  attendanceDate = this.getToday();
  attendanceStatus: Record<number, 'present' | 'absent'> = {};
  attendanceError = signal<string | null>(null);
  sendingAttendance = signal(false);
  private readonly attendanceEffect = effect(() => {
    this.ensureAttendanceDefaults();
  });

  ngOnInit(){
    this.route.queryParamMap.subscribe(params => {
      const cursoIdParam = params.get('cursoId');
      this.currentCursoId = cursoIdParam ? Number(cursoIdParam) : null;
      this.refreshList();
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
      .filter(estudiante => this.attendanceStatus[estudiante.idEstudiante] === 'absent')
      .map(estudiante => estudiante.idEstudiante);

    this.attendanceError.set(null);
    this.sendingAttendance.set(true);
    if (ausentes.length === 0) {
      setTimeout(() => {
        this.finishSending();
      }, 400);
      return;
    }
    forkJoin(ausentes.map(id => this.inasistenciaService.agregar(id, this.attendanceDate))).subscribe({
      next: () => {
        this.finishSending();
        this.refreshList();
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
      if (!this.attendanceStatus[estudiante.idEstudiante]) {
        this.attendanceStatus[estudiante.idEstudiante] = 'present';
      }
    }
  }

  isAttendanceSelected(estudianteId: number, status: 'present' | 'absent'): boolean {
    return this.attendanceStatus[estudianteId] === status;
  }

  setAttendanceStatus(estudianteId: number, status: 'present' | 'absent'): void {
    this.attendanceStatus[estudianteId] = status;
  }

  private finishSending(): void {
    this.sendingAttendance.set(false);
  }

  private getToday(): string {
    return new Date().toISOString().split('T')[0];
  }
}