import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpServiceService } from '../../services/http-service.service';
import Swal from 'sweetalert2';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-nuevo-autor',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NavbarComponent],
  templateUrl: './nuevo-autor.component.html',
  styleUrl: './nuevo-autor.component.css'
})
export class NuevoAutorComponent {

  autorForma! : FormGroup
  errorMseage: string= ''

  constructor( private fb : FormBuilder, private http : HttpServiceService){

    this.crearForm();

  }

  

  crearForm(){
    this. autorForma = this.fb.group({
      nombre : ['', Validators.required]
  })}

  guardar() {
    if (this.autorForma.valid) {
      const datoAutor = this.autorForma.value;
      this.http.agregarAutor(datoAutor).subscribe(
        resp => {
          
          Swal.fire({
            title: 'Éxito',
            text: 'El autor se ha creado correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
        },
        error => {
         
          if (error.error.errors) {
            const errorMessages = Object.values(error.error.errors)
              .flat() // Aplanar en caso de que haya arrays anidados
              .join(', '); // Unir los mensajes con una coma u otro separador

              this.errorMseage = errorMessages;

              Swal.fire({
                title: 'Inválido',
                text: this.errorMseage, // Mostrar el mensaje de error procesado
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
          }

         

        }
      );
    }
  }

}
