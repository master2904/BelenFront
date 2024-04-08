import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  numero:any=/[0-9]+/;
  user:any=/[A-Za-z0-9]/;
  letras:any=/[A-Za-z ]{3,20}/;
  public name:string=""
  public previsualizacion:string=""
  texto:string=""
  constructor(public dialogRef:MatDialogRef<FormularioComponent>, @ Inject (MAT_DIALOG_DATA) public data:any,private clienteServicio:ClienteService){
    this.texto=data.texto
    this.nit?.setValue(data.cliente.nit)
    this.nombre?.setValue(data.cliente.nombre)
    this.direccion?.setValue(data.cliente.direccion)
    this.celular?.setValue(data.cliente.celular)
  }
  agregar=new FormGroup({
    id: new FormControl('',[]),
    nit: new FormControl('',[Validators.required]),
    nombre: new FormControl('',[Validators.required]),
    celular: new FormControl('',[]),
    direccion: new FormControl('',[]),
  })
  get nit(){return this.agregar.get('nit'); }
  get nombre(){return this.agregar.get('nombre'); }
  get celular(){return this.agregar.get('celular'); }
  get direccion(){return this.agregar.get('direccion'); }
  nuevo():void{
    // this.enviarImagen();
    // this.agregar.controls['img'].setValue(this.nombre_i);
  }
  cancelar() {
    this.dialogRef.close();
  }
  error_nombre() {
    if (this.nombre?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.nombre?.hasError('minlength'))
      return 'Ingrese minimo 3 caracteres';
    if(this.nombre?.hasError('pattern'))
      return  'Solo se aceptan letras';
      return  '';
  }
  error_nit() {
    if (this.nit?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return '';
  }
  error_celular() {
    if (this.celular?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.celular?.hasError('minlength'))
      return 'Ingrese minimo 3 caracteres';
    return this.celular?.hasError('pattern') ? 'Solo se aceptan numeros y letras' : '';
  }
  error_direccion() {
    if (this.direccion?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    return ""
  }
}
