import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Product} from "../classes/Product";
import {catchError, Observable, throwError} from "rxjs";
import {CountryResult, ProductResult} from "../../../helpers/interfaces/countries-result.interface";
import {handleError} from "../../../helpers/errorhandler.helper";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  urlBase: string = `http://localhost:8080/api/products`;

  constructor(private readonly http: HttpClient) {
  }

  searchByName(term: string): Observable<ProductResult> {
    return this.http.get<ProductResult>(`${this.urlBase}/${term}`).pipe(
      catchError((e: any) => {
        handleError(e, `ERROR: Countries not found.`);
        return throwError(() => e);
      })
    )
  }

}
