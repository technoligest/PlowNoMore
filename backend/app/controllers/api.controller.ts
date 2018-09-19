import { Router, Request, Response } from 'express';
import { Invoice, Item, Customer, CustomerSummary, Quote} from '../../commonClasses'
import { customers, invoices, quotes} from '../../commonClasses/Globals';
const router: Router = Router();

// The / here corresponds to the route that the WelcomeController
// is mounted on in the server.ts file.
// In this case it's /welcome
router.get('/', (req: Request, res: Response) => {
    // Reply with a hello world when no name param is provided
    res.send('Hello, Worlds!');
    req.body
});


router.get('/customerSummaries', (req: Request, res: Response) => {
    const customerSummaries: CustomerSummary[] = [];
    customers.forEach((customer: Customer)=>{
        customerSummaries.push(customer.summary);
    });
    res.send(customerSummaries);
});

router.get('/login/:username/:password', (req: Request, res: Response) => {
    let {username, password}:{username:string, password:string} = req.params;
    res.send(username === 'mo' && password == 'password');
});

router.get('/customer/:customerId', (req: Request, res: Response)=>{
    let {customerId}: {customerId: string} = req.params;
    let requestedCustomer: Customer = new Customer('','','','',[],[]);
    customers.forEach((customer: Customer)=>{
        if(customer.id === customerId) {
            requestedCustomer = customer;
        }
    });
    res.send(requestedCustomer);
});

router.get('/invoice/:invoiceId', (req: Request, res: Response)=>{
    let {invoiceId}: {invoiceId: string} = req.params;
    let requestedInvoice: Invoice = new Invoice('', new Date(), '', [], false, false);
    invoices.forEach((invoice: Invoice)=>{
        if(invoice.id === invoiceId) {
            requestedInvoice = invoice;
        }
    });
    res.send(requestedInvoice);
});

router.get('/quote/:quoteId', (req: Request, res: Response)=>{
    let {quoteId}: {quoteId: string} = req.params;
    let requestedQuote: Quote = new Quote('', new Date(), '', [], new Date());
    quotes.forEach((quote: Quote)=>{
        if(quote.id === quoteId) {
            requestedQuote = quote;
        }
    });
    res.send(requestedQuote);
});

router.post('/addCustomer', (req: Request, res: Response)=>{
    let customerToAdd: Customer = req.body;
    if(!customerToAdd){
        let customerFound: boolean = false;
        customers.forEach((customer: Customer)=>{
            if(customer.id === customerToAdd.id){
                customer = customerToAdd;
                customerFound = true;
            }
        })
        if(!customerFound) {
            customers.push(customerToAdd);
        }
    }
    res.send(customerToAdd);
});

router.post('/addInvoice', (req: Request, res: Response)=>{
    let invoiceToAdd: Invoice = req.body;
    if(!invoiceToAdd){
        let invoiceFound: boolean = false;
        invoices.forEach((invoice: Invoice)=>{
            if(invoice.id === invoiceToAdd.id){
                invoice = invoiceToAdd;
                invoiceFound = true;
            }
        })
        if(!invoiceFound) {
            invoices.push(invoiceToAdd);
        }
    }
    console.log(invoiceToAdd);
    res.send(invoiceToAdd);
});

router.post('/emailInvoice/:invoiceId', (req: Request, res: Response)=>{
    const {invoiceId}: {invoiceId:string} = req.params;
    let invoice: Invoice;
});

// Export the express.Router() instance to be used by server.ts
export const APIController: Router = router;
