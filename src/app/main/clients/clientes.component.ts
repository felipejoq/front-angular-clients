import { Component } from '@angular/core';
import { Client } from "./classes/Client";
import {ClienteService} from "./services/cliente.service";

@Component({
  selector: 'app-clients',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent {

  clients: Client[] | undefined;

  constructor(private readonly clientService: ClienteService) {}

  ngOnInit() {
    this.clients = this.clientService.getClients();
  }

}
