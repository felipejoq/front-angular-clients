import {Router} from "@angular/router";
import {MODAL, typeIcon} from "./swal.helper";
import {AuthService} from "../main/users/services/auth.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class IsAuthorizedHelper {

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService) {
  }

  isAuth(e: any): boolean {
    if (e.status == 401) {
      if(this.authService.isAuthenticated()) {
        this.authService.logout();
      }
      this.router.navigate(['/login']);
      return true;
    }

    if (e.status == 403) {
      MODAL.swalClient('Lo sentimos, usted no tiene acceso a esta acción o recurso.', 'Sin autorización.', typeIcon.WARNING);
      this.router.navigate(['/clients'])
    }

    return false;
  }

}
