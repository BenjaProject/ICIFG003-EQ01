import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environmentInasistencias } from "@environments/environment";
import { Inasistencia } from "../models/inasistencia";

@Injectable({ providedIn: 'root' })
export class InasistenciaService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8080/api/v1/entities/inasistencias'

    getAll() {
        return this.http.get<Inasistencia[]>(this.apiUrl);
    }

    getByCurso(cursoId: number) {
        return this.http.get<Inasistencia[]>(`${this.apiUrl}/curso/${cursoId}`);
    }

    agregar(estudianteID: number, fecha?: string) {
        return this.http.post(`${environmentInasistencias.apiUrl}/${estudianteID}`, {
            fecha: fecha ?? new Date().toISOString().split('T')[0],
            justificada: false
        });
    }

    quitar(id: number) {
        return this.http.delete(`${environmentInasistencias.apiUrl}/${id}`);
    }

}
