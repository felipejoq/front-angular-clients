import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ClientService} from "../services/client.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Client} from "../classes/Client";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MODAL, typeIcon} from "../../../helpers/swal.helper";
import {AuthService} from "../../users/services/auth.service";
import {Invoice} from "../../invoices/classes/Invoice";
import {InvoiceService} from "../../invoices/services/invoice.service";
import {Response} from "../../../helpers/interfaces/response-clients.interface";

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit, OnChanges {

  @Input() client: Client;

  photo: File;

  load: boolean = false;

  enabled: boolean = true;

  typesImages: string[] = ['jpg', 'jpeg', 'png', 'gif'];

  photoInput: FormGroup;
  photoName: string;
  invoices: Invoice[];

  paginator: Response;

  showPaginator: boolean = false;

  constructor(
    private readonly clientService: ClientService,
    private readonly activateRoute: ActivatedRoute,
    private readonly router: Router,
    private formBuilder: FormBuilder,
    readonly authService: AuthService,
    private readonly invoiceService: InvoiceService,
  ) {
  }

  ngOnInit() {
    this.loadClient();
    this.photoInput = this.formBuilder.group({
      photo: new FormControl('')
    });
  }


  loadClient(): void {
    this.activateRoute.params.subscribe(params => {
      const {id} = params;

      if (id) {
        this.clientService.getClient(id)
          .subscribe(client => {
            this.client = client
            this.invoices = client.invoices;
          });
      }
    });
  }


  onSubmit() {
    this.load = !this.load;
    this.photoName = null;
    if (this.photo) {
      this.clientService.uploadPhoto(this.photo, this.client.id).subscribe(resp => {
        this.load = !this.load;
        this.client.imgUrl = resp.client.imgUrl;
        MODAL.swalClient(resp.message, 'Foto del cliente actualizada!', typeIcon.SUCCESS);
        this.photoInput.get('photo').setValue("");
        this.enabled = !this.enabled;
      })
    }
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      if (!this.isValidFormatImage(event)) return;
      this.photo = event.target.files[0];
      this.photoName = event.target.files[0].name;
      this.enabled = !this.enabled;
    }
  }

  isValidFormatImage(event: any): boolean {
    let formatImage = event.target.files[0].type.split("/")[1];
    if (this.typesImages.indexOf(formatImage) < 0) {
      MODAL.swalError("Formato no permitido", `Solo imágenes con estos formatos: ${this.typesImages.join(', ')}.`, typeIcon.ERROR);
      this.photoInput.get('photo').setValue("");
      this.enabled = !this.enabled;
      return false;
    }
    return true;
  }

  clearPhotoName() {
    if (this.photoName) {
      this.photoName = null
      this.enabled = !this.enabled;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['client'].currentValue) {
      this.invoices = this.client.invoices;
      this.showPaginator = this.invoices.length > 5;
    }
  }
}
