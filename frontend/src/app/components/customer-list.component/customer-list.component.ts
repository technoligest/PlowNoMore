import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerListService } from '../../services/customer-list.service';
import { CustomerSummary } from '../../general.classes';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  public customers: CustomerSummary[] = new Array<CustomerSummary>();

  constructor(private router: Router,
              private customerListService: CustomerListService) { }

  ngOnInit() {
    this.customerListService.getCustomerSummaries().subscribe((customers: CustomerSummary[]) => {
      console.log(customers);
      customers.forEach((customer: CustomerSummary) => {
        this.customers.push(customer);
      });
    });
  }

  public openCustomer(customerId: string) {
    this.router.navigate(['customer/' + customerId]);
  }

  public newCustomer() {
    this.router.navigate(['customer']);
  }
}
