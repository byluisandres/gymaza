import { DocumentReference } from '@angular/fire/firestore';

export class Inscripcion {
  fecha: Date;
  fechaFinal: Date;
  cliente: DocumentReference;
  precio: DocumentReference;
  subTotal: number;
  iva: number;
  total: number;
  constructor() {
    this.fecha = null;
    this.fechaFinal = null;
    this.cliente = this.cliente;
    this.precio = this.precio;
    this.subTotal = null;
    this.iva = null;
    this.total = null;
  }
  validar(): any {
    let respuesta = {
      esValido: false,
      mensaje: '',
    };

    //válidaciones
    if (this.cliente === null || this.cliente == undefined) {
      respuesta.esValido = false;
      respuesta.mensaje = 'Seleccione un cliente';
      return respuesta;
    }
    if (this.precio === null || this.precio == undefined) {
      respuesta.esValido = false;
      respuesta.mensaje = 'Seleccione un precio';
      return respuesta;
    }
    if (this.fecha === null || this.fecha == undefined) {
      respuesta.esValido = false;
      respuesta.mensaje = 'Seleccione fecha de inicio';
      return respuesta;
    }
    if (this.fechaFinal === null || this.fechaFinal == undefined) {
      respuesta.esValido = false;
      respuesta.mensaje = 'Seleccione fecha final';
      return respuesta;
    }
    if (this.subTotal <= 0 || this.subTotal == undefined) {
      respuesta.esValido = false;
      respuesta.mensaje = 'No se ha podido calcular el subtotal';
      return respuesta;
    }
    if (this.iva <= 0 || this.iva == undefined) {
      respuesta.esValido = false;
      respuesta.mensaje = 'No se ha podido calcular el iva';
      return respuesta;
    }
    if (this.total <= 0 || this.total == undefined) {
      respuesta.esValido = false;
      respuesta.mensaje = 'No se ha podido calcular eltotal';
      return respuesta;
    }
    respuesta.esValido = true;
    return respuesta;
  }
}
