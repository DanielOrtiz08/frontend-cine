import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_GET_CARTELERAS, API_CREATE_CARTELERA, API_DELETE_CARTELERA, API_UPDATE_CARTELERA } from '../../utils/domains/URIca';
import { Cartelera } from '../../interfaces/cartelera';


@Injectable({
  providedIn: 'root'
})
export class CartelerasService {
  public urlCarteleras: string = API_GET_CARTELERAS;

  constructor(private http:HttpClient) {}
  
  public getCarteleras(): Observable <any>{
    return this.http.get<any>(this.urlCarteleras);
  }

  public deleteCartelera(idPelicula: number, idCine: number): Observable<any> {
    return this.http.delete<any>(`${API_DELETE_CARTELERA}/${idPelicula}/${idCine}`);
  }
  
  public updateCartelera(idPelicula: number, cartelera: any): Observable<any> {
    return this.http.put<any>(`${API_UPDATE_CARTELERA}`, cartelera);
  }  
  
  public createCartelera(cartelera: any): Observable<any> {
    return this.http.post<any>(API_CREATE_CARTELERA, cartelera);
  }

}
