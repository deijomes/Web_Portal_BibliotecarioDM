import { Routes } from '@angular/router';
import { AutoresComponent } from './components/autores/autores.component';
import { NuevoAutorComponent } from './components/nuevo-autor/nuevo-autor.component';
import { ActualizarAutorComponent } from './components/actualizar-autor/actualizar-autor.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { RegistroComponent } from './components/usuario-registro/usuario-registro.component';
import { UsuarioLoguinComponent } from './components/usuario-loguin/usuario-loguin.component';
import { HomeComponent } from './components/home/home.component';
import { LibrosComponent } from './components/libros/libros.component';

export const routes: Routes = [
    {path: 'principal', component : PrincipalComponent},
    {path: 'autores', component: AutoresComponent },
    {path: 'nuevo', component : NuevoAutorComponent},
    {path: 'actualizar/:id', component: ActualizarAutorComponent},
    {path: 'login', component: UsuarioLoguinComponent},
    {path:'registro',component:RegistroComponent},
    {path:'home', component:HomeComponent},
    {path:'libros', component:LibrosComponent},
    {path: '', redirectTo: '/principal', pathMatch: 'full' }
];
