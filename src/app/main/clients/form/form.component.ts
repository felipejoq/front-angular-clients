import {Component} from '@angular/core';
import {Client} from '../classes/Client';
import {ClientService} from '../services/client.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MODAL, typeIcon} from "../../../helpers/swal.helper";
import {Location} from "@angular/common";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  public tituloForm = `Client Form`;

  public client: Client = new Client();

  constructor(
    private readonly clientService: ClientService,
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute,
    private readonly location: Location) {
  }

  ngOnInit() {
    this.loadClient();
  }

  createClient(): void {
    this.clientService.postClient(this.client)
      .subscribe(resp => {
        let { name, lastName } = resp.client
        // this.router.navigate(['/clients']);
        this.location.back();
        MODAL.swalClient(`Cliente ${name} ${lastName} creado con éxito!`, `${resp.message}`, typeIcon.SUCCESS);
      });
  }

  updateClient(): void {
    this.clientService.updateClient(this.client)
      .subscribe(
        resp => {
          // this.router.navigate(['/clients'])
          this.location.back();
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
