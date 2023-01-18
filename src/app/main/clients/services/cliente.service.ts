import {Injectable} from '@angular/core';
import {Client} from '../classes/Client';
import {catchError, Observable, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {handleError} from "../../../helpers/errorhandler.helper";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlDefault: string = `http://localhost:8080/api/clients`;

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router) {
  }

  getClients(): Observable<Client[]> {
    // return of(CLIENTES);
    // return this.http.get(`${ this.urlDefault }/clients`)
    //  .pipe(map( response => response as Client[]));
    return this.http.get<Client[]>(`${this.urlDefault}`);
  }

  getClient(id: any): Observable<Client> {
    return this.http.get<Client>(`${this.urlDefault}/${id}`).pipe(
      catchError((e: any) => {
        this.router.navigate(['/clients']);

        handleError(e, `El cliente con ID: ${id} no existe!`);

        return throwError(() => e);
      })
    );
  }

  postClient(client: Client): Observable<any> {
    return this.http.post(`${this.urlDefault}`, client, {headers: this.httpHeaders})
      .pipe(
        //map( (resp:any) => resp.client as Client),
        catchError((e: any) => {
          handleError(e, `El cliente no se pudo crear!`);
          return throwError(() => e);
        })
      )

  }

  updateClient(client: Client): Observable<any> {
    return this.http.put<any>(`${this.urlDefault}/${client.id}`, client, {headers: this.httpHeaders}).pipe(
      catchError((e: any) => {
        handleError(e);
        return throwError(() => e);
      })
    )
  }

  deleteClient(id: any): Observable<Client> {
    return this.http.delete<Client>(`${this.urlDefault}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError((e: any) => {
        handleError(e);
        return throwError(() => e);
      })
    )
  }
}
