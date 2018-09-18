import { Component, OnInit } from '@angular/core';
import { Invoice } from '../general.classes/Invoice';
import { FormControl } from '@angular/forms';
import { Validators, baseUrl } from '../general.classes/Globals';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../general.classes/Customer';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  public invoiceDateValidator = new FormControl('', Validators.dateValidatorList);

  public newItemCostValidator = new FormControl('', Validators.costValidatorList);
  public newItemDescriptionValidator = new FormControl('', Validators.nameValidatorList);


  public invoice: Invoice = new Invoice('', new Date(''), '', [], false, false);
  public customerName = '';



  constructor(private route: ActivatedRoute,
              private httpClient: HttpClient,
              private router: Router,
              public snackBar: MatSnackBar) {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.pullInvoice(params['id']);
      } else {
        this.route.queryParams.subscribe((queryParams) => {
          if (queryParams['customerId']) {
            this.invoice.customerId = queryParams['customerId'];
            this.pullCustomerName();
          } else {
            this.snackBar.open('Invoice routing Error! Contact Yaser.', 'ok');
            this.router.navigate(['home']);
          }
        });
      }
    });
  }

  ngOnInit() {
  }

  public onFormCancel() {
    this.router.navigate(['customer/' + this.invoice.customerId]);
  }

  public saveForm() {
    if (this.invoiceFormIsValidated()) {
      this.invoice.date = this.invoiceDateValidator.value;
      const url = baseUrl + 'addInvoice';
      this.httpClient.post(url, this.invoice).subscribe();
    } else {
      this.snackBar.open('Please input date.', 'Ok', {duration: 2000});
    }
  }

  public sendEmail() {
    if (this.invoiceFormIsValidated()) {
      this.saveForm();
      const url = baseUrl + 'sendInvoiceEmail';
      this.httpClient.post(url, this.invoice.id).subscribe();
    } else {
      this.snackBar.open('Please input date.', 'Ok', {duration: 2000});
    }
  }

  public addNewItem() {
    if (this.addNewItemFormIsValid()) {
      this.invoice.items.push({
        description: this.newItemDescriptionValidator.value,
        cost: this.newItemCostValidator.value
      });
      this.snackBar.open('Item has been added!', 'Yaay', {duration: 5000});
      //TODO: Reseting is keepingthe inputs red.
      this.newItemCostValidator.reset();
      this.newItemDescriptionValidator.reset();
    } else {
      this.snackBar.open('Please add new item information.', 'Ok', {duration: 2000});
    }
  }

  private pullCustomerName() {
    const url = baseUrl + 'customer/' + this.invoice.customerId;
    const options = {
      observe: 'body' as 'body',
      responseType: 'json' as 'json'
    };
    this.httpClient.get<Customer>(url, options).subscribe((customer: Customer) => {
      this.customerName = customer.name;
    });
  }

  private pullInvoice(invoiceId: string) {
    const url = baseUrl + 'invoice/' + invoiceId;
    const options = {
      observe: 'body' as 'body',
      responseType: 'json' as 'json'
    };
    this.httpClient.get<Invoice>(url, options).subscribe((invoice: Invoice) => {
      this.invoice.cloneFrom(invoice);
      this.pullCustomerName();
      this.invoiceDateValidator.setValue(invoice.date);
    });
  }

  private addNewItemFormIsValid(): boolean {
    return this.newItemCostValidator.valid && this.newItemDescriptionValidator.valid;
  }

  private invoiceFormIsValidated() {
    return this.invoiceDateValidator.valid;
  }
}
