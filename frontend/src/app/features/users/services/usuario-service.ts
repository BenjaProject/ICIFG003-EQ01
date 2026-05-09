import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment2 } from '../../../../../environments/environment'
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario';
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private http = inject(HttpClient);
  private apiUrl = `${environment2.apiUrl}`;

  getAll(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  create(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  update(id: number, usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  loadUser(username: string, password: string): Observable<boolean>{
    return this.http.post<boolean>(`${this.apiUrl}/login`, { username, password });
  }
}
