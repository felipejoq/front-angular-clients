import {Component} from '@angular/core';
import {Client} from '../classes/Client';
import {ClienteService} from '../services/cliente.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MODAL, typeIcon} from "../../../helpers/swal.helper";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  public tituloForm = `Formulario Clientes`;

  public client: Client = new Client();

  constructor(
    private readonly clientService: ClienteService,
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute) {}

  ngOnInit() {
    this.loadClient();
  }

  createClient(): void {
    this.clientService.postClient(this.client)
      .subscribe(resClient => {
        this.router.navigate(['/clients']);
        MODAL.swalClient(`Cliente ${ resClient.name } ${ resClient.lastName } creado con éxito!`, 'Nuevo Cliente', typeIcon.success);
      });
  }

  updateClient():void {
    this.clientService.updateClient(this.client)
      .subscribe( client => {
        this.router.navigate(['/clients']);
        MODAL.swalClient(`Cliente ${ client.name } ${ client.lastName } actualizado con éxito!`, 'Cliente Actualizado', typeIcon.success);
      })
  }

  loadClient(): void {
    this.activateRoute.params.subscribe(params => {
      const { id } = params;
      console.log(params)
      if (id) {
        this.clientService.getClient(id)
          .subscribe( client => this.client = client);
      }
    })
  }

}
