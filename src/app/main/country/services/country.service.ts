import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, throwError} from "rxjs";
import {handleError} from "../../../helpers/errorhandler.helper";
import {CountryResult} from "../../../helpers/interfaces/countries-result.interface";
import {IsAuthorizedHelper} from "../../../helpers/is-authorized.helper";
import {ClientService} from "../../clients/services/client.service";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private urlDefault: string = `http://localhost:8080/api/countries`;

  constructor(
    private clientService: ClientService,
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly isNoAuth: IsAuthorizedHelper) { }

  getCountries(term:string) {
    return this.http.get<CountryResult>(`${this.urlDefault}/${term}`).pipe(
      catchError((e: any) => {
        this.isNoAuth.isAuth(e)
        handleError(e, `ERROR: Countries not found.`);
        return throwError(() => e);
      })
    )
  }
}
