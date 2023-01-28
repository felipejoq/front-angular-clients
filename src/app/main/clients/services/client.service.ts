import {Injectable} from '@angular/core';
import {Client} from '../classes/Client';
import {catchError, Observable, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {handleError} from "../../../helpers/errorhandler.helper";
import {ResponseClients} from "../../../helpers/interfaces/response-clients.interface";
import {AuthService} from "../../users/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private urlDefault: string = `http://localhost:8080/api/clients`;

  constructor(
    private readonly authService: AuthService,
    private readonly http: HttpClient,
    ) {
  }

  // getClientsPipe(page: number): Observable<ResponseClients> {
  //   return this.http.get<any>(`${this.urlDefault}/page/${page}`).pipe(
  //     catchError((e: any) => {
  //       this.isNotAuth.isAuth(e);
  //       handleError(e, `ERROR OBTENIENDO LOS CLIENTES`);
  //       return throwError(() => e);
  //     })
  //   )
  // }


  getClients(page: number): Observable<ResponseClients> {
    // return of(CLIENTES);
    // return this.http.get(`${ this.urlDefault }/clients`)
    //  .pipe(map( response => response as Client[]));
    return this.http.get<ResponseClients>(`${this.urlDefault}/page/${page}`);
    /*.pipe(
      map((resp) => {
        let clients = resp as Client[];
        return clients.map((client: Client) => {
          // client.createAt = formatDate(Date.parse(client.createAt), 'EEEE dd, MMMM YYYY', 'en-US')
          // let datePipe = new DatePipe('es')
          // client.createAt = datePipe.transform(client.createAt, 'EEEE dd, MMMM YYYY');
          return client;
        });
      })
    );*/
  }

  getClient(id: any): Observable<Client> {
    return this.http.get<Client>(`${this.urlDefault}/${id}`).pipe(
      catchError((e: any) => {
        handleError(e, `El cliente con ID: ${id} no existe!`);
        return throwError(() => e);
      })
    );
  }

  postClient(client: Client): Observable<any> {
    return this.http.post(`${this.urlDefault}`, client)
      .pipe(
        //map( (resp:any) => resp.client as Client),
        catchError((e: any) => {
          handleError(e, `El cliente no se pudo crear!`);
          return throwError(() => e);
        })
      )

  }

  updateClient(client: Client): Observable<any> {
    return this.http.put<any>(`${this.urlDefault}/${client.id}`, client).pipe(
      catchError((e: any) => {
        handleError(e);
        return throwError(() => e);
      })
    )
  }

  deleteClient(id: any): Observable<Client> {
    return this.http.delete<Client>(`${this.urlDefault}/${id}`).pipe(
      catchError((e: any) => {
        handleError(e);
        return throwError(() => e);
      })
    )
  }

  uploadPhoto(photo: File, id): Observable<any> {

    let formData = new FormData();
    formData.append('photo', photo);
    formData.append('id', id);

    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    if (token != null) {
      httpHeaders = httpHeaders.append('Authorization', `Bearer ${token}`)
    }

    return this.http.post(`${this.urlDefault}/photo/upload`, formData, {headers: httpHeaders}).pipe(
      catchError((e: any) => {
        handleError(e);
        return throwError(() => e);
      })
    )
  }
}
