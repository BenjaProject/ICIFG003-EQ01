import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { UsuarioStore } from '../../services/users/usuario-store';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-login-component',
  standalone: true, // Asegúrate de que esto esté si usas Angular moderno
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  readonly usuarioStore = inject(UsuarioStore);
  readonly isRegister = signal(false);
  readonly authError = signal<string | null>(null);

  constructor() {
    this.updateMode(this.router.url);
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.updateMode(event.urlAfterRedirects));

    this.route.queryParamMap.subscribe((params) => {
      const hasAuthError = params.get('error') === 'auth';
      this.authError.set(hasAuthError ? 'Debes iniciar sesion para acceder al dashboard.' : null);
    });

    effect(() => {
      if (!this.isRegister() && this.usuarioStore.isValid()) {
        console.log('¡Éxito! Redireccionando...');
        this.router.navigate(['/dashboard']);
      }
    });

    effect(() => {
      if (this.isRegister() && this.usuarioStore.createSuccess()) {
        this.usuarioStore.resetCreateSuccess();
        this.router.navigate(['/login']);
      }
    });
  }

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { username, password } = this.form.getRawValue();
    if (this.isRegister()) {
      this.usuarioStore.create({ id: 0, username, password });
      return;
    }
    this.usuarioStore.loadUser(username, password);
  }

  private updateMode(url: string): void {
    this.isRegister.set(url.includes('/registro'));
    if (this.isRegister()) {
      this.authError.set(null);
    }
  }
}