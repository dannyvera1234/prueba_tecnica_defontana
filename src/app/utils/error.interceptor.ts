import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ocurrió un error desconocido';

      if (error.error instanceof ErrorEvent) {
        // Error del lado del cliente (por ejemplo: red sin conexión)
        errorMessage = `Error del cliente: ${error.error.message}`;
      } else {
        // Error devuelto por el servidor
        errorMessage = `Error del servidor: Código ${error.status} - ${error.message}`;
      }

      console.error(errorMessage);

      // Retornar el error para que quien consuma la API pueda manejarlo si quiere
      return throwError(() => error);
    })
  );
};
