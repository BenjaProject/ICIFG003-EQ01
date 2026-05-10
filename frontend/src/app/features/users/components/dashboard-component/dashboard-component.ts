import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsuarioStore } from '../../services/usuario-store';

@Component({
  selector: 'app-dashboard-component',
  standalone: true,
  imports: [RouterLink],
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
