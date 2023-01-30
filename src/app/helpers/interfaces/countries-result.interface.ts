import {Product} from "../../main/invoices/classes/Product";
import {Country} from "../../main/country/classes/Country";

export interface CountryResult {
  countries: Country[];
  ok:        boolean;
  message:   string;
}

export interface ProductResult {
  products: Product[];
  ok:        boolean;
  message:   string;
}
