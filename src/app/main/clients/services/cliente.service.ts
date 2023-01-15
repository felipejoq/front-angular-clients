import { Injectable } from '@angular/core';
import { Client } from '../classes/Client';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlDefault: string = `http://localhost:8080/api`;
  constructor(private readonly http: HttpClient) { }

  getClients(): Observable<Client[]> {
    // return of(CLIENTES);
    // return this.http.get(`${ this.urlDefault }/clients`)
    //  .pipe(map( response => response as Client[]));
    return this.http.get<Client[]>(`${ this.urlDefault }/clients`);
  }
}
