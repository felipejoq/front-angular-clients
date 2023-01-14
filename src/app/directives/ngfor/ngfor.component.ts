import { Component } from '@angular/core';

@Component({
  selector: 'app-ngfor',
  templateUrl: './ngfor.component.html',
  styleUrls: ['./ngfor.component.css']
})
export class NgforComponent {

  public flag: boolean = true;

  public peoples: any[] = [
    {name: 'Felipe', lastname: 'Jofré'},
    {name: 'Andrés', lastname: 'Guzman'},
    {name: 'Lorena', lastname: 'Romero'},
    {name: 'Angelica', lastname: 'Jimenez'},
  ]
}
