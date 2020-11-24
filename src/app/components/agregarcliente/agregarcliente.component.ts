import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregarcliente',
  templateUrl: './agregarcliente.component.html',
  styleUrls: ['./agregarcliente.component.css'],
})
export class AgregarclienteComponent implements OnInit {
  formularioCliente: FormGroup;
  textImg: string = '';
  porcentajeSubida: number = 0;
  urlImagen: string = '';
  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.formularioCliente = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      dni: [''],
      fechaNacimiento: ['', Validators.required],
      telefono: [''],
      imgUrl: ['', Validators.required],
    });
  }

  agregar() {
    this.formularioCliente.value.imgUrl = this.urlImagen;
    this.formularioCliente.value.fechaNacimiento = new Date(
      this.formularioCliente.value.fechaNacimiento
    );
    this.db
      .collection('clientes')
      .add(this.formularioCliente.value)
      .then((finalizo) => {
        console.log('registro creado');
      });
  }
  subirImagen(event: { target: { files: string | any[] } }) {
    if (event.target.files.length > 0) {
      let nombre = new Date().getTime().toString();
      let file = event.target.files[0];
      let extension = file.name
        .toString()
        .substring(file.name.toString().lastIndexOf('.'));
      let ruta = 'clientes/' + nombre + extension;
      const referencia = this.storage.ref(ruta);
      const tarea = referencia.put(file);
      tarea.then((objeto) => {
        this.textImg = 'Imágen subida';
        referencia.getDownloadURL().subscribe((url) => {
          this.urlImagen = url;
        });
      });
      tarea.percentageChanges().subscribe((porcentaje) => {
        this.porcentajeSubida = parseInt(porcentaje.toString());
      });
    }
  }
}
