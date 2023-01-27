import {Component, Input, OnInit} from '@angular/core';
import {ClientService} from "../services/client.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Client} from "../classes/Client";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MODAL, typeIcon} from "../../../helpers/swal.helper";
import {HttpEvent, HttpEventType} from "@angular/common/http";
import {AuthService} from "../../users/services/auth.service";

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {

  client: Client;
  photo: File;

  load: boolean = false;

  enabled: boolean = true;

  typesImages: string[] = ['jpg', 'jpeg', 'png', 'gif'];

  photoInput: FormGroup;


  constructor(
    private readonly clientService: ClientService,
    private readonly activateRoute: ActivatedRoute,
    private readonly router: Router,
    private formBuilder: FormBuilder,
    readonly authService: AuthService,
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
          .subscribe(client => this.client = client);
      }
    });
  }


  onSubmit() {
    this.load = !this.load;
    this.enabled = !this.enabled;
    if(this.photo){
      this.clientService.uploadPhoto(this.photo, this.client.id).subscribe(resp => {
        this.load = !this.load;
        this.client.imgUrl = resp.client.imgUrl;
        MODAL.swalClient(resp.message, 'Foto del cliente actualizada!', typeIcon.SUCCESS);
        this.photoInput.get('photo').setValue("");
      })
    }
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      if (!this.isValidFormatImage(event)) return;
      this.photo = event.target.files[0];
    }
  }

  isValidFormatImage(event: any): boolean {
    let formatImage = event.target.files[0].type.split("/")[1];
    if (this.typesImages.indexOf(formatImage) < 0) {
      MODAL.swalError("Formato no permitido", `Solo imágenes con estos formatos: ${this.typesImages.join(', ')}.`, typeIcon.ERROR);
      this.photoInput.get('photo').setValue("");
      return false;
    }
    this.enabled = !this.enabled;
    return true;
  }

}
