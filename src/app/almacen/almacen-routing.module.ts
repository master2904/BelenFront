import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaComponent } from './categoria/categoria.component';
import { ProductoComponent } from './producto/producto.component';
import { SucursalComponent } from './sucursal/sucursal.component';
import { InventarioComponent } from './inventario/inventario.component';

const routes: Routes = [
  {path:'categoria',component:CategoriaComponent},
  {path:'producto',component:ProductoComponent},
  {path:'sucursal',component:SucursalComponent},
  {path:'inventario',component:InventarioComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlmacenRoutingModule { }
