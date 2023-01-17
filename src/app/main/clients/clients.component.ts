import {Component} from '@angular/core';
import {Client} from "./classes/Client";
import {ClienteService} from "./services/cliente.service";
import {MODAL, typeIcon} from "../../helpers/swal.helper";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent {

  clients: Client[] | undefined;

  constructor(private readonly clientService: ClienteService) {
  }

  ngOnInit() {
    this.clientService.getClients().subscribe(clientes => this.clients = clientes);
  }

  delete(client: Client): void {
    MODAL.swalConfirm(`¿Seguro quiere eliminar a ${client.name}?`, `Cliente ${ client.name} ${client.lastName} será borrado de forma permanente. Esta acción no es reversible.`, typeIcon.warning)
      .then((result) => {
        if (result.isConfirmed) {
          this.clientService.deleteClient(client.id).subscribe((result) => {
            this.clients = this.clients?.filter(cli => cli.id != client.id);
            MODAL.swalClient(`Cliente ${client.name} ${client.lastName} borrado con éxito!`, 'Cliente borrado.', typeIcon.success);
          });
        }
      });
  }

}
