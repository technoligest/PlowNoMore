import { Component, OnInit } from '@angular/core';
import { Customer } from '../../general.classes/Customer';
import { FormControl } from '@angular/forms';
import { Validators } from '../../general.classes/Globals';
import {
  ActivatedRoute,
  Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Invoice, Ideable, Item } from '../../general.classes';
import { Quote } from '../../general.classes/Quote';
import {
  CustomerService,
  InvoiceService } from 'src/app/services';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  private customerId = '';
  private customerInvoices: Invoice[] = new Array<Invoice>();
  private customerQuotes: Quote[] = new Array<Quote>();

  public nameValidator = new FormControl('', Validators.nameValidatorList);
  public emailValidator = new FormControl('', Validators.emailValidatorList);
  public phoneValidator = new FormControl('', Validators.phoneValidatorList);

  public get customerIsUploaded() {
    return this.customerId !== '';
  }

  constructor(private router: Router,
              private route: ActivatedRoute,
              private customerEditSnackBar: MatSnackBar,
              private customerService: CustomerService,
              private invoiceService: InvoiceService) {
  }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.pullCustomer(params['id']);
      }
    });
  }

  public saveCustomer() {
    if (!this.formIsValidated()) {
      this.customerEditSnackBar.open('Oops, do you mind checking the form?', 'ok');
    } else {
      this.customerEditSnackBar.dismiss();
      const customerToUpload: Customer = new Customer(
        this.customerId,
        this.nameValidator.value,
        this.emailValidator.value,
        this.phoneValidator.value,
        this.getIds(this.customerInvoices),
        this.getIds(this.customerQuotes)
      );
      if (this.customerIsUploaded) {
        this.customerService.updateCustomer(customerToUpload).subscribe((customer: Customer) => {
          this.customerEditSnackBar.open('Customer has been saved.', 'Yaay', {duration: 2000});
        });
      } else {
        this.customerService.saveCustomer(customerToUpload).subscribe((uploadedCustomer: Customer) => {
          this.customerId = uploadedCustomer.id;
        });
      }
    }
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
     'customerId': this.customerId
   }});
  }

  // private pullQuotes(quoteIds: string[]) {
  //   quoteIds.forEach((quoteId: string) => {
  //     // this.invoiceService.getInvoice()
  //     // const url = baseUrl + 'quote/' + quoteId;
  //     // const options = {
  //     //   observe: 'body' as 'body',
  //     //   responseType: 'json' as 'json'
  //     // };
  //     // this.httpClient.get<Quote>(url, options).subscribe((quote: Quote ) => {
  //     //   this.customerQuotes.push(quote);
  //     // });
  //   });
  // }

  private pullInvoices(invoiceIds: string[]) {
    invoiceIds.forEach((invoiceId: string) => {
      this.invoiceService.getInvoice(invoiceId).subscribe(
        (invoice: Invoice ) => {
          this.customerInvoices.push(invoice);
      });
    });
    console.log(this.customerInvoices);
  }

  private pullCustomer(id: string) {
    this.customerService.getCustomer(id).subscribe((customer: Customer) => {
      console.log(customer);
      this.customerId = customer.id;
      this.nameValidator.setValue(customer.name);
      this.emailValidator.setValue(customer.email);
      this.phoneValidator.setValue(customer.phone);
      // this.pullQuotes(customer.quoteIds);
      this.pullInvoices(customer.invoiceIds);
    });
  }

  private formIsValidated(): boolean {
    return this.nameValidator.valid && this.emailValidator.valid && this.phoneValidator.valid;
  }

  private getIds(items: Ideable[]): string[] {
    const result: string[] = [];
    items.forEach((item: Ideable) => {
      result.push(item.id);
    });
    return result;
  }

  public computeAmount(items: Item[]): number {
    let result = 0;
    items.forEach((item: Item) => {
      result += item.cost;
    });
    return result;
  }

  public formatDate(date: Date): string {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
}
