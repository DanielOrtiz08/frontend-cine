import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartelerasService } from '../../servicios/api/carteleras.service';

@Component({
  selector: 'app-carteleras',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carteleras.component.html',
  styleUrls: ['./carteleras.component.css'],
})
export class CartelerasComponent implements OnInit, OnDestroy {
  carteleras: any[] = [];
  newCartelera = {
    idPelicula: '',
    idCine: '',
    fechaInicioCartelera: '',
    fechaFinalCartelera: '',
  };

  // Para mantener la cartelera seleccionada para edición
  carteleraEditada: any = {
    idPelicula: '',
    idCine: '',
    fechaInicioCartelera: '',
    fechaFinalCartelera: '',
  };

  constructor(private cartelerasService: CartelerasService) {}

  ngOnInit(): void {
    this.getAllCarteleras();
  }

  ngOnDestroy(): void {}

  public getAllCarteleras(): void {
    this.cartelerasService.getCarteleras().subscribe({
      next: (respuesta) => {
        this.carteleras = respuesta;
        console.log('Carteleras obtenidas:', respuesta);
      },
      error: (error) => {
        console.error('Error al obtener las carteleras:', error);
        alert('Hubo un problema al cargar las carteleras.');
      },
    });
  }

  public createCartelera(): void {
    const { idPelicula, idCine, fechaInicioCartelera, fechaFinalCartelera } = this.newCartelera;

    if (!idPelicula || !idCine || !fechaInicioCartelera || !fechaFinalCartelera) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }

    this.cartelerasService.createCartelera(this.newCartelera).subscribe({
      next: () => {
        this.getAllCarteleras();
        this.limpiarCampos();
        alert('Cartelera creada exitosamente.');
      },
      error: (error) => {
        console.error('Error al crear la cartelera:', error);
        alert('Hubo un problema al crear la cartelera.');
      },
    });
  }

  public updateCartelera(): void {
    const { idPelicula, idCine, fechaInicioCartelera, fechaFinalCartelera } = this.carteleraEditada;

    if (!idPelicula || !idCine || !fechaInicioCartelera || !fechaFinalCartelera) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }

    this.cartelerasService.updateCartelera(this.carteleraEditada.idCartelera, this.carteleraEditada).subscribe({
      next: () => {
        this.getAllCarteleras();
        alert('Cartelera actualizada exitosamente.');
      },
      error: (error) => {
        console.error('Error al actualizar la cartelera:', error);
        alert('Hubo un problema al actualizar la cartelera.');
      },
    });
  }

  public deleteCartelera(cartelera: any): void {
    if (confirm(`¿Estás seguro de que deseas eliminar la cartelera de la película ${cartelera.idPelicula}?`)) {
      this.cartelerasService.deleteCartelera(cartelera.idPelicula,cartelera.
        idCine).subscribe({
        next: () => {
          this.getAllCarteleras();
          alert('Cartelera eliminada exitosamente.');
        },
        error: (error) => {
          console.error('Error al eliminar la cartelera:', error);
          alert('Hubo un problema al eliminar la cartelera.');
        },
      });
    }
  }

  private limpiarCampos(): void {
    this.newCartelera = {
      idPelicula: '',
      idCine: '',
      fechaInicioCartelera: '',
      fechaFinalCartelera: '',
    };
  }

  public openEdit(cartelera: any): void {
    // Se guarda la cartelera seleccionada para editar
    this.carteleraEditada = { ...cartelera };
  }

  public cancelarEdicion(): void {
    this.carteleraEditada = {
      idPelicula: '',
      idCine: '',
      fechaInicioCartelera: '',
      fechaFinalCartelera: '',
    };
  }
}


