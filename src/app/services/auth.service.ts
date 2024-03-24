import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Login } from '../models/login';
import { environment } from 'src/environments/environments.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) { }
  base=environment.base
  login(form:Login):Observable<any>{
    return this.http.post(this.base+'login',form)
    .pipe(
      map((success:any)=>{
        const tokenAF= `Bearer ${success['token']}`;
        localStorage.setItem('tokenBelen',tokenAF);
        // localStorage.setItem('token-ope',btoa(tokenAF));
        // localStorage.setItem('token-ope',success);
        return success;
      })
    );
  }}
