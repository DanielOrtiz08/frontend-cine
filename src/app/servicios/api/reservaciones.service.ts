import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as URIs from '../../utils/domains/URIs';

@Injectable({
  providedIn: 'root'
})
export class ReservacionesService {

  constructor(private http: HttpClient) {}

  public getReservaciones(): Observable<any> {
    return this.http.get<any>(URIs.API_GET_ALL_RESERVATIONS);
  }

  public getReservacionById(idReservacion: number): Observable<any> {
    return this.http.get<any>(URIs.API_GET_RESERVATION_BY_ID(idReservacion));
  }

  public createReservacion(data: any): Observable<any> {
    return this.http.post<any>(URIs.API_CREATE_RESERVATION, data);
  }

  public updateReservacion(data: any): Observable<any> {
    return this.http.put<any>(URIs.API_UPDATE_RESERVATION, data);
  }

  public deleteReservacion(data: any): Observable<any> {
    return this.http.request<any>('DELETE', URIs.API_DELETE_RESERVATION, { body: data });
  }

  public paginateReservaciones(limite: number, offset: number): Observable<any> {
    return this.http.get<any>(`${URIs.API_PAGINATE_RESERVATIONS}?limite=${limite}&offset=${offset}`);
  }

  public updatePriceByFunction(data: any): Observable<any> {
    return this.http.put<any>(URIs.API_UPDATE_PRICE_BY_FUNCTION, data);
  }

  public updatePriceByPerson(data: any): Observable<any> {
    return this.http.put<any>(URIs.API_UPDATE_PRICE_BY_PERSON, data);
  }

  public countReservasByFunction(idFuncion: number): Observable<any> {
    return this.http.get<any>(URIs.API_COUNT_RESERVATIONS_BY_FUNCTION(idFuncion));
  }

  public getSeatsByReservacion(idReservacion: number): Observable<any> {
    return this.http.get<any>(URIs.API_GET_SEATS_BY_RESERVATION(idReservacion));
  }

  public addSeatsToReservacion(data: any): Observable<any> {
    return this.http.post<any>(URIs.API_ADD_SEATS_TO_RESERVATION, data);
  }

  public deleteSeatFromReservacion(idReservacion: number, idSilla: number): Observable<any> {
    return this.http.delete<any>(URIs.API_DELETE_SEAT_FROM_RESERVATION(idReservacion, idSilla));
  }

  public addProductToReservacion(data: any): Observable<any> {
    return this.http.post<any>(URIs.API_ADD_PRODUCT_TO_RESERVATION, data);
  }

  public getProductsByReservacion(idReservacion: number): Observable<any> {
    return this.http.get<any>(URIs.API_GET_PRODUCTS_BY_RESERVATION(idReservacion));
  }

  public deleteProductFromReservacion(idReservacion: number, idProducto: number): Observable<any> {
    return this.http.delete<any>(URIs.API_DELETE_PRODUCT_FROM_RESERVATION(idReservacion, idProducto));
  }

  public updateAllPrices(precio: number): Observable<any> {
    return this.http.put<any>(URIs.API_UPDATE_ALL_PRICES(precio), {});
  }

  public deleteReservasByFunction(idFuncion: number): Observable<any> {
    return this.http.delete<any>(URIs.API_DELETE_RESERVATIONS_BY_FUNCTION(idFuncion));
  }
}
