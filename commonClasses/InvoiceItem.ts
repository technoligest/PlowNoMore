import { Item } from "./Item";

export class InvoiceItem extends Item{
  constructor(public description: string,
              public cost: number,
              public invoiceId: string) {
                super(description, cost);
  }
}
