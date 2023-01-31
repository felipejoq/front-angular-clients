import {Item} from "./Item";
import {Client} from "../../clients/classes/Client";

export class Invoice {
  id?:             number;
  description:    string;
  observation:    string;
  client: Client;
  items:          Item[];
  createAt?:       Date;

  totalAmountDue: number;

  calculateTotalAmountDue = ():number => {
    let totalAmount:number = 0;
    if(this.items) {
      this.items.forEach(item => totalAmount += item.calculateTotalItem());
      return totalAmount;
    }
    return totalAmount;
  }
}
