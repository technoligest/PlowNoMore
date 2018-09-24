"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var commonClasses_1 = require("../../commonClasses");
var database_1 = require("../database");
var mailer_1 = require("../mailer");
var router = express_1.Router();
var databaseOptions = {
    userName: 'technoligest',
    password: 'PlowNoMore$23',
    server: 'plownomore.database.windows.net',
    options: {
        port: 1433,
        encrypt: true,
        database: 'PlowNoMore'
    }
};
var database = new database_1.Database(databaseOptions);
router.get('/customerSummaries', function (req, res) {
    database.getCustomerSummaries(function (customerSummaries) {
        res.send(customerSummaries);
    });
});
router.get('/login/:username/:password', function (req, res) {
    var _a = req.params, username = _a.username, password = _a.password;
    database.canLogin(username, password, function (authorized) {
        res.send(authorized);
    });
});
router.get('/customer/:customerId', function (req, res) {
    var customerId = req.params.customerId;
    database.getCustomer(customerId, function (customer) {
        res.send(customer);
    });
});
router.get('/invoice/:invoiceId', function (req, res) {
    var invoiceId = req.params.invoiceId;
    database.getInvoice(invoiceId, function (invoice) {
        res.send(invoice);
    });
});
router.post('/sendInvoiceEmail/:invoiceId', function (req, res) {
    console.log("Trying to send email.");
    var invoiceId = req.params.invoiceId;
    database.getInvoice(invoiceId, function (invoice) {
        database.getCustomer(invoice.customerId, function (customer) {
            console.log("Sending email from API");
            mailer_1.sendInvoiceAsEmail(invoice, customer);
            res.send(true);
        });
    });
});
router.get('/quote/:quoteId', function (req, res) {
    var quoteId = req.params.quoteId;
    var requestedQuote = new commonClasses_1.Quote('', '', '', [], new Date());
    // quotes.forEach((quote: Quote) => {
    //     if (quote.id === quoteId) {
    //         requestedQuote = quote;
    //     }
    // });
    res.send(requestedQuote);
});
router.post('/addCustomer', function (req, res) {
    var customerToAdd = req.body;
    if (!customerToAdd) {
        res.send(customerToAdd);
    }
    else {
        database.addCustomer(customerToAdd, function (customerToAdd) {
            res.send(customerToAdd);
        });
    }
});
router.post('/updateCustomer', function (req, res) {
    var customerToUpdate = req.body;
    if (!customerToUpdate) {
        res.send(customerToUpdate);
    }
    else {
        database.updateCustomer(customerToUpdate, function (customerToUpdate) {
            res.send(customerToUpdate);
        });
    }
});
router.post('/addInvoice', function (req, res) {
    var invoiceToAdd = req.body;
    console.log('Adding invoice');
    if (!invoiceToAdd) {
        res.send(invoiceToAdd);
    }
    database.addInvoice(invoiceToAdd, function (addedInvoice) {
        res.send(invoiceToAdd);
    });
});
router.post('/updateInvoice', function (req, res) {
    var invoiceToUpdate = req.body;
    if (!invoiceToUpdate) {
        res.send(invoiceToUpdate);
    }
    database.updateInvoice(invoiceToUpdate, function (addedInvoice) {
        res.send(invoiceToUpdate);
    });
});
// Export the express.Router() instance to be used by server.ts
exports.APIController = router;
