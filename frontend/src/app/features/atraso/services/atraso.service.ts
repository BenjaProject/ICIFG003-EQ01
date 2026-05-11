import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environmentAtrasos } from "@environments/environment";

@Injectable({ providedIn: 'root' })
export class AtrasoService {
    private http = inject(HttpClient)
    private apiUrl = 'http://localhost:8080/api/v1/entities/atrasos';

    agregar(estudianteID: number) {
        return this.http.post(`${environmentAtrasos.apiUrl}/${estudianteID}`, {
            fecha: new Date().toISOString().split('T')[0],
            hora: new Date().toTimeString().split(' ')[0].substring(0, 5), 
            razon: "Registro manual"
        });
    }

    quitar(id: number) {
        return this.http.delete(`${environmentAtrasos.apiUrl}/${id}`);
    }

}
