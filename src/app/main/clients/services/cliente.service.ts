import { Injectable } from '@angular/core';
import { Client } from '../classes/Client';
import { CLIENTES } from '../data/client.interface';
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }

  getClients(): Observable<Client[]> {
    return of(CLIENTES);
  }
}

