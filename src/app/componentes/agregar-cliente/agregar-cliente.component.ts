import { Component } from '@angular/core';
import { GetClienteServicio } from '../../servicios/api/getClientes.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule


@Component({
  selector: 'app-agregar-cliente',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css']
})
export class AgregarClienteComponent {
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

  agregarCliente() {
    this.clientesService.agregarCliente(this.cliente).subscribe(
      respuesta => {
        // Verifica si la respuesta contiene el campo idPersona
        if (respuesta.idPersona) {
          this.mensajeRespuesta = `Cliente agregado exitosamente. ID: ${respuesta.idPersona}`;
        } else if (respuesta.respuesta) {
          this.mensajeRespuesta = respuesta.respuesta;
        }
      },
      error => {
        this.mensajeRespuesta = 'Error al agregar el cliente. Intente nuevamente.';
        console.error('Error al agregar cliente:', error);
      }
    );
  }
}
