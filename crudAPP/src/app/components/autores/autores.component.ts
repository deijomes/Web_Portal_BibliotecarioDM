import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AutoresModel } from '../../models/autorModel';
import { HttpServiceService } from '../../services/http-service.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-autores',
  standalone: true,
  imports: [CommonModule, RouterLink,NavbarComponent],
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css'] 
})
export class AutoresComponent implements OnInit {

  autores: AutoresModel[] = [];
  
  constructor(private http: HttpServiceService, private router :Router ) 
    {
       this.listAutores();
       
    }

  ngOnInit(): void {
  
     
    
  }

  listAutores() {
    this.http.autoresget().subscribe((res: any) => {
      this.autores = res.map((autor: any) => new AutoresModel(autor.id, autor.nombre));
      console.log(this.autores);
    });
  }

  actualizarAut(id:number){

    this.router.navigate(['actualizar/',id])
    
  }

  elimnarAutor(autor:AutoresModel, i : number){
   
    Swal.fire({
      title:'¿Estas seguro?',
      text : `esta seguro de elimar a ${autor.nombre}`,
      icon :'question',
      showConfirmButton:true,
      showCancelButton:true
    }).then (res => {
      if(res.value){

        this.autores.splice(i,1)
        this.http.eliminarAutor(autor.id).subscribe()

      }
    })

   
  }

  
}
