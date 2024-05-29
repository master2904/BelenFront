import { AuthService } from "../services/auth.service";

export class Permisos {
  constructor(){
    this.user=JSON.parse(localStorage.getItem('test')+"")
  }
  user:any
  isAdmin():boolean{
    return this.user.rol==1
  }
  isEncargado(){
    return this.user.rol==1||this.user.rol==2
  }
}

