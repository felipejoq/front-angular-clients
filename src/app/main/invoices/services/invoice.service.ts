import {Injectable} from "@angular/core";
import {ClientService} from "../../clients/services/client.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, Observable, throwError} from "rxjs";
import {Response} from "../../../helpers/interfaces/response-clients.interface";
import {Invoice} from "../classes/Invoice";
import {handleError} from "../../../helpers/errorhandler.helper";
import {InvoiceResponse} from "../../../helpers/interfaces/create-invoice-response.interface";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  urlBase: string = `http://localhost:8080/api/clients`;

  constructor(
    private clientService: ClientService,
    private readonly http: HttpClient,
    private readonly router: Router) {
  }

  getInvoicesClient(idClient: number, page: number): Observable<Response> {
    return this.http.get<Response>(`${this.urlBase}/${idClient}/invoices/page/${page}`).pipe(
      catchError((e: any) => {
        handleError(e, `Ocurrió un error al obtener las facturas!`);
        return throwError(() => e);
      })
    );
  }

  getInvoice(invoiceId: number): Observable<InvoiceResponse> {
    return this.http.get<InvoiceResponse>(`${this.urlBase}/invoices/${invoiceId}`).pipe(
      catchError((e: any) => {
        handleError(e, `Ocurrió un error al obtener la factura con ID: ${invoiceId}`);
        return throwError(() => e);
      })
    );
  }

  postInvoice(invoice: Invoice): Observable<InvoiceResponse> {
    return this.http.post<InvoiceResponse>(`${this.urlBase}/invoices`, invoice).pipe(
      catchError((e: any) => {
        handleError(e, `Ocurrió un error al crear la factura.`);
        return throwError(() => e);
      })
    );
  }

  deleteInvoice(invoiceId: number): Observable<InvoiceResponse> {
    return this.http.delete<InvoiceResponse>(`${this.urlBase}/invoices/${invoiceId}`).pipe(
      catchError((e: any) => {
        handleError(e, `Ocurrió un error al eliminar la factura con ID: ${invoiceId}`);
        return throwError(() => e);
      })
    );
  }

}
