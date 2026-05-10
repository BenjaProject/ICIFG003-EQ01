import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CursoFormComponent } from '../components/curso-form.component/curso-form.component';
import { CursoListComponent } from '../components/curso-list.component/curso-list.component';
import { UsuarioStore } from '@features/users/services/usuario-store';

@Component({
  selector: 'app-curso-page',
  standalone: true,
  imports: [CursoFormComponent, CursoListComponent, RouterLink],
  templateUrl: './curso-page.component.html',
  styleUrl: './curso-page.component.css',
})
export class CursoPageComponent {
  readonly usuarioStore = inject(UsuarioStore);
  private readonly router = inject(Router);

  logout(): void {
    this.usuarioStore.logout();
    this.router.navigate(['/login']);
  }
}
