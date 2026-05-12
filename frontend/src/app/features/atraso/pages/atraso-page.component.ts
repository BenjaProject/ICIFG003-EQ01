import { Component, inject } from "@angular/core";
import { Router, RouterLink } from '@angular/router';
import { UsuarioStore } from '@features/users/services/usuario-store';
import { AtrasoFormComponent } from "../components/atraso-form.component/atraso-form.component";
import { AtrasoListComponent } from "../components/atraso-list.component/atraso-list.component";

@Component({
  selector: 'app-atraso-page',
  standalone: true,
  imports: [AtrasoListComponent, AtrasoFormComponent, RouterLink],
  templateUrl: './atraso-page.component.html',
  styleUrl: './atraso-page.component.css',
})
export class AtrasoPageComponent {
  readonly usuarioStore = inject(UsuarioStore);
  private readonly router = inject(Router);

  logout(): void {
    this.usuarioStore.logout();
    this.router.navigate(['/login']);
  }
}
