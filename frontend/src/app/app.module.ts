import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,
         ReactiveFormsModule
        } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule,
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
import { CustomerComponent } from './components/customer.component/customer.component';
import { CustomerListComponent } from './components/customer-list.component/customer-list.component';
import { InvoiceComponent } from './components/invoice.component/invoice.component';
import { LoginPageComponent } from './components/login-page.component/login-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InvoicingMainComponent } from './components/invoicing-main/invoicing-main.component';
import { FacebookModule } from 'ngx-facebook';
import { LogoutComponent } from './components/logout/logout.component';
import { FooterComponent } from './components/footer/footer.component';
import { TokenInterceptor } from './services/interceptor';


const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'customerlist', component: CustomerListComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'customer/:id', component: CustomerComponent },
  { path: 'invoice/:id', component: InvoiceComponent },
  { path: 'invoice', component: InvoiceComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
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
    }
  ],
  bootstrap: [
    InvoicingMainComponent,
    LogoutComponent,
    FooterComponent
  ]
})
export class AppModule { }
