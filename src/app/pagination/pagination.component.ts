import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ResponseClients} from "../helpers/interfaces/clients.interface";
import { Router } from "@angular/router";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {

  @Input() paginator: ResponseClients | undefined;

  pages: number[];

  from: number;
  until: number;

  constructor(private readonly router: Router) {
  }

  ngOnInit() {
    this.buildPagesArray();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['paginator'].previousValue){
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
