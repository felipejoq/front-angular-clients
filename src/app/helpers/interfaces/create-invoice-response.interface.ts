import {Invoice} from "../../main/invoices/classes/Invoice";

export interface InvoiceResponse {
  invoice: Invoice;
  ok:      boolean;
  message: string;
}
