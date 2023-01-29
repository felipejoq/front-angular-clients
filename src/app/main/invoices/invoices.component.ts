import {Component, Input, OnInit} from '@angular/core';
import {Invoice} from "./classes/Invoice";
import {AuthService} from "../users/services/auth.service";

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit{

  @Input() invoices: Invoice[];

  display: boolean = false;

  constructor(readonly authService: AuthService) {}

  ngOnInit(): void {}

}
