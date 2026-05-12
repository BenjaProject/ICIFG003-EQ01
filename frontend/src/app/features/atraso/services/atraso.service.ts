import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environmentAtrasos } from "@environments/environment";
import { Observable } from "rxjs";
import { Atraso } from "../models/atraso";

@Injectable({ providedIn: 'root' })
export class AtrasoService {
    private http = inject(HttpClient);
    private apiUrl = environmentAtrasos.apiUrl;

    getAll(): Observable<Atraso[]> {
        return this.http.get<Atraso[]>(this.apiUrl);
    }

    getByEstudiante(estudianteId: number): Observable<Atraso[]> {
        return this.http.get<Atraso[]>(`${this.apiUrl}/estudiante/${estudianteId}`);
    }

    create(estudianteId: number, atraso: Partial<Atraso>): Observable<Atraso> {
        return this.http.post<Atraso>(`${this.apiUrl}/${estudianteId}`, atraso);
    }

    update(id: number, atraso: Partial<Atraso>): Observable<Atraso> {
        return this.http.put<Atraso>(`${this.apiUrl}/${id}`, atraso);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
