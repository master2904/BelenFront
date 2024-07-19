import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemService } from 'src/app/services/item.service';
import { environment } from 'src/environments/environments.prod';

@Component({
  selector: 'app-formulario-item',
  templateUrl: './formulario-item.component.html',
  styleUrls: ['./formulario-item.component.css']
})
export class FormularioItemComponent {
  texto:string=""
  base=environment.base
  constructor(public dialogRef:MatDialogRef<FormularioItemComponent>, @ Inject (MAT_DIALOG_DATA) public data:any,private itemServicio:ItemService){
    this.texto=data.texto
    this.id?.setValue(data.item.id)
    this.nuevo?.setValue(data.item.nombre)
  }
  agregar=new FormGroup({
    id: new FormControl('',[]),
    nuevo: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]),

  })
  get id(){return this.agregar.get('id'); }
  get nuevo(){return this.agregar.get('nuevo'); }

  adicionar():void{
    // this.enviarImagen();
    // this.agregar.controls['img'].setValue(this.nombre_i);
  }
  cancelar() {
    this.dialogRef.close();
  }
  error_nuevo() {
    if (this.nuevo?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if(this.nuevo?.hasError('minlength'))
      return 'Ingrese minimo 3 caracteres';
    if(this.nuevo?.hasError('pattern'))
      return  'Solo se aceptan letras';
      return  '';
  }
}
