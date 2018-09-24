import { Item } from './Item';

export class AccountingForm {
  constructor(public id: string,
              public dateIssued: string,
              public customerId: String,
              public items: Item[]) {}
  public get amount(): number {
    let totalCost = 0;
    this.items.forEach((item: Item) => {
      totalCost += item.cost;
    });
    console.log(totalCost);
    return totalCost;
  }
}

