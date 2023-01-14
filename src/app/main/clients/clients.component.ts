import { Component } from '@angular/core';
import { Client } from "./classes/Client";
import {ClienteService} from "./services/cliente.service";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent {

  clients: Client[] | undefined;

  constructor(private readonly clientService: ClienteService) {}

  ngOnInit() {
    this.clientService.getClients().subscribe(clientes => this.clients = clientes);
  }

}
