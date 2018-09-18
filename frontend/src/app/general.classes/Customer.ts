
export class Customer {
  constructor (public id: string,
               public name: string,
               public email: string,
               public phone: string,
               public invoiceIds: string[],
               public quoteIds: string[]) {}
}
