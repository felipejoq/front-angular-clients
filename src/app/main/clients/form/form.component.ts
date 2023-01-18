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
    private readonly activateRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.loadClient();
  }

  createClient(): void {
    this.clientService.postClient(this.client)
      .subscribe(resp => {
        console.log(resp)
          this.router.navigate(['/clients']);
          MODAL.swalClient(`Cliente ${resp.client.name} creado con éxito!`, `${resp.message}`, typeIcon.SUCCESS);
        });
  }

  updateClient(): void {
    this.clientService.updateClient(this.client)
      .subscribe(
        resp => {
          this.router.navigate(['/clients'])
          MODAL.swalClient(`Cliente ${resp.client.name} actualizado con éxito!`, `${resp.message}`, typeIcon.SUCCESS);
        })
  }

  loadClient(): void {
    this.activateRoute.params.subscribe(params => {
      const {id} = params;

      if (id) {
        this.clientService.getClient(id)
          .subscribe(client => this.client = client);
      }
    });
  }

}
