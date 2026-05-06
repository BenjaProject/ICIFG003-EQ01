import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioStore } from '../../services/users/usuario-store';

@Component({
  selector: 'app-dashboard-component',
  imports: [],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css',
})
export class DashboardComponent {
  readonly usuarioStore = inject(UsuarioStore);
  private readonly router = inject(Router);

  logout(): void {
    this.usuarioStore.logout();
    this.router.navigate(['/login']);
  }
}
