import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../general.classes/Globals';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  private customers: ICustomer[];

  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit() {
    const url = baseUrl + 'customerSummaries/';
    const options = {
      observe: 'body' as 'body',
      responseType: 'json' as 'json'
    };
    this.httpClient.get<ICustomer[]>(url, options).subscribe((customers: ICustomer[]) => {
      this.customers = customers;
    });
  }

  public openCustomer(customerId: string) {
    this.router.navigate(['customer/' + customerId]);
  }

  public newCustomer() {
    this.router.navigate(['customer']);
  }
}

interface ICustomer {
  name: string;
  id: string;
}
