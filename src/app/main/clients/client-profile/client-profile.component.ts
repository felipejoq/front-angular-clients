import {Component, OnInit} from '@angular/core';
import {ClientService} from "../services/client.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Client} from "../classes/Client";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {

  client: Client = null;

  constructor(
    private readonly clientService: ClientService,
    private readonly activateRoute: ActivatedRoute,
    private readonly router: Router,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.loadClient();
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
    console.log("Submit!")
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      console.log(file);
    }
  }
}
