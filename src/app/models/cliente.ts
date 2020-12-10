import { DocumentReference } from '@angular/fire/firestore';

export class Cliente {
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
  dni: string;
  fechaNacimiento: Date;
  telefono: number;
  imgUrl: string;
  ref: DocumentReference;
  visible: boolean;
}
