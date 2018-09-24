import {
    Router,
    Request,
    Response
} from 'express';
import {
    Invoice,
    Customer,
    CustomerSummary,
    Quote
       } from '../../commonClasses'
import { quotes } from '../../commonClasses/Globals';
import { ConnectionConfig } from 'tedious';
import { Database } from '../database';
import { sendInvoiceAsEmail } from '../mailer';

const router: Router = Router();
const databaseOptions: ConnectionConfig = {
    userName: 'technoligest',
    password: 'PlowNoMore$23',
    server: 'plownomore.database.windows.net',
    options: {
        port: 1433,
        encrypt: true,
        database: 'PlowNoMore'
    }
};
const database: Database = new Database(databaseOptions);

router.get('/customerSummaries', (req: Request, res: Response) => {
    database.getCustomerSummaries((customerSummaries: CustomerSummary[])=>{
        res.send(customerSummaries);
    });
});

router.get('/login/:username/:password', (req: Request, res: Response) => {
    let {
        username,
        password
    }: {
        username: string,
        password: string
    } = req.params;
    database.canLogin(username, password, (authorized: boolean)=>{
        res.send(authorized);
    });
});

router.get('/customer/:customerId', (req: Request, res: Response) => {
    let { customerId }: { customerId: string } = req.params;
    database.getCustomer(customerId, (customer: Customer)=>{
        res.send(customer);
    });
});

router.get('/invoice/:invoiceId', (req: Request, res: Response) => {
    let { invoiceId }: { invoiceId: string } = req.params;
    database.getInvoice(invoiceId, (invoice: Invoice) =>{
        res.send(invoice)
    });
});

router.post('/sendInvoiceEmail/:invoiceId', (req: Request, res: Response) => {
    console.log("Trying to send email.")
    const { invoiceId }: { invoiceId: string } = req.params;
    database.getInvoice(invoiceId, (invoice: Invoice) =>{
        database.getCustomer(invoice.customerId, (customer: Customer) => {
            console.log("Sending email from API");
            sendInvoiceAsEmail(invoice, customer);
            res.send(true)
        });
    });
});

router.get('/quote/:quoteId', (req: Request, res: Response) => {
    let { quoteId }: { quoteId: string } = req.params;
    let requestedQuote: Quote = new Quote('', new Date(), '', [], new Date());
    quotes.forEach((quote: Quote) => {
        if (quote.id === quoteId) {
            requestedQuote = quote;
        }
    });
    res.send(requestedQuote);
});

router.post('/addCustomer', (req: Request, res: Response) => {
    let customerToAdd: Customer = req.body;
    if (!customerToAdd) {
        res.send(customerToAdd);    
    } else {
        database.addCustomer(customerToAdd, (customerToAdd: Customer) => {
            res.send(customerToAdd);
        });
    }
});

router.post('/updateCustomer', (req: Request, res: Response) => {
    let customerToUpdate: Customer = req.body;
    if (!customerToUpdate) {
        res.send(customerToUpdate);
    } else {
        database.updateCustomer(customerToUpdate, (customerToUpdate: Customer) => {
            res.send(customerToUpdate);
        })
    }
})

router.post('/addInvoice', (req: Request, res: Response) => {
    let invoiceToAdd: Invoice = req.body;
    console.log('Adding invoice');
    if (!invoiceToAdd) {
        res.send(invoiceToAdd);
    }
    database.addInvoice(invoiceToAdd, (addedInvoice: Invoice)=>{
        res.send(invoiceToAdd);
    });
});

router.post('/updateInvoice', (req: Request, res: Response) => {
    let invoiceToUpdate: Invoice = req.body;
    if (!invoiceToUpdate) {
        res.send(invoiceToUpdate);
    }
    database.updateInvoice(invoiceToUpdate, (addedInvoice: Invoice)=>{
        res.send(invoiceToUpdate);
    });
});



// Export the express.Router() instance to be used by server.ts
export const APIController: Router = router;
