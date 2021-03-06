import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarclienteComponent } from './components/agregarcliente/agregarcliente.component';
import { InscripcionComponent } from './components/inscripcion/inscripcion.component';
import { ListadoClientesComponent } from './components/listado-clientes/listado-clientes.component';
import { ListadoInscripcionesComponent } from './components/listado-inscripciones/listado-inscripciones.component';
import { PreciosComponent } from './components/precios/precios.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inscripcion',
    pathMatch: 'full',
  },
  {
    path: 'inscripcion',
    component: InscripcionComponent,
  },
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
    path: 'precios',
    component: PreciosComponent,
  },
  {
    path: 'listado-inscripciones',
    component: ListadoInscripcionesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
