import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../general.classes/Globals';
import { Customer } from '../general.classes';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) { }

  public getCustomer(customerId: string): Observable<Customer> {
    const url = baseUrl + 'customer/' + customerId;
    const options = {
      observe: 'body' as 'body',
      responseType: 'json' as 'json'
    };
    return this.httpClient.get<Customer>(url, options);
  }

  public saveCustomer(customer: Customer): Observable<Customer> {
    const url = baseUrl + 'addCustomer/';
    return this.httpClient.post<Customer>(url, customer);
  }

  public updateCustomer(customerToUpdate: Customer): Observable<Customer> {
    const url = baseUrl + 'updateCustomer/';
    return this.httpClient.post<Customer>(url, customerToUpdate);
  }
}
