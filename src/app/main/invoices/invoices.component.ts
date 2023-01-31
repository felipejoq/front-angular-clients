import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Invoice} from "./classes/Invoice";
import {AuthService} from "../users/services/auth.service";
import {Response} from "../../helpers/interfaces/response-clients.interface";
import {InvoiceService} from "./services/invoice.service";
import {Client} from "../clients/classes/Client";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit, OnChanges {

  @Input() invoices: Invoice[];

  @Input() client: Client;

  @Input() hiddenPaginator: boolean;

  display: boolean = false;
  @Input() paginator: Response | undefined;

  message: string = `See all invoices`;
  detailsInvoiceModal: boolean = false;

  invoiceSelected: Invoice;

  constructor(
    readonly authService: AuthService,
    private readonly invoiceService: InvoiceService,
    private readonly activateRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.setValuesGenerate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setValuesGenerate();
  }

  setValuesGenerate() {
    // console.log(this.client)
    // if(this.client) {
    //   this.invoiceService.getInvoicesClient(this.client.id, 0).subscribe(response => {
    //     this.invoices = response.content;
    //     this.paginator = response;
    //   })
    // }
    this.activateRoute.paramMap.subscribe(params => {
      let page: number = params.get("page") ? +params.get("page") : 0;
      if(this.client){
        this.invoiceService.getInvoicesClient(this.client.id, page).subscribe(response => {
            this.paginator = response;

            this.invoices = response.content;
          }
        );
      }
    });
  }


  showInvoiceModal(invoice: Invoice) {
    this.detailsInvoiceModal = !this.detailsInvoiceModal;
    this.invoiceSelected = invoice;
  }
}
