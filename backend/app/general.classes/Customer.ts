
export class CustomerSummary{
  constructor(public id: string, public name: string){}
}

export class Customer {
  constructor (public id: string,
               public name: string,
               public email: string,
               public phone: string,
               public invoiceIds: string[],
               public quoteIds: string[]) {}
  public get summary():CustomerSummary{
    return new CustomerSummary(this.id, this.name);
  }
}