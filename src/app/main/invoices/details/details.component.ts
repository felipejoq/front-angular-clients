import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Invoice} from "../classes/Invoice";
import {InvoiceService} from "../services/invoice.service";

@Component({
  selector: 'app-invoice-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnChanges{

  @Input() invoice: Invoice;

  constructor(private readonly invoiceService: InvoiceService) {
  }

  ngOnInit(): void {

    this.loadInvoice();

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['invoice'].currentValue) {
      this.loadInvoice();
    }
  }

  loadInvoice() {
    if(this.invoice){
      this.invoiceService.getInvoice(this.invoice.id).subscribe(resp => {
        this.invoice = resp.invoice;
      });
    }
  }
}
