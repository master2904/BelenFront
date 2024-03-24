import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/models/login';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  fieldTextType=false
  constructor(private AuthServicio:AuthService,private toastr:ToastrService){}
  formulario=new FormGroup({
    password: new FormControl('',[Validators.required]),
    username: new FormControl('',[Validators.required]),
  })
  get password(){return this.formulario.get('password')}
  get username(){return this.formulario.get('username')}
  error_password():string{
    if(this.password?.hasError('required'))
      return "Campo Obligatorio"
    return ""
  }
  error_cuenta():string{
    if(this.username?.hasError('required'))
      return "Campo Obligatorio"
    return ""
  }

  onLogin():void{
    let form:Login={password:"",username:""}
    form.password=this.password?.value+""
    form.username=this.username?.value+""
    this.AuthServicio.login(form).subscribe(data=>{
      console.log(data)
      this.toastr.success("Haz iniciado Sesion",'En hora buena!');

    })
  }
}
