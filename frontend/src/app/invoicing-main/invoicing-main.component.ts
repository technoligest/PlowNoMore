import { Component, OnInit } from '@angular/core';
import { CustomerListComponent } from '../customer-list/customer-list.component';
import { Invoice } from '../general.classes/Invoice';

@Component({
  selector: 'app-invoicing-main',
  templateUrl: './invoicing-main.component.html',
  styleUrls: ['./invoicing-main.component.scss']
})
export class InvoicingMainComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }
}
