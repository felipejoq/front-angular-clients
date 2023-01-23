import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from './footer/footer.component';
import { NgforComponent } from './directives/ngfor/ngfor.component';
import { NgifComponent } from './directives/ngif/ngif.component';
import { ClientsComponent } from './main/clients/clients.component';
import { ClientService } from "./main/clients/services/client.service";
import { RouterModule, Routes} from "@angular/router";
import { HttpClientModule} from "@angular/common/http";
import { FormComponent } from './main/clients/form/form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {registerLocaleData} from "@angular/common";
import localeEsCl from "@angular/common/locales/es-CL";
import { PaginationComponent } from './pagination/pagination.component';
import { ClientProfileComponent } from './main/clients/client-profile/client-profile.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AutoCompleteModule} from "primeng/autocomplete";
import {CountryService} from "./main/country/services/country.service";
import { GetFlagPipe } from './pipes/get-flag.pipe';
import {CalendarModule} from "primeng/calendar";
import {InputTextModule} from "primeng/inputtext";

registerLocaleData(localeEsCl, 'es')

const routes: Routes = [
  { path: '', redirectTo: '/clients', pathMatch: 'full'},
  { path: 'clients', component: ClientsComponent},
  { path: 'clients/page/:page', component: ClientsComponent},
  { path: 'clients/form', component: FormComponent},
  { path: 'clients/form/:id', component: FormComponent},
  { path: 'clients/profile/:id', component: ClientProfileComponent},
  { path: 'clients/profile', redirectTo: '/clients'},
  { path: 'ngif', component: NgifComponent },
  { path: 'ngfor', component: NgforComponent },
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
    GetFlagPipe
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
  ],
  providers: [
    ClientService,
    CountryService,
    { provide: LOCALE_ID, useValue: 'es-CL' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
