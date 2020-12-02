import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//bootstrap
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

//firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreModule,
} from '@angular/fire/firestore';

import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListadoClientesComponent } from './components/listado-clientes/listado-clientes.component';
import { AgregarclienteComponent } from './components/agregarcliente/agregarcliente.component';
import { BarralateralComponent } from './components/barralateral/barralateral.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListadoClientesComponent,
    AgregarclienteComponent,
    BarralateralComponent,
   
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    ReactiveFormsModule,
    NgxSpinnerModule,
    FormsModule,
    AngularFirestoreModule,
  ],
  providers: [AngularFireAuth, AngularFirestore],
  bootstrap: [AppComponent],
})
export class AppModule {}
