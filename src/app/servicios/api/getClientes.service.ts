import { Injectable } from "@angular/core";
import { API_ADD_CLIENTE, API_DELETE_CIENTE, API_GET_CLIENTE, API_UPDATE_CIENTE } from "../../utils/domains/URIp";
import { HttpClient } from "@angular/common/http";
import {  Observable } from "rxjs";

// Define la interfaz para manejar ambas respuestas
interface RespuestaAgregarCliente {
  idPersona?: number;
  respuesta?: string;
}
interface RespuestaActualizarCliente {
  actualizado?: string;
  respuesta?: string;
}

@Injectable({
  providedIn: 'root'
})
export class GetClienteServicio {
  public urlCliente: string = API_GET_CLIENTE;

  constructor(private http: HttpClient) {}

  // Método para obtener los clientes
  public getClientes(): Observable<any> {
    return this.http.get<any>(this.urlCliente);
  }

  // URL para agregar un cliente
  public urlAddCliente: string = API_ADD_CLIENTE;

  // Cambia el tipo de retorno para manejar las respuestas flexibles
  agregarCliente(cliente: any): Observable<RespuestaAgregarCliente> {
    return this.http.post<RespuestaAgregarCliente>(this.urlAddCliente, cliente);
  }

  // URL para eliminar un cliente
  public urlEliminarCliente: string = API_DELETE_CIENTE;

  // Método para eliminar un cliente pasando el número de documento en la URL
  eliminarCliente(numeroDocumento: string): Observable<any> {
    return this.http.delete<any>(`${this.urlEliminarCliente}/${numeroDocumento}`);
  }

  public urlActualizarCliente: string =API_UPDATE_CIENTE;

  actualizarCliente(cliente: any): Observable<RespuestaActualizarCliente> {
    return this.http.put<RespuestaActualizarCliente>(this.urlActualizarCliente, cliente);
  }

}
