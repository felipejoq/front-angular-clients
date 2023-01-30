import {Injectable} from "@angular/core";
import {ClientService} from "../../clients/services/client.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Response} from "../../../helpers/interfaces/response-clients.interface";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  urlBase: string = `http://localhost:8080/api/clients`;

  constructor(
    private clientService: ClientService,
    private readonly http: HttpClient,
    private readonly router: Router) {}

  getInvoicesClient(idClient: number, page: number): Observable<Response> {
    return this.http.get<Response>(`${this.urlBase}/${idClient}/invoices/page/${page}`);
  }

}
