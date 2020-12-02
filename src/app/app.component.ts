import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Gymaza';
  usuario: User;
  cargando: boolean = true;

  constructor(public auth: AngularFireAuth) {
    this.auth.user.subscribe((usuario) => {
      this.cargando = false;
      this.usuario = usuario;
    });
  }
  logout() {
    this.auth.signOut();
  }
}
