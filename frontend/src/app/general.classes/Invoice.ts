import { AccountingForm} from './AccountingForm';
import { Item } from './Item';

export class Invoice extends AccountingForm {
  constructor(public id: string,
              public date: Date,
              public customerId: string,
              public items: Item[],
              public completed: boolean,
              public paid: boolean) {
      super(id, date, customerId, items);
    }

  public cloneFrom(invoice: Invoice) {
    this.id = invoice.id;
    this.date = invoice.date;
    this.customerId = invoice.customerId;
    this.items = invoice.items;
    this.completed = invoice.completed;
    this.paid = invoice.paid;
  }
}
