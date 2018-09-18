import { Component, OnInit } from '@angular/core';
import { Customer } from '../general.classes/Customer';
import { FormControl } from '@angular/forms';
import { Validators } from '../general.classes/Globals';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { baseUrl } from '../general.classes/Globals';
import { MatSnackBar } from '@angular/material';
import { Invoice } from '../general.classes/Invoice';
import { Quote } from '../general.classes/Quote';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  private customer: Customer = new Customer('', '', '', '', [], []);
  private customerInvoices: Invoice[] = new Array<Invoice>();
  private customerQuotes: Quote[] = new Array<Quote>();

  public nameValidator = new FormControl('', Validators.nameValidatorList);
  public emailValidator = new FormControl('', Validators.emailValidatorList);
  public phoneValidator = new FormControl('', Validators.phoneValidatorList);

  public customerIsUploaded = false;

  constructor(private router: Router,
              private httpClient: HttpClient,
              private route: ActivatedRoute,
              private customerEditSnackBar: MatSnackBar) {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.pullCustomer(params['id']);
      }
    });
  }
  ngOnInit() {
  }

  public saveCustomer() {
    if (!this.formIsValidated()) {
      this.customerEditSnackBar.open('Oops, do you mind checking the form?', 'ok');
      return;
    }
    this.customerEditSnackBar.dismiss();
    this.customer.name = this.nameValidator.value;
    this.customer.email = this.emailValidator.value;
    this.customer.phone = this.phoneValidator.value;
    const url = baseUrl + 'addCustomer/';
    this.httpClient.post(url, this.customer).subscribe();
    this.customerIsUploaded = true;
  }

  public onFormCancel() {
    this.customerEditSnackBar.dismiss();
    this.router.navigate(['customerlist']);
  }

  public routeToInvoice(invoiceId: string) {
    this.router.navigate(['invoice/' + invoiceId]);
  }

  public routeToQuote(quoteId: string) {
    this.router.navigate(['quote/' + quoteId]);
  }

  public addNewInvoice() {
   this.router.navigate(['invoice'], {queryParams: {
     'customerId': this.customer.id
   }});
  }

  private pullQuotes() {
    this.customer.quoteIds.forEach((quoteId: string) => {
      const url = baseUrl + 'quote/' + quoteId;
      const options = {
        observe: 'body' as 'body',
        responseType: 'json' as 'json'
      };
      this.httpClient.get<Quote>(url, options).subscribe((quote: Quote ) => {
        this.customerQuotes.push(quote);
      });
    });
  }

  private pullInvoices() {
    console.log("There");
    this.customer.invoiceIds.forEach((invoiceId: string) => {
      const url = baseUrl + 'invoice/' + invoiceId;
      const options = {
        observe: 'body' as 'body',
        responseType: 'json' as 'json'
      };
      this.httpClient.get<Invoice>(url, options).subscribe((invoice: Invoice ) => {
        this.customerInvoices.push(invoice);
      });
      console.log(this.customerInvoices);
    });
  }

  private pullCustomer(id: String) {
    const url = baseUrl + 'customer/' + id;
    const options = {
      observe: 'body' as 'body',
      responseType: 'json' as 'json'
    };
    this.httpClient.get<Customer>(url, options).subscribe((customer: Customer) => {
      this.customer = customer;
      this.nameValidator.setValue(customer.name);
      this.emailValidator.setValue(customer.email);
      this.phoneValidator.setValue(customer.phone);
      this.pullQuotes();
      this.pullInvoices();
      console.log("HERE.");
      this.customerIsUploaded = true;
    });
  }

  private formIsValidated(): boolean {
    return this.nameValidator.valid && this.emailValidator.valid && this.phoneValidator.valid;
  }
}
