import { AccountingForm } from './AccountingForm';
import { Item } from './Item';

export class Quote extends AccountingForm {
  constructor(public id: string,
              public date: Date,
              public customerId: string,
              public items: Item[],
              public validUntil: Date,
              public invoiceId?: string) {
                super(id, date, customerId, items);
              }
}
