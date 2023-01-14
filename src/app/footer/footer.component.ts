import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  nombre: string = 'Felipe'
  apellido: string = 'JQ'
  public credits: string = `${this.nombre} ${this.apellido}`;
}
