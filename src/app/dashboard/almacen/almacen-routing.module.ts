import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaComponent } from './categoria/categoria.component';
import { ProductoComponent } from './producto/producto.component';
import { SucursalComponent } from './sucursal/sucursal.component';
import { InventarioComponent } from './inventario/inventario.component';
import { isLoggedInGuard } from 'src/app/auth/guards/is-logged-in.guard';
import { hasRoleGuard } from 'src/app/auth/guards/has-role.guard';
import { ProductoSucursalComponent } from './producto-sucursal/producto-sucursal.component';

const routes: Routes = [
  {path:'categoria',component:CategoriaComponent},
  {path:'producto',component:ProductoComponent},
  {path:'producto/sucursal',component:ProductoSucursalComponent},
  {
    path:'sucursal',
    component:SucursalComponent,
    canActivate:[isLoggedInGuard ,hasRoleGuard],
    data:{
      allowedRoles:['1']
    },
  },
  {path:'inventario',component:InventarioComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlmacenRoutingModule { }
