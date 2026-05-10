import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 0) {
                alert('El servidor no está disponible.');
            } else if (error.error && error.error.mensaje) {
                alert(error.error.mensaje);
            }

            // Re-lanza el error para que cada store/service lo procese y
            // muestre el feedback adecuado en el componente correspondiente
            console.error(`[HTTP Error] ${error.status}`, error.error);
            return throwError(() => error);
        })
    );
};