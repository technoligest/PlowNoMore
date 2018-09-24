import { AccountingForm} from './AccountingForm';
import { Item } from './Item';


export interface InvoiceHttpPayload {
  id: string;
  dateIssued: string;
  customerId: string;
  items: Item[];
  completed: boolean;
  isPaid: boolean;
}
export class Invoice extends AccountingForm {
  constructor(public id: string,
              public dateIssued: Date,
              public customerId: string,
              public items: Item[],
              public isCompleted: boolean,
              public isPaid: boolean) {
      super(id, dateIssued, customerId, items);
  }

  public cloneFrom(invoice: Invoice) {
    this.id = invoice.id;
    this.dateIssued = invoice.dateIssued;
    this.customerId = invoice.customerId;
    if (invoice.items) {
      invoice.items.forEach( (item: Item) => {
        this.items.push(item);
      });
    }
    this.items = invoice.items;
    this.isCompleted = invoice.isCompleted;
    this.isPaid = invoice.isPaid;
  }

  public getHttpPayload(): InvoiceHttpPayload {
    console.log("from http payload convertor");
    console.log(this.dateIssued);
    console.log(this.dateIssued.toUTCString());
    console.log("end");
    return {
      id: this.id,
      dateIssued: this.dateIssued.toUTCString(),
      customerId: this.customerId,
      items: this.items,
      completed: this.isCompleted,
      isPaid: this.isPaid
    };
  }
}
