import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransaccionComponent } from './transaccion/transaccion.component';
import { HistorialComponent } from './historial/historial.component';

const routes: Routes = [
  {path:'transaccion',component:TransaccionComponent},
  {path:'historial',component:HistorialComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentaRoutingModule { }
