import {
  Router,
  Request,
  Response
} from 'express';
import {
  Invoice,
  Customer,
  CustomerSummary
} from '../../commonClasses';
import { Database } from '../database/database';
import { sendInvoiceAsEmail } from '../mailer/mailer';
import {
  authenticate,
  getCurrentUser,
  getOne,
  generateAndSendToken
} from '../authentication/authentication';
import { Passport } from '../authentication/passport';

const router: Router = Router();
const database = Database.instance;
const passport = Passport.instance;

router.get('/customerSummaries', (req: Request, res: Response) => {
  database.getCustomerSummaries().then((customerSummaries: CustomerSummary[]) => {
    res.send(customerSummaries);
  });
});

router.get('/login/:username/:password', (req: Request, res: Response) => {
  const {
    username,
    password
  }: {
    username: string,
    password: string
  } = req.params;
  database.canLogin(username, password, (authorized: boolean) => {
    res.send(authorized);
  });
});

router.get('/customer/:customerId', (req: Request, res: Response) => {
  const { customerId }: { customerId: string } = req.params;
  database.getCustomer(customerId, (customer: Customer) => {
    res.send(customer);
  });
});

router.get('/invoice/:invoiceId', (req: Request, res: Response) => {
  const { invoiceId }: { invoiceId: string } = req.params;
  database.getInvoice(invoiceId, (invoice: Invoice) => {
    res.send(invoice);
  });
});

router.post('/sendInvoiceEmail/:invoiceId', (req: Request, res: Response) => {
  console.log('Trying to send email.');
  const { invoiceId }: { invoiceId: string } = req.params;
  database.getInvoice(invoiceId, (invoice: Invoice) => {
    database.getCustomer(invoice.customerId, (customer: Customer) => {
      console.log('Sending email from API');
      sendInvoiceAsEmail(invoice, customer);
      res.send(true);
    });
  });
});

router.post('/addCustomer', (req: Request, res: Response) => {
  const customerToAdd: Customer = req.body;
  if (!customerToAdd) {
    res.send(customerToAdd);
  } else {
    database.addCustomer(customerToAdd, (addedCustomer: Customer) => {
      res.send(addedCustomer);
    });
  }
});

router.post('/updateCustomer', (req: Request, res: Response) => {
  const customerToUpdate: Customer = req.body;
  if (!customerToUpdate) {
    res.send(customerToUpdate);
  } else {
    database.updateCustomer(customerToUpdate, (updatedCustomer: Customer) => {
      res.send(updatedCustomer);
    });
  }
});

router.post('/addInvoice', (req: Request, res: Response) => {
  const invoiceToAdd: Invoice = req.body;
  console.log('Adding invoice');
  if (!invoiceToAdd) {
    res.send(invoiceToAdd);
  }
  database.addInvoice(invoiceToAdd, (addedInvoice: Invoice) => {
    res.send(invoiceToAdd);
  });
});

router.post('/updateInvoice', (req: Request, res: Response) => {
  const invoiceToUpdate: Invoice = req.body;
  if (!invoiceToUpdate) {
    res.send(invoiceToUpdate);
  }
  database.updateInvoice(invoiceToUpdate, (addedInvoice: Invoice) => {
    res.send(invoiceToUpdate);
  });
});

router.post('/auth/facebook',
  passport.authenticate('facebook-token', {session: false}),
  function(req, res, next) {
    console.log('started this funciton.');
    console.log(req.user);
    if (!req.user) {
      console.log('Got to here!');
      return res.status(401).send('User Not Authenticated');
    }
    req.authInfo = {
      id: 'YASER'
    };
    next();
  },
  generateAndSendToken);

router.post('/auth/facebook/token',
  passport.authenticate('facebook-token'),
  function (req: any, res: any) {
    console.log('doing something--------------------');
    // do something with req.user
    res.send(req.user ? 200 : 401);
  },
  (error: any, req: any, res: any, next: any) => {
      if (error) {
          res.status(401).json({success: false, message: 'Auth failed', error});
      }
  }
);

router.route('/auth/me').get(authenticate, getCurrentUser, getOne);

// Export the express.Router() instance to be used by server.ts
export const APIController: Router = router;
