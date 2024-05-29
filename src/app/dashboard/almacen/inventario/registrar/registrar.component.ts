import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent {

  titulo=""
  tipo=0
  constructor(
    public dialogRef: MatDialogRef<RegistrarComponent>,
    @ Inject(MAT_DIALOG_DATA) public data:any)
   { }
  agregar=new FormGroup({
      id: new FormControl(''),
      stock: new FormControl(''),
      precio_compra: new FormControl(''),
      precio_venta: new FormControl('')
    })
  get stock(){return this.agregar.get('stock'); }
  get precio_compra(){return this.agregar.get('precio_compra'); }
  get precio_venta(){return this.agregar.get('precio_venta'); }

  ngOnInit(): void {
    let x=this.data.tipo
    let v=this.data.producto
    this.titulo = (x==1)?"Stock":((x==2)?"Precio Compra":"Precio Venta")
    this.tipo =x
    this.agregar.controls['id'].setValue(v.id);
    this.agregar.controls['stock'].setValue(v.stock);
    this.agregar.controls['precio_compra'].setValue(v.precio_compra);
    this.agregar.controls['precio_venta'].setValue(v.precio_venta);
  }
  cancelar() {
    this.dialogRef.close();
  }
  nuevo(){

  }
}
