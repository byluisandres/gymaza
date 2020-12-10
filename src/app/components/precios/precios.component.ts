import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Precio } from 'src/app/models/precio';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
})
export class PreciosComponent implements OnInit {
  formularioPrecio: FormGroup;
  precios: Precio[] = new Array<Precio>();
  esEditar: boolean = false;
  id: string = '';
  constructor(private fb: FormBuilder, private db: AngularFirestore) {}

  ngOnInit(): void {
    this.formularioPrecio = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      duracion: ['', Validators.required],
      tipoDuracion: ['', Validators.required],
    });
    this.listarPrecio();
  }

  listarPrecio() {
    this.db
      .collection<Precio>('precios')
      .get()
      .subscribe((resultado) => {
        this.precios.length = 0;
        resultado.docs.forEach((dato) => {
          let precio = dato.data() as Precio;
          precio.id = dato.id;
          precio.ref = dato.ref;

          this.precios.push(precio);
        });
      });
  }
  agregar() {
    this.formularioPrecio.value.tipoDuracion = parseInt(
      this.formularioPrecio.value.tipoDuracion
    );

    this.db
      .collection<Precio>('precios')
      .add(this.formularioPrecio.value)
      .then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Precio agregado correctamente',
          showConfirmButton: false,
          timer: 1500,
        });
        this.formularioPrecio.reset();
        this.listarPrecio();
      })
      .catch(() => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Hubo un fallo al agregar el precio',
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }

  editarPrecio(precio: Precio) {
    this.esEditar = true;
    this.formularioPrecio.setValue({
      nombre: precio.nombre,
      precio: precio.precio,
      duracion: precio.duracion,
      tipoDuracion: precio.tipoDuracion,
    });
    this.id = precio.id;
  }

  editar() {
    this.formularioPrecio.value.tipoDuracion = parseInt(
      this.formularioPrecio.value.tipoDuracion
    );
    this.db
      .doc('precios/' + this.id)
      .update(this.formularioPrecio.value)
      .then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se ha editado correctamente',
          showConfirmButton: false,
          timer: 1500,
        });
        this.formularioPrecio.reset();
        this.listarPrecio();
      })
      .catch(() => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Hubo un fallo al editar, intentalo más tarde',
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }
}
