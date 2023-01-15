import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from './footer/footer.component';
import { NgforComponent } from './directives/ngfor/ngfor.component';
import { NgifComponent } from './directives/ngif/ngif.component';
import { ClientsComponent } from './main/clients/clients.component';
import { ClienteService } from "./main/clients/services/cliente.service";
import { RouterModule, Routes} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";

const routes: Routes = [
  { path: '', redirectTo: '/clients', pathMatch: 'full'},
  { path: 'clients', component: ClientsComponent},
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
    ClientsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
