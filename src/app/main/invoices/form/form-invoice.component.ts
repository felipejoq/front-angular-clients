import {Component, Input, OnInit} from '@angular/core';
import {Client} from "../../clients/classes/Client";
import {Invoice} from "../classes/Invoice";
import {Product} from "../classes/Product";
import {ProductService} from "../services/product.service";
import {Item} from "../classes/Item";
import {ActivatedRoute} from "@angular/router";
import {ClientService} from "../../clients/services/client.service";
import {MODAL, typeIcon} from "../../../helpers/swal.helper";
import {Location} from "@angular/common";

@Component({
  selector: 'app-form',
  templateUrl: './form-invoice.component.html',
  styleUrls: ['./form-invoice.component.css']
})
export class FormInvoiceComponent implements OnInit {

  @Input() client: Client = new Client();

  invoice: Invoice = new Invoice();

  products: Product[];

  selectedValue: any;

  constructor(
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
    let itemInList = this.invoice.items.find(item => item.product.id == product.id );
    if(!itemInList) {
      this.invoice.items.push(item);
    } else {
      itemInList.cuanty += 1;
    }
    this.selectedValue = {};
  }

  deleteItem(itemDel: Item) {
    this.invoice.items = this.invoice.items.filter(item => item != itemDel);
    if(this.invoice.items.length <= 0) {
      this.invoice.items = [];
    }
  }

  modifyQty(item: Item, event: any) {
    return event.target.value <= 0 ? this.deleteItem(item) : item.cuanty = +event.target.value;
  }

  createInvoice() {
    console.log(this.invoice);
  }

  loadClient(): void {
    this.activateRoute.params.subscribe(params => {
      const {id} = params;

      if (id) {
        this.clientService.getClient(id)
          .subscribe(client => {
            this.client = client;
            this.invoice.client = client;
          });
      }else{
        this.location.back();
        MODAL.swalClient('Para crear una factura debe seleccionar un cliente.', 'Error al crear factura', typeIcon.ERROR);
      }
    });
  }
}
