import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReservacionesService } from '../../servicios/api/reservaciones.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservaciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservaciones.component.html',
  styleUrls: ['./reservaciones.component.css'],
})
export class ReservacionesComponent implements OnInit, OnDestroy {
  reservaciones: any[] = [];
  mostrarAgregar: boolean = false;
  mostrarEditar: boolean = false;
  mostrarEliminarPorFuncion = false;
  idFuncionEliminar: number | null = null;
  editarReservacion: any = { precio: '', idPersona: '', idFuncion: '' };
  nuevaReservacion: any = { precio: '', idPersona: '', idFuncion: '' };
  pagina: number = 1;
  limite: number = 10;
  hayMasReservaciones: boolean = true;
  spinner: boolean = false;
  mensaje: string | null = null;

  constructor(private reservacionesService: ReservacionesService) {}

  ngOnInit(): void {
    this.paginateReservaciones();
  }

  ngOnDestroy(): void {}

  public paginateReservaciones(): void {
    const offset = (this.pagina - 1) * this.limite;
    this.reservacionesService
      .paginateReservaciones(this.limite, offset)
      .subscribe({
        next: (response) => {
          this.reservaciones = response; // Asegúrate de que la respuesta sea directamente el array de reservaciones
          console.log('Reservaciones recibidas:', this.reservaciones);

          // Si la cantidad de funciones obtenidas es menor que el límite, desactivamos el botón "Siguiente"
          this.hayMasReservaciones = this.reservaciones.length === this.limite;

          // Si la página actual está vacía después de una eliminación, volvemos a la página anterior
          if (this.reservaciones.length === 0 && this.pagina > 1) {
            this.pagina--;
            this.paginateReservaciones();
          }
        },
        error: (error) => {
          if (error.status === 404) {
            console.warn('No se encontraron reservaciones.');
          } else {
            console.error('Error al paginar las reservaciones: ', error);
          }
        },
      });
  }

  // Métodos para cambiar de página
  public siguientePagina(): void {
    if (this.hayMasReservaciones) {
      this.pagina++;
      this.paginateReservaciones();
    }
  }

  public paginaAnterior(): void {
    if (this.pagina > 1) {
      this.pagina--;
      this.paginateReservaciones();
    }
  }

  public resetFormulario(): void {
    this.nuevaReservacion = { precio: '', idPersona: '', idFuncion: '' };
  }

  public createReservacion(): void {
    if (
      !this.nuevaReservacion.precio ||
      !this.nuevaReservacion.idPersona ||
      !this.nuevaReservacion.idFuncion
    ) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }
    this.reservacionesService
      .createReservacion(this.nuevaReservacion)
      .subscribe({
        next: () => {
          this.paginateReservaciones();
          this.mostrarAgregar = false;
          this.resetFormulario();
        },
        error: (error) => {
          console.error('Error al crear la reservación: ', error);
          alert('Hubo un error al intentar agregar la función.');
        },
      });
  }

  public openEdit(reservacion: any): void {
    this.editarReservacion = { ...reservacion };
    this.mostrarEditar = true;
  }

  public updateReservacion(): void {
    this.resetFormulario();
    // Validar si los campos son válidos
    if (
      !this.editarReservacion.precio ||
      !this.editarReservacion.idPersona ||
      !this.editarReservacion.idFuncion
    ) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }

    this.reservacionesService
      .updateReservacion(this.editarReservacion)
      .subscribe({
        next: () => {
          this.paginateReservaciones();
          this.mostrarEditar = false;
          this.resetFormulario();
        },
        error: (error) => {
          console.error('Error al actualizar la reservación: ', error);
          alert('Hubo un error al intentar actualizar la reservación.'); // Mostrar mensaje de error
        },
      });
  }

  public confirmarEliminar(idPersona: number, idFuncion: number): void {
    if (
      confirm(
        `¿Está seguro de que desea eliminar la reservación con ID Persona: ${idPersona} y ID Función: ${idFuncion}?`
      )
    ) {
      this.deleteReservacion(idPersona, idFuncion);
    }
  }

  public deleteReservacion(idPersona: number, idFuncion: number): void {
    const data = { idPersona, idFuncion };
    this.spinner = true;

    this.reservacionesService.deleteReservacion(data).subscribe({
      next: () => {
        this.spinner = false; // Habilitar el botón nuevamente
        this.mensaje = 'Reservación eliminada con éxito.';
        this.paginateReservaciones();
        setTimeout(() => {
          this.mensaje = null;
        }, 2000);
      },
      error: (error) => {
        this.spinner = false;
        console.error('No se pudo eliminar la reservación: ', error);
        alert(
          'Hubo un error al intentar eliminar la reservación. Por favor, intente nuevamente.'
        );
      },
    });
  }

  public eliminarPorFuncion(): void {
    if (this.idFuncionEliminar === null || isNaN(this.idFuncionEliminar)) {
      alert('Por favor, ingrese un ID de función válido.');
      return;
    }

    this.spinner = true;
    this.reservacionesService
      .deleteReservasByFunction(this.idFuncionEliminar)
      .subscribe({
        next: (response) => {
          this.mensaje = response.mensaje;

          if (response.resultados && response.resultados.length > 0) {
            let resultadosText = 'Resultados procesados:\n';
            response.resultados.forEach((res: any) => {
              resultadosText += `ID Reservación: ${
                res.idReservacion
              }, Referencias: ${JSON.stringify(res)}\n`;
            });
            this.mensaje += `\n\n${resultadosText}`;
          }

          if (response.salidas && response.salidas.length > 0) {
            let salidasText = 'Errores:\n';
            response.salidas.forEach((error: string) => {
              salidasText += `${error}\n`;
            });
            this.mensaje += `\n\n${salidasText}`;
          }
          this.cerrarVentanas();
          this.spinner = false;
        },
        error: (error) => {
          console.error('Error al eliminar reservas por función:', error);
          alert(
            'Hubo un error al intentar eliminar las reservas. Por favor, intente nuevamente.'
          );
        },
      });
  }

  // Método para ocultar las ventanas (cerrar ventanas)
  public cerrarVentanas(): void {
    this.mostrarAgregar = false;
    this.mostrarEditar = false;
    this.mostrarEliminarPorFuncion = false;
  }

  /*
  public getAllReservaciones() {
    this.reservacionesService.getReservaciones().subscribe({
      next: (response) => {
        this.reservaciones = response;
      },
      error: (error) => {
        console.error('Error al obtener reservaciones: ', error);
      },
    });
  }

  public getReservacionById(idReservacion: number) {
    this.reservacionesService.getReservacionById(idReservacion).subscribe({
      next: (response) => {
        console.log('Reservación obtenida:', response);
      },
      error: (error) => {
        console.error('Error al obtener la reservación: ', error);
      },
    });
  }

  public updatePriceByFunction(data: any) {
    this.reservacionesService.updatePriceByFunction(data).subscribe({
      next: (response) => {
        console.log('Precio actualizado por función:', response);
      },
      error: (error) => {
        console.error('Error al actualizar el precio por función: ', error);
      },
    });
  }

  public updatePriceByPerson(data: any) {
    this.reservacionesService.updatePriceByPerson(data).subscribe({
      next: (response) => {
        console.log('Precio actualizado por persona:', response);
      },
      error: (error) => {
        console.error('Error al actualizar el precio por persona: ', error);
      },
    });
  }

  public countReservasByFunction(idFuncion: number) {
    this.reservacionesService.countReservasByFunction(idFuncion).subscribe({
      next: (response) => {
        console.log('Número de reservas para la función:', response);
      },
      error: (error) => {
        console.error('Error al contar las reservas por función: ', error);
      },
    });
  }

  public getSeatsByReservacion(idReservacion: number) {
    this.reservacionesService.getSeatsByReservacion(idReservacion).subscribe({
      next: (response) => {
        console.log('Asientos de la reservación:', response);
      },
      error: (error) => {
        console.error('Error al obtener asientos de la reservación: ', error);
      },
    });
  }

  public addSeatsToReservacion(data: any) {
    this.reservacionesService.addSeatsToReservacion(data).subscribe({
      next: (response) => {
        console.log('Asientos agregados a la reservación:', response);
      },
      error: (error) => {
        console.error('Error al agregar asientos a la reservación: ', error);
      },
    });
  }

  public deleteSeatFromReservacion(idReservacion: number, idSilla: number) {
    this.reservacionesService
      .deleteSeatFromReservacion(idReservacion, idSilla)
      .subscribe({
        next: () => {
          console.log('Asiento eliminado de la reservación');
        },
        error: (error) => {
          console.error('Error al eliminar asiento de la reservación: ', error);
        },
      });
  }

  public addProductToReservacion(data: any) {
    this.reservacionesService.addProductToReservacion(data).subscribe({
      next: (response) => {
        console.log('Producto agregado a la reservación:', response);
      },
      error: (error) => {
        console.error('Error al agregar producto a la reservación: ', error);
      },
    });
  }

  public getProductsByReservacion(idReservacion: number) {
    this.reservacionesService
      .getProductsByReservacion(idReservacion)
      .subscribe({
        next: (response) => {
          console.log('Productos de la reservación:', response);
        },
        error: (error) => {
          console.error(
            'Error al obtener productos de la reservación: ',
            error
          );
        },
      });
  }
  */
}
