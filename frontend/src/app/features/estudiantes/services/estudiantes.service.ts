import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environmentEstudiantes } from '@environments/environment';
import { Estudiante } from '../models/estudiante';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EstudiantesService {
  private http = inject(HttpClient);
  private apiUrl = `${environmentEstudiantes.apiUrl}`;

  getAll(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.apiUrl);
  }

  getByCurso(cursoId: number): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(`${this.apiUrl}/curso/${cursoId}`);
  }

  create(estudiante: Estudiante): Observable<Estudiante> {
    return this.http.post<Estudiante>(this.apiUrl, estudiante);
  }

  update(estudiante: Estudiante): Observable<Estudiante>{
    return this.http.put<Estudiante>(`${this.apiUrl}/${estudiante.idEstudiante}`, estudiante);

  }

  delete(id:number): Observable<void> {
    return this.http
      .delete(`${this.apiUrl}/${id}`, { responseType: 'text' })
      .pipe(map(() => void 0));
  }
}
