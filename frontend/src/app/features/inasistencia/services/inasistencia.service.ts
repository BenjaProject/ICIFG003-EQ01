import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environmentInasistencias } from "@environments/environment";

@Injectable({ providedIn: 'root' })
export class InasistenciaService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8080/api/v1/entities/inasistencias'

    agregar(estudianteID: number) {
        return this.http.post(`${environmentInasistencias.apiUrl}/${estudianteID}`, {
            fecha: new Date().toISOString().split('T')[0],
            justificada: false
        });
    }

    quitar(id: number) {
        return this.http.delete(`${environmentInasistencias.apiUrl}/${id}`);
    }

}
