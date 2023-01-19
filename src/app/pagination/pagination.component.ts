import {Component, Input} from '@angular/core';
import {ResponseClients} from "../helpers/interfaces/client.helper.interface";
import { Router } from "@angular/router";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  @Input() paginator: ResponseClients | undefined;

  pages: number[];

  constructor(private readonly router: Router) {
  }

  ngOnInit() {
    this.pages = new Array(this.paginator?.totalPages)
      .fill(0)
      .map((value, index) => index + 1);
  }

}
