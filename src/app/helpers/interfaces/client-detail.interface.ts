import {Country} from "../../main/country/classes/Country";
import {Invoice} from "../../main/invoices/classes/Invoice";

export interface Client {
  id:       number;
  name:     string;
  lastName: string;
  email:    string;
  imgUrl:   null;
  country:  Country;
  invoices: Invoice[];
  createAt: Date;
}






