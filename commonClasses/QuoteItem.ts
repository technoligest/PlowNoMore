import { Item } from "./Item";

export class QuoteItem extends Item{
  constructor(public description: string,
              public cost: number,
              public quoteId: string) {
                super(description, cost);
  }
}
