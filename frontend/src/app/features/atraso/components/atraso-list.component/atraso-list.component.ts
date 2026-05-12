import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AtrasoStore } from '@features/atraso/services/atraso.store';
import { Atraso } from '@features/atraso/models/atraso';

@Component({
  selector: 'app-atraso-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './atraso-list.component.html',
  styleUrl: './atraso-list.component.css'
})
export class AtrasoListComponent implements OnInit {
  store = inject(AtrasoStore);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const estudianteIdParam = params.get('estudianteId');
      const cursoIdParam = params.get('cursoId');
      if (estudianteIdParam) {
        this.store.loadAtrasosByEstudiante(Number(estudianteIdParam));
      } else if (cursoIdParam) {
        this.store.loadAtrasosByCurso(Number(cursoIdParam));
      } else {
        this.store.loadAtrasos();
      }
    });
  }

  editarAtraso(atraso: Atraso) {
    this.store.selectAtraso(atraso);
  }

  deleteAtraso(id: number) {
    if (confirm('¿Estás seguro de eliminar este atraso?')) {
      this.store.deleteAtraso(id);
    }
  }
}
