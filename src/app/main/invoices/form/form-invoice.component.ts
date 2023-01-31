import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Client} from "../../clients/classes/Client";
import {Invoice} from "../classes/Invoice";
import {Product} from "../classes/Product";
import {ProductService} from "../services/product.service";
import {Item} from "../classes/Item";
import {ActivatedRoute} from "@angular/router";
import {ClientService} from "../../clients/services/client.service";
import {MODAL, typeIcon} from "../../../helpers/swal.helper";
import {Location} from "@angular/common";
import {InvoiceService} from "../services/invoice.service";

@Component({
  selector: 'app-form-invoice',
  templateUrl: './form-invoice.component.html',
  styleUrls: ['./form-invoice.component.css']
})
export class FormInvoiceComponent implements OnInit, OnChanges {

  @Input() client: Client = new Client();

  invoice: Invoice = new Invoice();

  products: Product[];

  selectedValue: any;
  noItems: boolean = true;

  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly productService: ProductService,
    private readonly activateRoute: ActivatedRoute,
    private readonly clientService: ClientService,
    private readonly location: Location) {
  }

  ngOnInit(): void {
    this.loadClient();
    this.invoice.items = [];
  }


  search(event: any) {
    this.productService.searchByName(event.query).subscribe(resp => {
      this.products = resp.products;
    })
  }

  handleSelected(product: Product) {
    let item: Item = new Item();
    item.product = product;
    let itemInList = this.invoice.items.find(item => item.product.id == product.id);
    if (!itemInList) {
      this.invoice.items.push(item);
      this.noItems = false;
    } else {
      itemInList.cuanty += 1;
    }
    this.selectedValue = {};
  }

  deleteItem(itemDel: Item) {
    this.invoice.items = this.invoice.items.filter(item => item != itemDel);
    if (this.invoice.items.length <= 0) {
      this.invoice.items = [];
      this.noItems = !this.noItems;
    }
  }

  modifyQty(item: Item, event: any) {
    return event.target.value <= 0 ? this.deleteItem(item) : item.cuanty = +event.target.value;
  }

  createInvoice() {
      this.invoiceService.postInvoice(this.invoice).subscribe(resp => {
        this.location.back();
        if(resp){
          MODAL.swalGeneric(
            `La factura para el cliente: ${resp.invoice.client.name} ${resp.invoice.client.lastName} fue creada con éxito!`,
            `Factura creada`,
            typeIcon.SUCCESS);
        }
      });
  }

  loadClient(): void {
    this.activateRoute.params.subscribe(params => {
      const {id} = params;

      if (id) {
        this.clientService.getClient(id)
          .subscribe(client => {
            if(!client) {
              this.location.back();
              MODAL.swalGeneric('Para crear una factura debe seleccionar un cliente.', 'Error al crear factura', typeIcon.ERROR);
            }
            this.client = client;
            this.invoice.client = client;
          });
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['client'].currentValue) {
      this.invoice.client = this.client;
    }
  }
}
