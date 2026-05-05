import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, effect } from '@angular/core'; // Añadimos effect
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Añadimos el Router
import { UsuarioStore } from '../../services/users/usuario-store';

@Component({
  selector: 'app-login-component',
  standalone: true, // Asegúrate de que esto esté si usas Angular moderno
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router); // 1. Inyectamos el servicio de navegación
  readonly usuarioStore = inject(UsuarioStore);

  constructor() {
    // 2. Creamos un "vigilante" (effect)
    // Este código se ejecuta automáticamente cada vez que isValid cambie
    effect(() => {
      if (this.usuarioStore.isValid()) {
        console.log('¡Éxito! Redireccionando...');
        this.router.navigate(['/dashboard']); // 3. ¡La magia de la redirección!
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
    this.usuarioStore.loadUser(username, password);
  }
}