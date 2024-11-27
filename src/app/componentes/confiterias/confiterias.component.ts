import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfiteriasService } from '../../servicios/api/confiteria.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-confiterias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './confiterias.component.html',
  styleUrls: ['./confiterias.component.css']
})
export class ConfiteriasComponent implements OnInit, OnDestroy {
  confiterias: any[] = [];
  page: number = 1; 
  pageSize: number = 10; 

  idProducto: string = '';
  idCine: string = '';
  precioProductoCine: number = 0;

  mostrarIdProducto: boolean = false;

  constructor(private confiteriasService: ConfiteriasService) {}

  ngOnInit(): void {
    this.getAllConfiterias();
  }

  ngOnDestroy(): void {}

  public getAllConfiterias(): void {
    this.confiteriasService.getAllConfiterias().subscribe((respuesta) => {
      this.confiterias = respuesta;
      console.log(respuesta);
    });
  }

  public addProduct(): void {
    if (!this.idProducto || !this.idCine || this.precioProductoCine <= 0) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }
  
    const nuevoProducto = {
      idProducto: this.idProducto,
      idCine: this.idCine,
      precioProductoCine: this.precioProductoCine
    };
  
    this.confiteriasService.addConfiteriaProduct(nuevoProducto).subscribe({
      next: () => {
        this.getAllConfiterias();
        this.limpiarCampos();
      },
      error: (error) => {
        const mensajeError = error.error.respuesta || 'Hubo un error al intentar agregar el producto.';
        console.error('No se pudo agregar el producto:', error);
        alert(mensajeError);
      }
    });
  }
  

  public deleteProduct(): void {
    if (!this.idProducto || !this.idCine) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }
  
    this.confiteriasService.deleteConfiteriaProduct(this.idProducto, this.idCine).subscribe({
      next: () => {
        this.getAllConfiterias();
        this.limpiarCampos();
      },
      error: (error) => {
        const mensajeError = error.error.respuesta || 'Hubo un error al intentar eliminar el producto.';
        console.error('No se pudo eliminar el producto:', error);
        alert(mensajeError);
      }
    });
  }
  

  public updateProduct(): void {
    if (!this.idProducto || !this.idCine || this.precioProductoCine <= 0) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }
  
    const productoActualizado = {
      idProducto: this.idProducto,
      idCine: this.idCine,
      precioProductoCine: this.precioProductoCine
    };
  
    this.confiteriasService.updateConfiteriaProduct(productoActualizado).subscribe({
      next: () => {
        this.getAllConfiterias();
        this.limpiarCampos();
      },
      error: (error) => {
        const mensajeError = error.error.respuesta || 'Hubo un error al intentar actualizar el producto.';
        console.error('No se pudo actualizar el producto:', error);
        alert(mensajeError);
      }
    });
  }
  

  private limpiarCampos(): void {
    this.idProducto = '';
    this.idCine = '';
    this.precioProductoCine = 0;
  }

}
