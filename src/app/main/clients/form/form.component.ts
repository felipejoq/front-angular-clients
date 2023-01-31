import {Component} from '@angular/core';
import {Client} from '../classes/Client';
import {ClientService} from '../services/client.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MODAL, typeIcon} from "../../../helpers/swal.helper";
import {Location} from "@angular/common";

import {CountryService} from "../../country/services/country.service";
import {Country} from "../../country/classes/Country";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  public tituloForm = `Client Form`;

  public client: Client = new Client();

  results: Country[];

  countryIsValid: boolean;

  constructor(
    private readonly clientService: ClientService,
    private readonly countryService: CountryService,
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
        MODAL.swalGeneric(`Cliente ${name} ${lastName} creado con éxito!`, `${resp.message}`, typeIcon.SUCCESS);
      });
    console.log(this.client);
  }

  updateClient(): void {
    this.clientService.updateClient(this.client)
      .subscribe(
        resp => {
          // this.router.navigate(['/clients'])
          this.location.back();
          MODAL.swalGeneric(`Cliente ${resp.client.name} actualizado con éxito!`, `${resp.message}`, typeIcon.SUCCESS);
        })
  }

  loadClient(): void {
    this.activateRoute.params.subscribe(params => {
      const {id} = params;

      if (id) {
        this.clientService.getClient(id)
          .subscribe(client => {
            this.client = client;
          });
      }
    });
  }

  search(event) {
    this.countryService.getCountries(event.query).subscribe(resp => {
      this.results = resp.countries;
    })
  }


  handleSelected(country: Country) {
  }
}
