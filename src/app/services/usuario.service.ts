import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  base=environment.base
  constructor( private http:HttpClient) { }
  listar(){
    return this.http.get(`${this.base}usuario`);
  }
  buscar(id:number){
    return this.http.get(`${this.base}usuario/`+id);
  }
  nuevo(form:Usuario):Observable<Usuario[]>{
    return this.http.post<Usuario[]>(`${this.base}usuario`,form);
  }
  eliminar(id:number):Observable<Usuario[]>{
    return this.http.delete<Usuario[]>(`${this.base}usuario/`+id);
  }
  actualizar(id:number,form:Usuario):Observable<Usuario[]>{
    return this.http.put<Usuario[]>(`${this.base}usuario/`+id, form);
  }
  subirImagen(file:File,nombre:string):Observable<any>{
    const fd = new FormData
    fd.append('image',file,nombre)
    return this.http.post(this.base+'usuario/imagen',fd)
  }
  cargar(nombre:string){
    return this.http.get(`${this.base}usuario/imagen/`+nombre);
  }
}
