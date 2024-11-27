import { Component } from '@angular/core';
import { GetClienteServicio } from '../../servicios/api/getClientes.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actualizar-cliente',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './actualizar-cliente.component.html',
  styleUrls: ['./actualizar-cliente.component.css']
})
export class ActualizarClienteComponent {
  cliente = {
    numeroDocumento: '',
    nombresPersona: '',
    apellidosPersona: '',
    fechaNacimientoPersona: '',
    idCargo: null,
    idUbicacion: null,
    idPlan: null,
    celular: '',
    emailPersona: '',
    contraseniaPersona: ''
  };

  mensajeRespuesta: string | null = null;

  constructor(private clientesService: GetClienteServicio) {}

  actualizarCliente() {
    this.clientesService.actualizarCliente(this.cliente).subscribe(
      (respuesta) => {
        if (respuesta.actualizado === 'ok') {
          this.mensajeRespuesta = "Cliente actualizado correctamente.";
        }
      },
      (error) => {
        if (error.error && error.error.respuesta === "Compita no existes en nuestra base de datos") {
          this.mensajeRespuesta = "El cliente no existe en la base de datos.";
        } else {
          this.mensajeRespuesta = "Error al actualizar el cliente.";
        }
        console.error('Error al actualizar cliente:', error);
      }
    );
  }
}
