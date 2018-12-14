import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
  MatGridListModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatListModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSnackBarModule
} from '@angular/material';
import {
  CustomerComponent,
  CustomerListComponent,
  InvoiceComponent,
  LoginPageComponent,
  InvoicingMainComponent,
  LogoutComponent,
  FooterComponent
} from './components';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FacebookModule } from 'ngx-facebook';
import { TokenInterceptor } from './services/interceptor';


import {
  AuthorizedGuard,
  AnonymousGuard
} from './guards';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [ AnonymousGuard ]
  },
  {
    path: 'customerlist',
    component: CustomerListComponent,
    canActivate: [ AuthorizedGuard ]
  },
  {
    path: 'customer',
    component: CustomerComponent,
    canActivate: [ AuthorizedGuard ]
  },
  {
    path: 'customer/:id',
    component: CustomerComponent,
    canActivate: [ AuthorizedGuard ]
  },
  {
    path: 'invoice/:id',
    component: InvoiceComponent,
    canActivate: [ AuthorizedGuard ]
  },
  {
    path: 'invoice',
    component: InvoiceComponent,
    canActivate: [ AuthorizedGuard ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    CustomerComponent,
    CustomerListComponent,
    InvoiceComponent,
    LoginPageComponent,
    InvoicingMainComponent,
    LogoutComponent,
    FooterComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    FacebookModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FontAwesomeModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatListModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AnonymousGuard,
    AuthorizedGuard
  ],
  bootstrap: [
    InvoicingMainComponent,
    LogoutComponent,
    FooterComponent
  ]
})
export class AppModule { }
