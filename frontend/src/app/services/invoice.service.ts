import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Invoice } from '../general.classes';
import { Observable } from 'rxjs';
import { baseUrl } from '../general.classes/Globals';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private httpClient: HttpClient) { }

  public updateInvoice(invoiceToUpdate: Invoice): Observable<Invoice> {
    const url = baseUrl + 'updateInvoice/';
    return this.httpClient.post<Invoice>(url, invoiceToUpdate.getHttpPayload());
  }

  public addInvoice(invoiceToAdd: Invoice): Observable<Invoice> {
    const url = baseUrl + 'addInvoice';
    return this.httpClient.post<Invoice>(url, invoiceToAdd.getHttpPayload());
  }

  public sendInvoiceInEmail(invoiceId: string): Observable<boolean> {
    const url = baseUrl + 'sendInvoiceEmail/' + invoiceId;
    console.log(url);
    return this.httpClient.post<boolean>(url, {invoiceId: invoiceId});
  }

  public getInvoice(invoiceId: string): Observable<Invoice> {
    const url = baseUrl + 'invoice/' + invoiceId;
    const options = {
      observe: 'body' as 'body',
      responseType: 'json' as 'json'
    };
    return this.httpClient.get<Invoice>(url, options).pipe(
      map((invoice: Invoice) => {
        return this.createInvoiceFromGenericObject(invoice);
      })
    );
  }

  public createInvoiceFromGenericObject(invoice: any): Invoice {
    console.log(invoice.dateIssued);
    console.log(new Date(invoice.dateIssued));
    return new Invoice(invoice.id,
                       new Date(invoice.dateIssued),
                       invoice.customerId,
                       invoice.items,
                       invoice.completed,
                       invoice.paid);
  }
}
