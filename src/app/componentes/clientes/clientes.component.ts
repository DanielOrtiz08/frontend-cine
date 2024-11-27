import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { GetClienteServicio } from '../../servicios/api/getClientes.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnDestroy, OnInit {
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
