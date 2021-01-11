import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from 'src/app/models/cliente';
import { Inscripcion } from 'src/app/models/inscripcion';
import { Precio } from 'src/app/models/precio';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
})
export class InscripcionComponent implements OnInit {
  inscripcion: Inscripcion = new Inscripcion();
  clienteSeleccionado: Cliente = new Cliente();
  precioSeleccionado = new Precio();
  precios: Precio[] = new Array<Precio>();
  selectPrecio: string = 'null';
  constructor(private db: AngularFirestore) {}

  ngOnInit(): void {
    this.db
      .collection('precios')
      .get()
      .subscribe((resultado) => {
        resultado.docs.forEach((item) => {
          let precio = item.data() as Precio;
          precio.id = item.id;
          precio.ref = item.ref;
          this.precios.push(precio);
        });
      });
  }

  asignarCliente(cliente: Cliente) {
    this.inscripcion.cliente = cliente.ref;
    this.clienteSeleccionado = cliente;
  }
  eliminarCliente() {
    this.clienteSeleccionado = new Cliente();
    this.inscripcion.cliente = undefined;
  }

  seleccionarPrecio(precioId: string) {
    this.precioSeleccionado = this.precios.find(
      (precio) => precio.id == precioId
    );

    this.inscripcion.precio = this.precioSeleccionado.ref;

    this.inscripcion.fecha = new Date();

    this.inscripcion.subTotal = this.precioSeleccionado.precio;
    this.inscripcion.iva = this.inscripcion.subTotal * 0.21;
    this.inscripcion.total = this.inscripcion.subTotal + this.inscripcion.iva;
    /*dia =1
    semana=2
    mes=3
    año=4
    */

    if (this.precioSeleccionado.tipoDuracion === 1) {
      var dias: number = this.precioSeleccionado.duracion;
      let fechaFinal = new Date(
        this.inscripcion.fecha.getFullYear(),
        this.inscripcion.fecha.getMonth(),
        this.inscripcion.fecha.getDate() + dias
      );
      this.inscripcion.fechaFinal = fechaFinal;
    }
    if (this.precioSeleccionado.tipoDuracion === 2) {
      var dias: number = this.precioSeleccionado.duracion * 7;
      let fechaFinal = new Date(
        this.inscripcion.fecha.getFullYear(),
        this.inscripcion.fecha.getMonth(),
        this.inscripcion.fecha.getDate() + dias
      );
      this.inscripcion.fechaFinal = fechaFinal;
    }
    if (this.precioSeleccionado.tipoDuracion === 3) {
      var meses: number = this.precioSeleccionado.duracion;
      let fechaFinal = new Date(
        this.inscripcion.fecha.getFullYear(),
        this.inscripcion.fecha.getMonth() + meses,
        this.inscripcion.fecha.getDate()
      );
      this.inscripcion.fechaFinal = fechaFinal;
    }
    if (this.precioSeleccionado.tipoDuracion === 4) {
      var dias: number = this.inscripcion.fecha.getDate();
      var meses: number =
        this.precioSeleccionado.duracion + this.inscripcion.fecha.getMonth();
      var anio: number =
        this.inscripcion.fecha.getFullYear() + this.precioSeleccionado.duracion;
      let fechaFinal = new Date(anio, meses, dias);
      this.inscripcion.fechaFinal = fechaFinal;
    }
  }

  guardar() {
    if (this.inscripcion.validar().esValido) {
      let inscripcinUsuario = {
        fecha: this.inscripcion.fecha,
        fechaFinal: this.inscripcion.fechaFinal,
        cliente: this.inscripcion.cliente,
        precio: this.inscripcion.precio,
        subTotal: this.inscripcion.subTotal,
        iva: this.inscripcion.iva,
        total: this.inscripcion.total,
      };
      this.db
        .collection('inscripciones')
        .add(inscripcinUsuario)
        .then((resultado) => {
          this.inscripcion = new Inscripcion();
          this.clienteSeleccionado = new Cliente();
          this.precioSeleccionado = new Precio();
          this.selectPrecio = 'null';
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          });

          Toast.fire({
            icon: 'success',
            title: 'Se ha inscripto con exito',
          });
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: this.inscripcion.validar().mensaje,
      });
    }
  }
}
