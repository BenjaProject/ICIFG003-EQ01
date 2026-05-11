import { CommonModule } from '@angular/common';
import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsuarioStore } from '@features/users/services/usuario-store';
import { Inasistencia } from '../models/inasistencia';
import { InasistenciaService } from '../services/inasistencia.service';

@Component({
  selector: 'app-inasistencia-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './inasistencia-page.component.html',
  styleUrl: './inasistencia-page.component.css',
})
export class InasistenciaPageComponent implements OnInit {
  readonly usuarioStore = inject(UsuarioStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly inasistenciaService = inject(InasistenciaService);

  inasistencias = signal<Inasistencia[]>([]);
  searchTerm = signal('');
  loading = signal(false);
  error = signal<string | null>(null);
  cursoId = signal<number | null>(null);

  filteredInasistencias = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const data = this.inasistencias();
    if (!term) return data;
    
    return data.filter(item => {
      const nombre = `${item.nombreEstudiante || ''} ${item.apellidoEstudiante || ''}`.toLowerCase();
      return nombre.includes(term);
    });
  });

  cursoNombre = computed(() => {
    const inasistencias = this.inasistencias();
    return inasistencias.length > 0 ? inasistencias[0].nombreCurso : 'Curso';
  });

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const cursoIdParam = params.get('cursoId');
      const parsedId = cursoIdParam ? Number(cursoIdParam) : null;
      this.cursoId.set(parsedId);
      this.loadInasistencias();
    });
  }

  logout(): void {
    this.usuarioStore.logout();
    this.router.navigate(['/login']);
  }

  onSearchChange(value: string): void {
    this.searchTerm.set(value);
  }

  private loadInasistencias(): void {
    this.loading.set(true);
    this.error.set(null);
    const id = this.cursoId();
    
    const request$ = id
      ? this.inasistenciaService.getByCurso(id)
      : this.inasistenciaService.getAll();

    request$.subscribe({
      next: data => {
        this.inasistencias.set(data ?? []);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error al cargar inasistencias');
        this.loading.set(false);
      }
    });
  }
}
