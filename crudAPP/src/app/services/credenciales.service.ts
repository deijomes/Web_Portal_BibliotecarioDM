import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map} from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { UsuarioModel } from '../models/UsuarioModel';
  

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://localhost:44307';
  private token: string = '';

  constructor(private http: HttpClient) {}

  login(usuario: UsuarioModel): Observable<any> {
    
    const authdata = {
      Emmail: usuario.emmail,
      password: usuario.password
    };

    return this.http.post(`${this.url}/api/cuentas/Login`, authdata)
     .pipe(map((response: any) => {
       
        console.log('entro en el rxjs')
        // Guarda el token en el local storage o en un servicio de autenticación
        
        this.guardarToken(response['token'])
        return response;
      }),
      catchError(this.manejarError) 
    );
  }

  nuevoUsuario(usuario : UsuarioModel) {

    const authdata = {
      emmail: usuario.emmail,
      password : usuario.password
      
    }

    return this.http.post(`${this.url}/api/cuentas/registrar`, authdata)
    .pipe(
      map((response:any) => {
        console.log('entro en el rxjs');
        this.guardarToken(response['token'])
        return response;;
      }),
      catchError(this.manejarError) 
    );
  }

  guardarToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  leerToken() {
    this.token = localStorage.getItem('token') || '';
  }

  private manejarError(error: any) {
    let mensajeError = 'Ocurrió un error inesperado.';

   
    if (error.error instanceof ErrorEvent) {
      
      mensajeError = `Error: ${error.error.message}`;
    } else {
     
      mensajeError = `Error código ${error.status}: ${error.message}`;
    }

    return throwError(mensajeError); 
    
  }
}
