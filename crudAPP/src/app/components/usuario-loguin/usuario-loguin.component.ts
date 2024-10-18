import { Component } from '@angular/core';
import { UsuarioModel } from '../../models/UsuarioModel';
import { AuthService } from '../../services/credenciales.service';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-usuario-loguin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario-loguin.component.html',
  styleUrl: './usuario-loguin.component.css'
})
export class UsuarioLoguinComponent {

  usuario!: UsuarioModel;
  recordarme :boolean = false

  constructor(private auth: AuthService, private router : Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  onSubmit(form: NgForm) {
    if (form.invalid) { return; }
    console.log(form.value);
    

    this.auth.login(this.usuario).subscribe(
      (resp: any) => {
        console.log('Registro exitoso:', resp);
        Swal.fire({
          title: 'Inicio de sesión Exitoso',
          text: 'Has iniciado sesión correctamente',
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
        Swal.fire('Error', 'No se pudo iniciar sesión. Verifica tus credenciales e intenta nuevamente', 'error', )
      }
    );

    
  }

}
