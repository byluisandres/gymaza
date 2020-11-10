import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formularioLogin: FormGroup;
  datosCorrecto: boolean = true;
  texto: string = '';
  constructor(
    private creadorFormulario: FormBuilder,
    private auth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.formularioLogin = this.creadorFormulario.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
  }
  ingresar() {
    if (this.formularioLogin.valid) {
      this.datosCorrecto = true;
      this.auth
        .signInWithEmailAndPassword(
          this.formularioLogin.value.email,
          this.formularioLogin.value.password
        )
        .then((usuario) => {
          console.log(usuario);
        })
        .catch((error) => {
          this.datosCorrecto = false;
          this.texto = 'La contraseña y/o el usuario son incorrectos';
        });
    } else {
      this.datosCorrecto = false;
      this.texto = 'Todos los datos son obligatorios';
    }
  }
}
