import {
  Request,
  ConnectionConfig
} from 'tedious';
import {
  Invoice,
  Customer,
  Item,
  InvoiceItem,
  QuoteItem,
  CustomerSummary
} from '../commonClasses';
import {
  convertToSQLDate,
  convertToSQLBoolean
} from './stringUtils';

const ConnectionPool = require('tedious-connection-pool');

export interface ColumnValue {
  value: any;
  metadata: {
    colName: string
  }
}
export class Database {
  public connectionPool: any;
  constructor(private connectionConfig: ConnectionConfig) {
    const poolConfig = {
      min: 1,
      max: 10,
      log: true
    }
    this.connectionPool = new ConnectionPool(poolConfig, connectionConfig);
  }
  
  public getCustomerSummaries(callback: (customerSummaries: CustomerSummary[]) => void) {
    this.connectionPool.acquire((err: any, connection: any)=>{
      const customerSummaries: CustomerSummary[] = [];
      const requestLine = `SELECT name, id FROM customers`;
      const reqFunc = (err: Error, rowCount: number) =>{
          callback(customerSummaries);
          connection.release();
      }
      const request = new Request(requestLine, reqFunc);
      request.on('row', (customerColumns)=>{
          customerSummaries.push({
              name: customerColumns[0].value,
              id: customerColumns[1].value
          });
      });
      connection.execSql(request);
    });
  }

  public getCustomer(customerId: string, callback:(customer: Customer)=>void){
    this.connectionPool.acquire((err: any, connection: any)=>{
      let requestLine = `SELECT * FROM customers WHERE id='${customerId}'`;
      const reqFunc = (err: Error, rowCount: number) => {
          if (rowCount === 0) {
              const requestedCustomer = new Customer('', '', '', '', [], []);
              callback(requestedCustomer);
          }
          connection.release();
      };
      const request = new Request(requestLine, reqFunc);
      request.on('row', (columns) => {
          const resultCustomer = this.parseCustomerRow(columns);
          this.getInvoiceIdsForCustomer(resultCustomer.id, (invoiceIds: string[])=>{
            resultCustomer.invoiceIds  = invoiceIds;
            callback(resultCustomer);
          })
      });
      connection.execSql(request);
    });  
  }

  public getInvoiceIdsForCustomer(customerId: string, callback: (invoiceIds: string[])=> void ) {
    this.getInvoicesForCustomer(customerId, (invoices: Invoice[]) => {
      const invoiceIds: string[] = [];
      invoices.forEach((invoice: Invoice) => {
        invoiceIds.push(invoice.id);
      });
      callback(invoiceIds);
    });
  }

  public getInvoice(invoiceId: string, callback: (invoice: Invoice)=>void){
    this.connectionPool.acquire((err: any, connection: any)=>{
      let requestLine = `SELECT * FROM invoices WHERE id='${invoiceId}'`;
      const reqFunc = (err: Error, rowCount: number, rows:any[]) => {
          if (err) {
              console.log(err);
              callback(new Invoice('', '', '', [], false, false));
          }
          connection.release();
      };
      const request = new Request(requestLine, reqFunc);
      request.on('row', (columns) => {
        this.getItemsForInvoice(invoiceId, (items: Item[]) => {
          const invoiceToReturn = this.parseInvoiceRow(columns);
          invoiceToReturn.items = items;
          callback(invoiceToReturn);
        });
      });
      connection.execSql(request);
    });
  }

  public getInvoicesForCustomer(customerId: string, callback: (invoices: Invoice[])=>void){
    this.connectionPool.acquire((error: any, connection: any)=> {
      let requestLine = `SELECT * FROM invoices WHERE customerId='${customerId}'`;
      const customerInvoices: Invoice[] = [];
      const reqFunc = (err: Error, rowCount: number, rows:any[]) => {
        if (err) {
          console.log(err);
          callback([]);
        } else {
          callback(customerInvoices);
        }
        connection.release();
      }
      const request = new Request(requestLine, reqFunc);
      request.on('row', (columns) =>{
        customerInvoices.push(this.parseInvoiceRow(columns));
      });
      connection.execSql(request);
    });
  }

  public canLogin(username: string, password: string, callback: (authorized: boolean)=>void){
    this.connectionPool.acquire( (error: any, connection: any)=>{
      const requestLine = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;
      const reqFunc = (err: Error, rowCount: number) => {
          if (rowCount > 0) {
              callback(true);
          } else {
              callback(false);
          }
          connection.release();
      };
      const request = new Request(requestLine, reqFunc);
      connection.execSql(request);
    })
  }

  public getItemsForInvoice(invoiceId: string, callback: (items: Item[]) => void){
    this.connectionPool.acquire((error: any, connection: any) => {
      const itemsToReturn: Item[] = [];
      const requestLine = `SELECT description, cost from invoiceItems WHERE invoiceId='${invoiceId}'`;
      const reqFunc = (err: Error, rowCount: number, rows: any[]) => {
        callback(itemsToReturn);
        connection.release();
      };
      const request = new Request(requestLine, reqFunc);
      request.on('row', (columns) =>{
        itemsToReturn.push(this.parseRow<Item>(columns));
      });
      connection.execSql(request);
    });
  }

  public addItem(itemToAdd: InvoiceItem) {
    this.connectionPool.acquire((error: any, connection: any)=>{
      const requestLine = `INSERT INTO invoiceItems (invoiceId, description, cost) VALUES ('${itemToAdd.invoiceId}', '${itemToAdd.description}', '${itemToAdd.cost}')`;
      const reqFunc = (err: Error, rowCount: number, rows: any[]) => {
        connection.release();
      };
      const request = new Request(requestLine, reqFunc);
      connection.execSql(request);
    });
  }

  public addItems(invoiceId: string, items: Item[]) {
    items.forEach((item: Item) => {
      this.addItem({
        invoiceId: invoiceId,
        ...item
      });
    })
  }

  public deleteAllItems(invoiceId: string, callback: ()=>void) {
    this.connectionPool.acquire((error: any, connection: any) => {
      const requestLine = 
      `
      DELETE FROM invoiceItems
      WHERE invoiceId='${invoiceId}'
      `;
      const reqFunc = (err: Error, rowCount: number, rows: any[]) => {
        callback();
        connection.release();
      };
      const request = new Request(requestLine, reqFunc);
      connection.execSql(request);
    });
  }

  public addInvoice(invoiceToAdd: Invoice, callback: (addedInvoice: Invoice) => void) {
    this.connectionPool.acquire((error: any, connection: any) => {
      const dateIssued = convertToSQLDate(invoiceToAdd.dateIssued);
      const isPaid = convertToSQLBoolean(invoiceToAdd.paid)
      const isCompleted = convertToSQLBoolean(invoiceToAdd.completed)
      const requestLine = `INSERT INTO invoices (dateIssued, customerId, completed, paid) VALUES ('${dateIssued}', '${invoiceToAdd.customerId}', ${isCompleted}, ${isPaid}); SELECT SCOPE_IDENTITY();`;
      const reqFunc = (err: Error, rowCount: number, rows:any[]) => {
        if(err){
          console.log(err);
        } else {
          this.addItems(invoiceToAdd.id, invoiceToAdd.items);
        }
        callback(invoiceToAdd);
        connection.release();
      };
      const request = new Request(requestLine, reqFunc);
      request.on('row', (columns)=>{
          invoiceToAdd.id = columns[0].value;
      })
      connection.execSql(request);
    });
  }

  public updateInvoiceItems (invoiceId: string, invoiceItems: Item[], callback: () => void) {
    this.deleteAllItems(invoiceId, () => {
      invoiceItems.forEach(invoiceItem => {
        this.addItem(
          {
            invoiceId: invoiceId,
            ...invoiceItem
          });
      });
      callback();
    });
  }
  public updateInvoice(invoiceToUpdate: Invoice, callback: (updatedInvoice: Invoice) => void){
    this.connectionPool.acquire((error: any, connection: any) => {
      console.log(invoiceToUpdate.dateIssued);
      const dateIssued = convertToSQLDate(invoiceToUpdate.dateIssued);
      console.log(dateIssued);
      const isPaid = convertToSQLBoolean(invoiceToUpdate.paid)
      const isCompleted = convertToSQLBoolean(invoiceToUpdate.completed)
      const requestLine = `UPDATE invoices SET dateIssued='${dateIssued}', completed=${isCompleted}, paid=${isPaid} WHERE id='${invoiceToUpdate.id}'`;
      console.log(requestLine);
      const reqFunc = (err: Error, rowCoutn: number, rows: any[]) => {
        if (err) {
          console.log(err);
        } else {
          this.updateInvoiceItems(invoiceToUpdate.id, invoiceToUpdate.items,() => {
            this.getInvoice(invoiceToUpdate.id, callback);
          });
        }
        connection.release();
      }
      const request = new Request(requestLine, reqFunc);
      connection.execSql(request);
    });
  }

  public addCustomer(customerToAdd: Customer, callback: (addedCustomer: Customer) => void) {
    this.connectionPool.acquire((error: any, connection: any) => {
      const requestLine =
      `INSERT INTO customers (name, email, phone)
       VALUES ('${customerToAdd.name}','${customerToAdd.email}','${customerToAdd.phone}');
       SELECT SCOPE_IDENTITY();`;
      const reqFunc = (err: Error, rowCount: number, rows: any[]) => {
          if(err){
            console.log(err);
            callback(customerToAdd);
          }
          connection.release()
      };
      const request = new Request(requestLine, reqFunc);
      request.on('row',(columns)=>{
          customerToAdd.id = columns[0].value;
          callback(customerToAdd);
      });
      connection.execSql(request);
    });
  }

  public updateCustomer(customerToUpdate: Customer, callback: (updatedCutomer: Customer) => void){
    this.connectionPool.acquire((error: any, connection: any) => {
      const requestLine =
      `UPDATE customers
       SET name='${customerToUpdate.name}', email='${customerToUpdate.email}', phone='${customerToUpdate.phone}'
       WHERE id=${customerToUpdate.id}
      `;
      const reqFunc = (err: Error, rowCount: number, row: any[]) => {
        if(err){
          console.log(err);
          callback(customerToUpdate);
        }
        this.getCustomer(customerToUpdate.id, (customer: Customer) => {
          callback(customer);
        });
        connection.release();
      };
      const request = new Request(requestLine, reqFunc);
      connection.execSql(request);
    });
  }

  private parseRow<T>(rowColumns: any): T{
    let tempCustomer: any = {};
    rowColumns.forEach((column: ColumnValue) => {
        tempCustomer[column.metadata.colName] = column.value;
    });
    const result: T = tempCustomer;
    return result;
  }

  private parseInvoiceRow(rowColumns: any): Invoice{
    const parsedInvoice: Invoice = this.parseRow<Invoice>(rowColumns);
    parsedInvoice.items = [];
    return parsedInvoice;
  }

  private parseCustomerRow(rowColumns: any): Customer{
    const resultCustomer = this.parseRow<Customer>(rowColumns);
    resultCustomer.invoiceIds = [];
    return resultCustomer;
  }
}
