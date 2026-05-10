import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environmentCursos } from '@environments/environment';
import { Curso } from '../models/curso';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private http = inject(HttpClient);
  private apiUrl = `${environmentCursos.apiUrl}`;

  getAll(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl);
  }

  create(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.apiUrl, curso);
  }

  update(curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${this.apiUrl}/${curso.idCurso}`, curso);
  }

  delete(id: number): Observable<void> {
    return this.http
      .delete(`${this.apiUrl}/${id}`, { responseType: 'text' })
      .pipe(map(() => void 0));
  }
}
