import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, throwError} from "rxjs";
import {handleError} from "../../../helpers/errorhandler.helper";
import {Country} from "../../../helpers/interfaces/countries-result.interface";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private urlDefault: string = `http://localhost:8080/api/countries`;

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router) { }

  getCountries(term:string) {
    return this.http.get<Country>(`${this.urlDefault}/${term}`).pipe(
      catchError((e: any) => {
        handleError(e, `ERROR: Countries not found.`);

        return throwError(() => e);
      })
    )
  }
}
