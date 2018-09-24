import { Item } from './Item';
import { Ideable } from './Ideable';

export class AccountingForm implements Ideable {
  constructor(public id: string,
              public dateIssued: Date,
              public customerId: String,
              public items: Item[]) {
              }
  public get amount() {
    let totalCost = 0;
    this.items.forEach((item: Item) => {
      totalCost += item.cost;
    });
    return totalCost;
  }

  public equals(formToCompare: AccountingForm): boolean {
    return this.id === formToCompare.id &&
           this.dateIssued.getTime() === formToCompare.dateIssued.getTime() &&
           this.customerId === formToCompare.customerId &&
           this.itemListsAreEqual(this.items, formToCompare.items);
  }

  private itemListsAreEqual(itemList1: Item[], itemList2: Item[]) {
    if (itemList1.length !== itemList2.length) {
      return false;
    }
    for (let i = 0; i < itemList1.length; ++i) {
      const item1: Item = new Item(itemList1[i].description, itemList1[i].cost);
      const item2: Item = new Item(itemList2[i].description, itemList2[i].cost);
      if (!item1.equals(item2)) {
        return false;
      }
    }
    return true;
  }
}

