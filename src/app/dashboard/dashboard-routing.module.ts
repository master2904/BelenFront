import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { isLoggedInGuard } from '../auth/guards/is-logged-in.guard';
import { hasRoleGuard } from '../auth/guards/has-role.guard';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path:'',component:DashboardComponent,
    children:[
      {path:'',component:HomeComponent},
      {
        path:'usuario',
        canActivate:[isLoggedInGuard ,hasRoleGuard],
        data:{
          allowedRoles:['1','2']
        },
        loadChildren:()=>import('./usuario/usuario.module').then(u => u.UsuarioModule),
      },
      {
        path:'cliente',
        canActivate:[isLoggedInGuard ,hasRoleGuard],
        data:{
          allowedRoles:['1','2']
        },
        loadChildren:()=>import('./cliente/cliente.module').then(c => c.ClienteModule),
      },
      {
        path:'almacen',
        canActivate:[isLoggedInGuard ,hasRoleGuard],
        data:{
          allowedRoles:['1','2']
        },
        loadChildren:()=>import('./almacen/almacen.module').then(a => a.AlmacenModule),
      },
      {
        path:'venta',
        canActivate:[isLoggedInGuard ,hasRoleGuard],
        data:{
          allowedRoles:['1','2']
        },
        loadChildren:()=>import('./venta/venta.module').then(v => v.VentaModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
