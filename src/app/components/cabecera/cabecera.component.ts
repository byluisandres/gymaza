import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase/app';
@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css'],
})
export class CabeceraComponent implements OnInit {
  usuario: User;
  constructor(private auth: AngularFireAuth) {
    this.auth.user.subscribe((usuario) => {
      this.usuario = usuario;
    });
  }

  ngOnInit(): void {}
  logout() {
    this.auth.signOut();
  }
}
