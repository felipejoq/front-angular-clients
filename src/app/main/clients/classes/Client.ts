import {Country} from "../../country/classes/Country";
import {Invoice} from "../../invoices/classes/Invoice";

export class Client {
  id:       number;
  name:     string;
  lastName: string;
  email:    string;
  imgUrl:   null;
  country:  Country;
  invoices: Invoice[];
  createAt: Date;
}
