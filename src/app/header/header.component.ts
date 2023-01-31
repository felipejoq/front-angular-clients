import {Component} from "@angular/core";
import {AuthService} from "../main/users/services/auth.service";
import {MODAL, typeIcon} from "../helpers/swal.helper";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  titulo: string = "Clientes App"

  constructor(
    readonly authService: AuthService,
    private readonly router: Router) {
  }

  logout() {
    this.authService.logout();
    MODAL.swalGeneric('¡Hasta la próxima, nos vemos!', 'Todo bien.', typeIcon.SUCCESS);
    this.router.navigate(['/login'])
  }
}
