import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpServiceService } from '../../services/http-service.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink,RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  implements OnInit, OnDestroy {

 librodb : any [] = []

 currentIndex = 0; // Índice del slide actual
  intervalId: any; // Para almacenar el ID del intervalo

 menuAbierto: boolean = false;

 constructor(private http: HttpServiceService){


 }
  

 ngOnInit() {
  this.getLibros(); // Obtiene los libros al iniciar el componente
  this.startSlider(); // Inicia el slider al cargar el componente
  }

  ngOnDestroy() {
    this.stopSlider(); // Detiene el slider al destruir el componente
  }
  

 getLibros() {
  this.http.listAutores().subscribe(
    (response: any) => {
      this.librodb = response.items.map((item: any) => {
        return {
          titulo: item.volumeInfo.title,
          descripcion: item.volumeInfo.description,
          imagen: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'No hay imagen',
          publicacion : item.volumeInfo.publishedDate,
        };
      });
      
      
      console.log(this.librodb); // Verifica si los datos están bien asignados
            
    },
    (error) => {
      console.error('Error al obtener los libros:', error);
    }
  );
}





toggleMenu() {
  this.menuAbierto = !this.menuAbierto; 
}

startSlider() {
  if (!this.intervalId) { // Solo inicia si no hay un intervalo ya en marcha
    this.intervalId = setInterval(() => {
      if (this.librodb.length > 0) { 
        this.currentIndex = (this.currentIndex + 1) % this.librodb.length; // Cambia al siguiente slide
      }
    }, 5000); // Cambia cada 2 segundos
  }
}

stopSlider() {
  if (this.intervalId) {
    clearInterval(this.intervalId); // Limpia el intervalo
  }
}

getSliderTransform() {
  return `translateX(-${this.currentIndex * 100}%)`; // Desplaza el slider
}

}


