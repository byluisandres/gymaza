import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

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
  esEditable: boolean = false;
  id: string = '';
  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private activeRoute: ActivatedRoute
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

    this.id = this.activeRoute.snapshot.params.clienteID;
    if (this.id != undefined) {
      this.esEditable = true;
      this.db
        .doc<any>('clientes/' + this.id)
        .valueChanges()
        .subscribe((cliente) => {
          this.formularioCliente.setValue({
            nombre: cliente.nombre,
            apellido: cliente.apellido,
            correo: cliente.correo,
            dni: cliente.dni,
            fechaNacimiento: new Date(cliente.fechaNacimiento.seconds * 1000)
              .toISOString()
              .substr(0, 10),
            telefono: cliente.telefono,
            imgUrl: cliente.imgUrl,
          });
        });
    }
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
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cliente registrado',
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(() => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No se pudo registrar el cliente, inténtalo más tarde',
          showConfirmButton: false,
          timer: 1500,
        });
      });

    this.formularioCliente.reset();
  }

  editar() {
    this.formularioCliente.value.imgUrl = this.urlImagen;
    this.formularioCliente.value.fechaNacimiento = new Date(
      this.formularioCliente.value.fechaNacimiento
    );
    this.db
      .doc('clientes/' + this.id)
      .update(this.formularioCliente.value)
      .then((finalizo) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cliente actualizado',
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(() => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No se pudo actualizar, inténtalo más tarde',
          showConfirmButton: false,
          timer: 1500,
        });
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
