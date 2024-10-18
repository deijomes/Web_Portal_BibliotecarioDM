import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HttpServiceService } from '../../services/http-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-libros',
  standalone: true,
  imports: [LibrosComponent, NavbarComponent, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './libros.component.html',
  styleUrl: './libros.component.css'
})
export class LibrosComponent {

  librod : any [] = []
  constructor(private http: HttpServiceService){

   this.getLibros();


  }


  getLibros() {
    this.http.listAutores().subscribe(
      (response: any) => {
        this.librod = response.items.map((item: any) => {
          return {
            titulo: item.volumeInfo.title,
            descripcion: item.volumeInfo.description,
            imagen: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'No hay imagen',
            publicacion : item.volumeInfo.publishedDate,
          };
        });
        
        
        console.log(this.librod); // Verifica si los datos están bien asignados
              
      },
      (error) => {
        console.error('Error al obtener los libros:', error);
      }
    );

}
}