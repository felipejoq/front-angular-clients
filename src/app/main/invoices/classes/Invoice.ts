import {Item} from "./Item";

export class Invoice {
  id:             number;
  description:    string;
  observation:    string;
  createAt:       Date;
  items:          Item[];
  totalAmountDue: number;
}
