import { Component } from '@angular/core';

@Component({
  selector: 'app-ngif',
  templateUrl: './ngif.component.html',
  styleUrls: ['./ngif.component.css']
})
export class NgifComponent {

  flag: boolean = true;

  hide(): boolean {
    return this.flag ? this.flag = false : this.flag = true;
  }
}
