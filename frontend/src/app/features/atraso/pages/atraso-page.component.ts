import { Component, inject, signal, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
export class AtrasoPageComponent implements OnInit {
  readonly usuarioStore = inject(UsuarioStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  cursoId = signal<number | null>(null);

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const cursoIdParam = params.get('cursoId');
      this.cursoId.set(cursoIdParam ? Number(cursoIdParam) : null);
    });
  }

  logout(): void {
    this.usuarioStore.logout();
    this.router.navigate(['/login']);
  }
}
