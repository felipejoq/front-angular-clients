import {NgModule, LOCALE_ID} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from './footer/footer.component';
import {NgforComponent} from './directives/ngfor/ngfor.component';
import {NgifComponent} from './directives/ngif/ngif.component';
import {ClientsComponent} from './main/clients/clients.component';
import {ClientService} from "./main/clients/services/client.service";
import {RouterModule, Routes} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormComponent} from './main/clients/form/form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {registerLocaleData} from "@angular/common";
import localeEsCl from "@angular/common/locales/es-CL";
import {PaginationComponent} from './main/clients/pagination/pagination.component';
import {ClientProfileComponent} from './main/clients/client-profile/client-profile.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AutoCompleteModule} from "primeng/autocomplete";
import {CountryService} from "./main/country/services/country.service";
import {GetFlagPipe} from './pipes/get-flag.pipe';
import {CalendarModule} from "primeng/calendar";
import {InputTextModule} from "primeng/inputtext";
import {LoginComponent} from './main/users/login.component';
import {AuthService} from "./main/users/services/auth.service";
import {IsAuthorizedHelper} from "./helpers/is-authorized.helper";
import {AuthGuard} from "./main/users/guards/auth.guard";
import {RoleGuard} from "./main/users/guards/role.guard";
import {HeadersInterceptor} from "./main/users/interceptors/headers.interceptor";
import {UnauthorizedInterceptor} from "./main/users/interceptors/unauthorized.interceptor";
import { InvoicesComponent } from './main/invoices/invoices.component';
import {DialogModule} from "primeng/dialog";
import {PaginationInvoicesComponent} from "./main/invoices/paginator/pagination-invoices.component";
import {FormInvoiceComponent} from "./main/invoices/form/form-invoice.component";
import {ProductService} from "./main/invoices/services/product.service";

registerLocaleData(localeEsCl, 'es')

const routes: Routes = [
  {path: '', redirectTo: '/clients', pathMatch: 'full'},
  {path: 'clients', component: ClientsComponent},
  {path: 'clients/page/:page', component: ClientsComponent},
  {path: 'clients/form', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_SELLER'}},
  {
    path: 'clients/form/:id',
    component: FormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {role: 'ROLE_ADMIN'}},
  {path: 'clients/profile/:id/page/:page', component: ClientProfileComponent},
  {
    path: 'clients/profile/:id',
    component: ClientProfileComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {role: 'ROLE_USER'}
  },
  {path: 'clients/profile', redirectTo: '/clients'},
  {path: 'clients/:id/invoice', component: FormInvoiceComponent},
  {path: 'login', component: LoginComponent},
  {path: 'ngif', component: NgifComponent},
  {path: 'ngfor', component: NgforComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NgforComponent,
    NgifComponent,
    ClientsComponent,
    FormComponent,
    PaginationComponent,
    ClientProfileComponent,
    GetFlagPipe,
    LoginComponent,
    InvoicesComponent,
    FormInvoiceComponent,
    PaginationInvoicesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    AutoCompleteModule,
    CalendarModule,
    InputTextModule,
    DialogModule,
  ],
  providers: [
    ClientService,
    CountryService,
    AuthService,
    IsAuthorizedHelper,
    ProductService,
    {provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true},
    {provide: LOCALE_ID, useValue: 'es-CL'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
