import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments.prod';
import { Venta } from '../models/venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  base=environment.base
  constructor( private http:HttpClient) { }
  listar():Observable<Venta[]>{
    return this.http.get<Venta[]>(`${this.base}venta`);
  }
  nuevo(form:any):Observable<Venta>{
    return this.http.post<Venta>(`${this.base}venta`,form);
  }
  eliminar(id:number):Observable<Venta>{
    return this.http.delete<Venta>(`${this.base}venta/`+id);
  }
  actualizar(id:number,form:Venta):Observable<Venta>{
    return this.http.put<Venta>(`${this.base}venta/`+id, form);
  }
}
