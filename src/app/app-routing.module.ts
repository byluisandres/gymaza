import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarclienteComponent } from './components/agregarcliente/agregarcliente.component';
import { ListadoClientesComponent } from './components/listado-clientes/listado-clientes.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
