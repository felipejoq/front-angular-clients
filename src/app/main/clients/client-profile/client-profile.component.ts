import {Component, OnInit} from '@angular/core';
import {ClientService} from "../services/client.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Client} from "../classes/Client";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MODAL, typeIcon} from "../../../helpers/swal.helper";

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {

  client: Client = null;
  photo: File;

  load: boolean = false;

  enabled: boolean = true;

  photoInput: FormGroup;

  constructor(
    private readonly clientService: ClientService,
    private readonly activateRoute: ActivatedRoute,
    private readonly router: Router,
    private formBuilder: FormBuilder,
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
      const { id } = params;

      if (id) {
        this.clientService.getClient(id)
          .subscribe(client =>  this.client = client );
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
      this.photo = event.target.files[0];
      this.enabled = !this.enabled;
    }
  }

}
