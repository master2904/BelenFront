import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-producto-sucursal',
  templateUrl: './producto-sucursal.component.html',
  styleUrls: ['./producto-sucursal.component.css']
})
export class ProductoSucursalComponent {
  buscar=new FormGroup({
    producto: new FormControl('',)
  })
  get producto(){return this.buscar.get('producto'); }
  buscarProducto(){}
}
