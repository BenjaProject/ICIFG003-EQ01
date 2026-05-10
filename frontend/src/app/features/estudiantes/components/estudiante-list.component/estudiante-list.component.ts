import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EstudianteStore } from '@features/estudiantes/services/estudiante.store';

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

  ngOnInit(){
    this.route.queryParamMap.subscribe(params => {
      const cursoIdParam = params.get('cursoId');
      const cursoId = cursoIdParam ? Number(cursoIdParam) : null;
      if (cursoId && !Number.isNaN(cursoId)) {
        this.store.loadEstudiantesByCurso(cursoId);
      } else {
        this.store.loadEstudiantes();
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

}
