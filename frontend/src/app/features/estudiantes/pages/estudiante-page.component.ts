import { Component, inject } from "@angular/core";
import { Router, RouterLink } from '@angular/router';
import { EstudianteFormComponent } from "../components/estudiante-form.component/estudiante-form.component";
import { EstudianteListComponent } from "../components/estudiante-list.component/estudiante-list.component";
import { UsuarioStore } from '@features/users/services/usuario-store';

@Component({
selector: 'app-estudiante-page',
standalone: true,
imports: [EstudianteListComponent, EstudianteFormComponent, RouterLink],
templateUrl: './estudiante-page.component.html',
styleUrl: './estudiante-page.component.css',
})
export class EstudiantePageComponent {
	readonly usuarioStore = inject(UsuarioStore);
	private readonly router = inject(Router);

	logout(): void {
		this.usuarioStore.logout();
		this.router.navigate(['/login']);
	}
}