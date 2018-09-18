import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,
         ReactiveFormsModule
        } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { UserFeedComponent } from './userfeed.component/userfeed.component';
import { NavbarComponent } from './navbar.component/navbar.component';
import { SignupFormComponent } from './signupForm.component/signupForm.component';

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
import { CustomerComponent } from './customer/customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { SeparatorComponent } from './separator/separator.component';
import { InvoicingMainComponent } from './invoicing-main/invoicing-main.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NewItemComponent } from './new-item/new-item.component';
import { HttpClientModule } from '@angular/common/http';
import { TestAppComponent } from './app.component/app.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'customerlist', component: CustomerListComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'customer/:id', component: CustomerComponent },
  { path: 'invoice/:id', component: InvoiceComponent },
  { path: 'invoice', component: InvoiceComponent },
  // { path: 'quote/:id', component: }
  { path: 'newitem', component: NewItemComponent },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    UserFeedComponent,
    NavbarComponent,
    UserFeedComponent,
    SignupFormComponent,
    CustomerComponent,
    CustomerListComponent,
    InvoiceComponent,
    SeparatorComponent,
    InvoicingMainComponent,
    LoginPageComponent,
    NewItemComponent,
    NewItemComponent,
    TestAppComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
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
  providers: [],
  bootstrap: [
    InvoicingMainComponent
  ]
})
export class AppModule { }
