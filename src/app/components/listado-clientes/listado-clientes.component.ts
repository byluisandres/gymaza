import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.css'],
})
export class ListadoClientesComponent implements OnInit {
  clientes: any[] = new Array<any>();
  constructor(private db: AngularFirestore) {}

  ngOnInit(): void {
    this.clientes.length = 0;
    this.db
      .collection('clientes')
      .get()
      .subscribe((resultado) => {
        resultado.docs.forEach((element) => {
          let cliente = element.data();
          cliente.id = element.id;
          cliente.ref = element.ref;
          this.clientes.push(cliente);
        });
      });
  }
}
