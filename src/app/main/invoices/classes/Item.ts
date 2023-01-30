import {Product} from "./Product";

export class Item {
  id:        number;
  cuanty:    number = 1;
  product:   Product;
  totalItem? = (): number => {
    return this.cuanty * this.product.price;
  }
}
