import { inject, Injectable, signal } from "@angular/core";
import { UsuarioService } from "./usuario-service";
import { Usuario } from "../../models/Usuario";

@Injectable({
  providedIn: 'root',
})
export class UsuarioStore{
    private service = inject(UsuarioService);
  readonly isValid = signal<boolean | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly username = signal<string | null>(null);
  readonly createSuccess = signal(false);
  private readonly canUseStorage = typeof window !== 'undefined' && !!window.localStorage;

  constructor() {
    if (this.canUseStorage) {
      const storedUsername = window.localStorage.getItem('username');
      if (storedUsername) {
        this.username.set(storedUsername);
        this.isValid.set(true);
      }
    }
  }

  loadUser(username: string, password: string): void {
    this.loading.set(true);
    this.error.set(null);
    this.isValid.set(null);
    this.createSuccess.set(false);

    this.service.loadUser(username, password).subscribe({
      next: (isValid) => {
        this.isValid.set(isValid);
        this.loading.set(false);
        if (isValid) {
          this.setSession(username);
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

  logout(): void {
    this.username.set(null);
    this.isValid.set(null);
    this.error.set(null);
    this.loading.set(false);

    if (this.canUseStorage) {
      window.localStorage.removeItem('username');
    }
  }

  private setSession(username: string): void {
    this.username.set(username);
    if (this.canUseStorage) {
      window.localStorage.setItem('username', username);
    }
  }

  create(usuario:Usuario): void {
    this.loading.set(true);
    this.error.set(null);
    this.createSuccess.set(false);
    this.service.create(usuario).subscribe({
      next: () => {
        this.createSuccess.set(true);
        this.loading.set(false);
      },
      error: (error) => {
        const message = error instanceof Error ? error.message : 'Error al crear usuario';
        this.error.set(message);
        this.createSuccess.set(false);
        this.loading.set(false);
        console.error('Error al crear usuario', error);
      },
    });
  }

  resetCreateSuccess(): void {
    this.createSuccess.set(false);
  }
}