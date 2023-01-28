import {Component, EventEmitter, Output} from '@angular/core';
import {Client} from "./classes/Client";
import {ClientService} from "./services/client.service";
import {MODAL, typeIcon} from "../../helpers/swal.helper";
import {ActivatedRoute, Router} from "@angular/router";
import {ResponseClients} from "../../helpers/interfaces/response-clients.interface";
import {AuthService} from "../users/services/auth.service";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent {

  clients: Client[] | undefined;

  clientSelected: Client;

  paginator: ResponseClients | undefined;

  constructor(
    private readonly clientService: ClientService,
    private readonly activateRoute: ActivatedRoute,
    private readonly router: Router,
    readonly authService: AuthService,
  ) {
  }

  ngOnInit() {

    this.activateRoute.paramMap.subscribe(params => {
      // @ts-ignore
      let page: number = params.get("page") ? +params.get("page") : 0;

      this.clientService.getClients(page).subscribe(responseClients => {
          this.paginator = responseClients;

          this.clients = responseClients.content;
        }
      );
    });

  }

  delete(client: Client): void {
    MODAL.swalConfirm(`¿Seguro quiere eliminar a ${client.name}?`, `Cliente ${client.name} ${client.lastName} será borrado de forma permanente. Esta acción no es reversible.`, typeIcon.WARNING)
      .then((result) => {
        if (result.isConfirmed) {
          this.clientService.deleteClient(client.id).subscribe((result) => {
            this.clients = this.clients?.filter(cli => cli.id != client.id);
            if(this.clients.length === 0) {
              this.router.navigate(['/clients/page', this.paginator.number-1]);
              this.changePaginator()
            }
            MODAL.swalClient(`Cliente ${client.name} ${client.lastName} borrado con éxito!`, 'Cliente borrado.', typeIcon.SUCCESS);
          });
        }
      });
  }

  changePaginator () {
    this.paginator.number = this.paginator.number -= 1;
  }

}
