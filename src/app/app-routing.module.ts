import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SliderComponent } from './components/slider/slider.component';
import { LoginComponent } from './components/login/login.component';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';

const routes: Routes = [
  {
    path:'',
    component:SliderComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'acerca',
    component:AcercaDeComponent
  },
  {path:'usuario',
    loadChildren:()=>import('./usuario/usuario.module').then(u => u.UsuarioModule),
    // data:{
    //   role:'1'
    // },
  //   // canActivate:[RolesGuard]
  },
  {
    path:'cliente',
    loadChildren:()=>import('./cliente/cliente.module').then(c => c.ClienteModule),
    // data:{
    //   role:'1'
    // },
  //   // canActivate:[RolesGuard]
  },
  {
    path:'almacen',
    loadChildren:()=>import('./almacen/almacen.module').then(a => a.AlmacenModule),
    // data:{
    //   role:'1'
    // },
  //   // canActivate:[RolesGuard]
  },
  {
    path:'venta',
    loadChildren:()=>import('./venta/venta.module').then(v => v.VentaModule),
    // data:{
    //   role:'1'
    // },
  //   // canActivate:[RolesGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
