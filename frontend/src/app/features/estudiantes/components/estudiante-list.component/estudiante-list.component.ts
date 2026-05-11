import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AtrasoService } from '@features/atraso/services/atraso.service';
import { EstudianteStore } from '@features/estudiantes/services/estudiante.store';
import { InasistenciaService } from '@features/inasistencia/services/inasistencia.service';
// 1. Importamos los nuevos servicios

@Component({
  selector: 'app-estudiante-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estudiante-list.component.html',
  styleUrl: './estudiante-list.component.css',
})
export class EstudianteListComponent {

  store = inject(EstudianteStore);
  private route = inject(ActivatedRoute);
  // 2. Inyectamos los servicios
  private atrasoService = inject(AtrasoService);
  private inasistenciaService = inject(InasistenciaService);

  // Guardamos el cursoId actual para refrescar la lista después
  private currentCursoId: number | null = null;

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

  // 3. Nuevas funciones para los botones (+) y (-)
  addAtraso(estudiante: any) {
    this.atrasoService.agregar(estudiante.idEstudiante).subscribe(() => this.refreshList());
  }

  removeAtraso(estudiante: any) {
    if (estudiante.atrasos?.length > 0) {
      const idAEliminar = estudiante.atrasos[estudiante.atrasos.length - 1].idAtraso;
      this.atrasoService.quitar(idAEliminar).subscribe(() => this.refreshList());
    }
  }

  addInasistencia(estudiante: any) {
    this.inasistenciaService.agregar(estudiante.idEstudiante).subscribe(() => this.refreshList());
  }

  removeInasistencia(estudiante: any) {
    if (estudiante.inasistencias?.length > 0) {
      const idAEliminar = estudiante.inasistencias[estudiante.inasistencias.length - 1].idInasistencia;
      this.inasistenciaService.quitar(idAEliminar).subscribe(() => this.refreshList());
    }
  }

  editarEstudiante(estudiante:any){
    this.store.selectEstudiante(estudiante);
  }

  deleteEstudiante(id:number){
    if(confirm('¿Estás seguro de eliminar este estudiante?')){
      this.store.deleteEstudiante(id);
    }
  }
}