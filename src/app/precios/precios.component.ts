import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.css'],
})
export class PreciosComponent implements OnInit {
  formularioPrecio: FormGroup;
  precios: any[] = new Array<any>();

  constructor(private fb: FormBuilder, private db: AngularFirestore) {}

  ngOnInit(): void {
    this.formularioPrecio = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      duracion: ['', Validators.required],
      tipoDuracion: ['', Validators.required],
    });
    this.db.collection('precios').get().subscribe(resultado=>{
      resultado.docs.forEach(dato=>{
        let precio=dato.data();
       precio.id=dato.id;
       precio.ref=dato.ref;
       this.precios.push(precio);
       
      });
    });
  }

  agregar() {
    this.db
      .collection('precios')
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
    console.log(this.formularioPrecio.value);
  }
}
