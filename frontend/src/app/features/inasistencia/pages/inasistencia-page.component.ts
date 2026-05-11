import { CommonModule } from '@angular/common';
import { Component, inject, ChangeDetectorRef } from '@angular/core';
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
export class InasistenciaPageComponent {
  readonly usuarioStore = inject(UsuarioStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly inasistenciaService = inject(InasistenciaService);
  private readonly cdr = inject(ChangeDetectorRef);

  inasistencias: Inasistencia[] = [];
  filteredInasistencias: Inasistencia[] = [];
  searchTerm = '';
  loading = false;
  error: string | null = null;
  cursoId: number | null = null;

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const cursoIdParam = params.get('cursoId');
      this.cursoId = cursoIdParam ? Number(cursoIdParam) : null;
      this.loadInasistencias();
    });
  }

  logout(): void {
    this.usuarioStore.logout();
    this.router.navigate(['/login']);
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  private loadInasistencias(): void {
    this.loading = true;
    this.error = null;
    const request$ = this.cursoId
      ? this.inasistenciaService.getByCurso(this.cursoId)
      : this.inasistenciaService.getAll();

    request$.subscribe({
      next: data => {
        this.inasistencias = data ?? [];
        this.applyFilters();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Error al cargar inasistencias';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  private applyFilters(): void {
    const term = this.searchTerm.trim().toLowerCase();
    this.filteredInasistencias = this.inasistencias.filter(item => {
      if (!term) {
        return true;
      }
      const nombre = `${item.nombreEstudiante} ${item.apellidoEstudiante}`.toLowerCase();
      return nombre.includes(term);
    });
    this.cdr.detectChanges();
  }
}
