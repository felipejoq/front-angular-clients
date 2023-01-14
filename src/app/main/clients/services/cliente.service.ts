import { Injectable } from '@angular/core';
import { Client } from '../classes/Client';
import { CLIENTES } from '../data/client.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }

  getClients(): Client[] {
    return CLIENTES;
  }
}

