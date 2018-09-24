import { Component, OnInit } from '@angular/core';
import { Invoice } from '../../general.classes/Invoice';
import { FormControl } from '@angular/forms';
import { Validators, baseUrl } from '../../general.classes/Globals';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../../general.classes/Customer';
import { MatSnackBar } from '@angular/material';
import { InvoiceService } from '../../services/invoice.service';
import { CustomerService } from '../../services/customer.service';
import { Item } from '../../general.classes';

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
              private router: Router,
              public snackBar: MatSnackBar,
              private invoiceService: InvoiceService,
              private customerService: CustomerService) {}

  ngOnInit() {
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

  public onFormCancel() {
    this.router.navigate(['customer/' + this.invoice.customerId]);
  }

  private saveFormAndCallBack(callback?: () => void) {
    if (!this.invoiceFormIsValidated()) {
      this.snackBar.open('Please input date.', 'Ok', {duration: 2000});
    } else {
      this.invoice.dateIssued = this.invoiceDateValidator.value;
      if (this.invoice.id === '') {
        this.invoiceService.addInvoice(this.invoice).subscribe((invoice: Invoice) => {
          this.invoice.id = invoice.id;
          this.snackBar.open('Invoice has been successfully saved.', 'OK');
          callback();
        });
      } else {
        this.invoiceService.updateInvoice(this.invoice).subscribe((updatedInvoice: Invoice) => {
          updatedInvoice = this.invoiceService.createInvoiceFromGenericObject(updatedInvoice);
          if (this.invoice.equals(updatedInvoice)) {
            this.snackBar.open('Invoice has been successfully saved.', 'OK');
          } else {
            this.snackBar.open('Invoice NOT saved. Contact Yaser.', 'OK');
          }
          callback();
        });
      }
    }
  }

  public saveForm() {
    this.saveFormAndCallBack();
  }

  public sendEmail() {
    this.saveFormAndCallBack(() => {
      this.invoiceService.sendInvoiceInEmail(this.invoice.id).subscribe((emailWasSent: boolean) => {
        const snackBarMessage = emailWasSent
                              ? 'Email was sent successfully!'
                              : 'Oops. Email was not sent, contact Yaser.';
        this.snackBar.open(snackBarMessage, 'Yaay');
      });
    });
  }

  public addNewItem() {
    if (this.addNewItemFormIsValid()) {
      this.invoice.items.push(new Item(
        (this.newItemDescriptionValidator.value as string).trim(),
        (this.newItemCostValidator.value as number)
      ));
      this.snackBar.open('Item has been added!', 'Yaay', {duration: 5000});
      //TODO: Reseting is keepingthe inputs red.
      this.newItemCostValidator.reset();
      this.newItemDescriptionValidator.reset();
    } else {
      this.snackBar.open('Please add new item information.', 'Ok', {duration: 2000});
    }
  }

  private pullCustomerName() {
    this.customerService.getCustomer(this.invoice.customerId).subscribe((customer: Customer) => {
      this.customerName = customer.name;
    });
  }

  private pullInvoice(invoiceId: string) {
    this.invoiceService.getInvoice(invoiceId).subscribe((invoice: Invoice) => {
      this.invoice.cloneFrom(invoice);
      this.pullCustomerName();
      this.invoiceDateValidator.setValue(invoice.dateIssued);
    });
  }

  private addNewItemFormIsValid(): boolean {
    return this.newItemCostValidator.valid && this.newItemDescriptionValidator.valid;
  }

  private invoiceFormIsValidated() {
    return this.invoiceDateValidator.valid;
  }
}
