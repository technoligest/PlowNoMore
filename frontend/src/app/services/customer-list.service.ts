import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerSummary } from '../general.classes';
import { baseUrl } from '../general.classes/Globals';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerListService {

  constructor(private httpClient: HttpClient) { }

  public getCustomerSummaries(): Observable<CustomerSummary[]> {
    const options = this.getDefaultHttpOptions();
    const url = baseUrl + 'customerSummaries/';
    return this.httpClient.get<CustomerSummary[]>(url, options);
  }

  private getDefaultHttpOptions(): {observe: 'body', responseType: 'json'} {
    return {
      observe: 'body' as 'body',
      responseType: 'json' as 'json'
    };
  }
}
