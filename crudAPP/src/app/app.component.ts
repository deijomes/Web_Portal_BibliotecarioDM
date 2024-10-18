import { Component } from '@angular/core';
import {   RouterOutlet } from '@angular/router';
import { NuevoAutorComponent } from './components/nuevo-autor/nuevo-autor.component';
import { AutoresComponent } from './components/autores/autores.component';
import { ActualizarAutorComponent } from './components/actualizar-autor/actualizar-autor.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistroComponent } from './components/usuario-registro/usuario-registro.component';
import { UsuarioLoguinComponent } from './components/usuario-loguin/usuario-loguin.component';
import { HomeComponent } from './components/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  NuevoAutorComponent,AutoresComponent, ActualizarAutorComponent, PrincipalComponent, 
            NavbarComponent,UsuarioLoguinComponent,  RegistroComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: '../styles.css' 
})
export class AppComponent {
  title = 'crudAPP';
}
