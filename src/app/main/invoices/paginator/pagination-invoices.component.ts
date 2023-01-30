import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Response} from "../../../helpers/interfaces/response-clients.interface";
import { Router } from "@angular/router";
import {Client} from "../../clients/classes/Client";

@Component({
  selector: 'app-pagination-invoices',
  templateUrl: './pagination-invoices.component.html',
  styleUrls: ['./pagination-invoices.component.css']
})
export class PaginationInvoicesComponent implements OnChanges {

  @Input() paginator: Response | undefined;

  @Input() client: Client;

  pages: number[];

  from: number;

  until: number;

  constructor(private readonly router: Router) {
  }

  ngOnInit() {
    this.buildPagesArray();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['client'] || changes['paginator']){
      this.buildPagesArray();
    }
  }

  buildPagesArray(): void {
    this.from = Math.min(
      Math.max(1, this.paginator.number - 4),
      this.paginator.totalPages - 5
    );

    this.until = Math.max(
      Math.min(this.paginator.totalPages, this.paginator.number + 4),
      6
    );

    if(this.paginator.totalPages > 5){

      this.pages = new Array(this.until - this.from + 1)
        .fill(0)
        .map((value, index) => index + this.from);

    } else {
      this.pages = new Array(this.paginator?.totalPages)
        .fill(0)
        .map((value, index) => index + 1);
    }
  }

}
