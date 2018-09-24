import { Ideable } from './Ideable';

export class CustomerSummary {
  constructor(public id: string, public name: string) {}
}

export class Customer implements Ideable{
  constructor (public id: string,
               public name: string,
               public email: string,
               public phone: string,
               public invoiceIds: string[],
               public quoteIds: string[]) {}
  public get summary(): CustomerSummary {
    return new CustomerSummary(this.id, this.name);
  }
  public cloneFrom(toBeCloned: Customer) {
    this.id = toBeCloned.id;
    this.name = toBeCloned.id;
    this.email = toBeCloned.email;
    this.phone = toBeCloned.phone;
    if (toBeCloned.invoiceIds) {
      toBeCloned.invoiceIds.forEach((invoice: string) => {
        this.invoiceIds.push(invoice);
      });
    }
    if (toBeCloned.quoteIds) {
      toBeCloned.quoteIds.forEach((quote: string) => {
        this.quoteIds.push(quote);
      });
    }
  }
}
