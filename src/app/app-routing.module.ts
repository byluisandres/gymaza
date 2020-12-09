import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarclienteComponent } from './components/agregarcliente/agregarcliente.component';
import { ListadoClientesComponent } from './components/listado-clientes/listado-clientes.component';
import { PreciosComponent } from './precios/precios.component';

const routes: Routes = [
  {
    path: 'listado-clientes',
    component: ListadoClientesComponent,
  },
  {
    path: 'añadir-clientes/:clienteID',
    component: AgregarclienteComponent,
  },
  {
    path: 'añadir-clientes',
    component: AgregarclienteComponent,
  },
  {
    path:'precios',
    component:PreciosComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
