import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AutoresModel } from '../models/autorModel';



@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

   private url = 'https://localhost:44307'

   

  constructor( private http:HttpClient) { }

  listAutores(){
    return this.http.get('https://www.googleapis.com/books/v1/volumes?q=books&maxResults=15')
  }


  autoresget(){

    return  this.http.get(`${this.url}/api/autores4`)
    
  }

  getAutor(id: number): Observable<AutoresModel> {
    return this.http.get<AutoresModel>(`${this.url}/api/autores4/${id}`);
  }

  agregarAutor(autor : string){
    return this.http.post(`${this.url}/api/autores4`,autor) 
                    .pipe(catchError(this.errorHandler))
  }

  actualizarAutor(autor: AutoresModel, id: number) {
    const url = `${this.url}/api/autores4/${id}`;
    return this.http.put(url, autor);
  }

  eliminarAutor(id :number){
    return this.http.delete(`${this.url}/api/autores4/${id}`);
  }

  errorHandler(error: HttpErrorResponse) {
    console.error(`Error ${error.status} - ${error.error.title}`);
    console.error(`Detalle del error:`);
    Object.keys(error.error.errors).forEach(key => {
      console.error(`  ${key}: ${error.error.errors[key][0]}`);
    });
    return throwError(error);
  }
  


}
