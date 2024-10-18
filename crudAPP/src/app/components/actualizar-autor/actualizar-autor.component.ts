import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpServiceService } from '../../services/http-service.service';
import { AutoresModel } from '../../models/autorModel';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-autor',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NavbarComponent],
  templateUrl: './actualizar-autor.component.html',
  styleUrl: './actualizar-autor.component.css'
})

export class ActualizarAutorComponent implements OnInit, OnDestroy {
  autorForm!: FormGroup;
  id: number | undefined;
  private paramsSubscription: Subscription | undefined;

  constructor(
    private fb: FormBuilder,
    private activeRou: ActivatedRoute,
    private http: HttpServiceService,
    private router: Router
  ) {
    // Inicialización del formulario
    this.autorForm = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.paramsSubscription = this.activeRou.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.http.getAutor(this.id).subscribe(
          autor => {
            this.autorForm.patchValue(autor);
          },
          error => {
            console.error('Error al obtener el autor:', error);
          }
        );
      }
    });
  }

  onSubmit(): void {
    if (this.autorForm.valid && this.id !== undefined) {
      const updatedAutor: AutoresModel = {
        id: this.id,
        nombre: this.autorForm.value.nombre
      };

      this.http.actualizarAutor(updatedAutor, this.id).subscribe(
        response => {

          Swal.fire({
            title: 'Actualización exitosa',
            text: 'El autor ha sido actualizado',
            icon: 'success',
            willClose: () => {
              this.router.navigate(['/autores']);
            }
          });
          
          
        },
        error => {
          console.error('Error al actualizar el autor:', error);
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
  }
}