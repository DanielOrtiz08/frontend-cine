import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  API_GET_ALL_CONFECTIONERY, 
  API_GET_PAGINATED_CONFECTIONERY,
  API_ADD_CONFECTIONERY_PRODUCT,
  API_DELETE_CONFECTIONERY_PRODUCT,
  API_UPDATE_CONFECTIONERY_PRODUCT,
  API_UPDATE_ALL_PRICES
} from '../../utils/domains/URIc';

@Injectable({
  providedIn: 'root' 
})
export class ConfiteriasService {
  // URL de las rutas de la API
  public urlGetAll: string = API_GET_ALL_CONFECTIONERY;
  public urlGetPaginated: string = API_GET_PAGINATED_CONFECTIONERY;
  public urlAddProduct: string = API_ADD_CONFECTIONERY_PRODUCT;
  public urlDeleteProduct: string = API_DELETE_CONFECTIONERY_PRODUCT;
  public urlUpdateProduct: string = API_UPDATE_CONFECTIONERY_PRODUCT;
  public urlUpdateAllPrices: string = API_UPDATE_ALL_PRICES;

  constructor(private http: HttpClient) {}

  public getAllConfiterias(): Observable<any> {
    return this.http.get<any>(this.urlGetAll);
  }

  public getPaginatedConfiterias(page: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`${this.urlGetPaginated}?page=${page}&pageSize=${pageSize}`);
  }

  public addConfiteriaProduct(product: any): Observable<any> {
    return this.http.post<any>(this.urlAddProduct, product);
  }

  public deleteConfiteriaProduct(idProducto: string, idCine: string): Observable<any> {
    return this.http.delete<any>(`${this.urlDeleteProduct}/${idProducto}/${idCine}`);
  }

  public updateConfiteriaProduct(product: any): Observable<any> {
    return this.http.put<any>(this.urlUpdateProduct, product);
  }

  public updateAllPrices(prices: any): Observable<any> {
    return this.http.put<any>(this.urlUpdateAllPrices, prices);
  }
}
