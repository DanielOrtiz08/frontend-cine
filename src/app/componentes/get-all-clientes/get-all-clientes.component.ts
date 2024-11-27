import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { GetClienteServicio } from '../../servicios/api/getClientes.service';

@Component({
  selector: 'app-get-all-clientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-all-clientes.component.html',
  styleUrl: './get-all-clientes.component.css'
})
export class GetAllClientesComponent implements OnDestroy, OnInit {
  clientes: any [] = [];
  constructor(private clienteServicio: GetClienteServicio){
  }
 
  ngOnInit(): void {
     this.getClientes();
     
  }
 
  ngOnDestroy(): void {
      
  } 
 
  public getClientes(): void {
   this.clienteServicio.getClientes().subscribe((respuesta)=>{
     this.clientes=respuesta;
     console.log(respuesta);
   });
  }
}

