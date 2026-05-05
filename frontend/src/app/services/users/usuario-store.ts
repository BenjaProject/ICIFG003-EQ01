import { inject, Injectable, signal } from "@angular/core";
import { UsuarioService } from "./usuario-service";

@Injectable({
  providedIn: 'root',
})
export class UsuarioStore{
    private service = inject(UsuarioService);
  readonly isValid = signal<boolean | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  loadUser(username: string, password: string): void {
    this.loading.set(true);
    this.error.set(null);
    this.isValid.set(null);

    this.service.loadUser(username, password).subscribe({
      next: (isValid) => {
        this.isValid.set(isValid);
        this.loading.set(false);
        if (isValid) {
          console.log('Usuario valido');
        } else {
          console.log('Usuario invalido');
        }
      },
      error: (error) => {
        const message = error instanceof Error ? error.message : 'Error al validar usuario';
        this.error.set(message);
        this.loading.set(false);
        console.error('Error al validar usuario', error);
      },
    });
  }
}