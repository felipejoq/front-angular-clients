import {Component, OnInit} from '@angular/core';
import {User} from "./classes/User";
import {MODAL, typeIcon} from "../../helpers/swal.helper";
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import {Payload} from "../../helpers/interfaces/authentication.interface";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  titutlo: string = "Sign In";

  user: User;

  constructor(
    private readonly authService: AuthService,
    private readonly route: Router
  ) {
    this.user = new User();
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()){
      MODAL.swalGeneric(`Info: ${this.authService.user.username} usted ya se encuentra autenticado.`, "Ya está Logeado", typeIcon.INFO);
      this.route.navigate(['/clients']);
    }

  }

  login(): void {
    if (this.user.username == null || this.user.password == null) {
      MODAL.swalError("Error en el formulario", "Todos los campos son necesarios.", typeIcon.WARNING)
      return;
    }
    this.authService.login(this.user).subscribe(auth => {
        this.authService.saveUser(auth);
        this.authService.saveAccessToken(auth);

        let user = this.authService.user;

        this.route.navigate(['/clients']);
        MODAL.swalGeneric("Has iniciado sesión correctamente.", `Bienvenido(a) ${user.username}`, typeIcon.SUCCESS);
      },
      error => {
        if(error.status == 400) {
          MODAL.swalError("Error en el formulario", "Credenciales Incorrectas, vuelva a intentarlo.", typeIcon.ERROR)
        }
      }
    )
  }



}
