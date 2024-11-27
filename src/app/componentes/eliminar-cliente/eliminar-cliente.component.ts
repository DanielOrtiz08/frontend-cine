import { Component } from '@angular/core';
import { GetClienteServicio } from '../../servicios/api/getClientes.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule

@Component({
  selector: 'app-eliminar-cliente',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './eliminar-cliente.component.html',
  styleUrls: ['./eliminar-cliente.component.css']
})
export class EliminarClienteComponent {
  numeroDocumento: string = ''; // Para capturar el número de documento
  mensajeRespuesta: string = ''; // Mensaje de respuesta

  constructor(private clientesService: GetClienteServicio) {}

  eliminarCliente() {
    // Llamar al servicio para eliminar el cliente
    this.clientesService.eliminarCliente(this.numeroDocumento).subscribe(
      (respuesta: any) => {
        if (respuesta.info === 1) {
          // Si info es 1, mostrar el mensaje de respuesta
          this.mensajeRespuesta = respuesta.respuesta;
        } else if (respuesta.info === 0) {
          // Si info es 0, mostrar que el cliente ya no existe
          this.mensajeRespuesta = 'Ya no existe en nuestra base de datos';
        }
      },
      error => {
        // Manejar el error, si ocurre
        this.mensajeRespuesta = 'Hubo un error al intentar eliminar el cliente.';
      }
    );
  }
}
