import { AccountingForm} from './AccountingForm';
import { Item } from './Item';

export class Invoice extends AccountingForm {
  constructor(public id: string,
              public dateIssued: string,
              public customerId: string,
              public items: Item[],
              public completed: boolean,
              public paid: boolean) {
      super(id, dateIssued, customerId, items);
    }

  public cloneFrom(invoice: Invoice) {
    this.id = invoice.id;
    this.dateIssued = invoice.dateIssued;
    this.customerId = invoice.customerId;
    if (invoice.items){
      invoice.items.forEach( (item: Item) => {
        this.items.push(item);
      });
    };
    this.items = invoice.items;
    this.completed = invoice.completed;
    this.paid = invoice.paid;
  }
}
