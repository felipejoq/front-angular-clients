import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {MODAL, typeIcon} from "../../../helpers/swal.helper";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let role = route.data['role'] as string;

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login'])
      return false;
    }

    if (this.authService.hasRole(role)) {
      return true;
    }

    MODAL.swalClient('Lo sentimos, usted no tiene acceso a esta acción o recurso.', 'Sin autorización.', typeIcon.WARNING);
    this.router.navigate(['/clients'])

    return false;
  }

}
