import { Component, inject } from '@angular/core';
import { RouterLink, Router } from "@angular/router";
import { UsuarioStore } from '../../services/usuario-store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-component',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './landing-component.html',
  styleUrl: './landing-component.css',
})
export class LandingComponent {

  readonly usuarioStore = inject(UsuarioStore);
  private router = inject(Router);

  logout(): void {

    this.usuarioStore.logout();
    this.router.navigate(['/']);

  }

}
