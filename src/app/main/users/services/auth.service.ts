import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Authentication, Payload} from "../../../helpers/interfaces/authentication.interface";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../classes/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url_base = `http://localhost:8080/oauth/token`;

  private _user: User;
  private _token: string;

  constructor(private readonly http: HttpClient) {
  }

  public get user(): User {
    if (this._user != null) {
      return this._user;
    } else if (this._user == null && sessionStorage.getItem('user') != null) {
      this._user = JSON.parse(sessionStorage.getItem('user')) as User;
      return this._user;
    }
    return new User();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  login(user: User): Observable<Authentication> {

    const credentials = `Basic ${btoa('angular-clients-app:123123')}`;
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': credentials})

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', user.username);
    params.set('password', user.password);

    return this.http.post<Authentication>(this.url_base, params.toString(), {headers})

  }

  logout() {
    this._token = null;
    this._user = null;
    sessionStorage.clear();
  }

  saveUser(authentication: Authentication) {
    let payload = this.tokenDecode(authentication.access_token) as unknown as Payload;
    this._user = new User();
    this._user.username = payload.user_name;
    this._user.email = payload.email;
    this._user.roles = payload.authorities;
    sessionStorage.setItem('user', JSON.stringify(this._user));
  }

  saveAccessToken(authentication: Authentication) {
    this._token = authentication.access_token;
    sessionStorage.setItem('token', this._token);
  }

  tokenDecode(token: string): Payload {
    if (token != null) {
      return JSON.parse(atob(token.split(".")[1])) as Payload;
    }
    return null;
  }

  isAuthenticated(): boolean {
    let payload = this.tokenDecode(this.token) as unknown as Payload;
    return payload != null && payload.user_name && payload.user_name.length > 0;
  }

  hasRole(role: string) {
    return this.user.roles.includes(role);
  }

}
