import { Injectable } from '@angular/core';
import { Client } from '../classes/Client';
import { Observable } from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlDefault: string = `http://localhost:8080/api/clients`;

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private readonly http: HttpClient) { }

  getClients(): Observable<Client[]> {
    // return of(CLIENTES);
    // return this.http.get(`${ this.urlDefault }/clients`)
    //  .pipe(map( response => response as Client[]));
    return this.http.get<Client[]>(`${ this.urlDefault }`);
  }

  getClient(id: any): Observable<Client> {
    return this.http.get<Client>(`${ this.urlDefault }/${id}`);
  }

  postClient(client : Client): Observable<Client> {
    return this.http.post<Client>(`${ this.urlDefault }`, client, { headers: this.httpHeaders });
  }

  updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(`${ this.urlDefault }/${client.id}`, client, { headers: this.httpHeaders})
  }

  deleteClient(id: any): Observable<Client> {
    return this.http.delete<Client>(`${this.urlDefault}/${id}`, { headers: this.httpHeaders})
  }
}
