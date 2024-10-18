import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/UsuarioModel';
import { AuthService } from '../../services/credenciales.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], // Asegúrate de importar FormsModule
  templateUrl: './usuario-registro.component.html',
  styleUrl: 'usuario-registro.component.css'// Cambia 'styleUrl' por 'styleUrls'
})
export class RegistroComponent implements OnInit {

  usuario!: UsuarioModel;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  onSubmit(form: NgForm) {
    if (form.invalid) { return; }
    console.log(form.value);


    this.auth.nuevoUsuario(this.usuario).subscribe(
      (resp: any) => {
        console.log('Registro exitoso:', resp);
        Swal.fire({
          title: 'Éxito',
          text: 'Registro exitoso',
          icon: 'success',
          timer: 4000, 
          timerProgressBar: true, 
          willClose: () => {
            
            this.router.navigateByUrl('/home');
          }
        });
       
      },
      (error: any) => {
        console.error('Error al registrar:', error);
        Swal.fire('Error', 'Error de registro, Usuario existente', 'error', )
      }
    );

    
  }
}
