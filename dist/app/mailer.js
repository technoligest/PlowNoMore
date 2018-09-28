"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commonClasses_1 = require("../commonClasses");
var nodemailer_1 = require("nodemailer");
var mailSenderOptions = {
    service: 'gmail',
    auth: {
        user: 'yaser.alkayale@gmail.com',
        pass: 'Y@sser1970'
    }
};
function formatDate(date) {
    var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}
function createEmailBody(invoice, customer) {
    // const paidMark = invoice.paid ? ''
    //                               : `
    //                                   <H1 style="
    //                                       margin: 0px;
    //                                       position: absolute;
    //                                       top: 25px;
    //                                       right: 25px;
    //                                     ">
    //                                     Paid
    //                                   </H1>
    //                                 `;
    var paidMark = '';
    var datePaymentDueObject = new Date(invoice.dateIssued);
    datePaymentDueObject.setMonth(datePaymentDueObject.getMonth() + 1);
    var datePaymentDue = formatDate(datePaymentDueObject);
    var itemRows = '';
    invoice.items.forEach(function (item) {
        itemRows += "<tr>\n    <th style=\"\n      border: 1px solid #dddddd;\n      text-align: left;\n      padding: 8px;\n      font-size: 20px;\"><strong>\n      "
            +
                item.description
            +
                "</strong></th>\n      <th style=\"\n      border: 1px solid #dddddd;\n      text-align: left;\n      padding: 8px;\n      font-weight: bold;\n      font-size: 20px;\"><strong>$"
            +
                item.cost
            +
                "</strong></th>\n    </tr>";
    });
    var theBody = "\n<!doctype html>\n<html lang=\"en\">\n\n<head>\n  <meta charset=\"utf-8\">\n  <title>MyApp</title>\n  <base href=\"/\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n</head>\n\n<body style=\"margin:0px; margin-top: 30px;\">\n"
        +
            paidMark
        +
            "\n  <div style=\"\n      text-align: center;\n    \">\n    <h1 style=\"\n      margin: 0px;\n    \">\n"
        +
            customer.name
        +
            "\n    </h1>\n    <h3 style=\"\n      margin: 0px;\n    \">\n      Invoice #"
        +
            invoice.id
        +
            "\n    </h3>\n    <h3 style=\"\n      margin: 0px;\n    \">\n      Date Issued: "
        +
            formatDate(new Date(invoice.dateIssued))
        +
            "\n    </h3>\n    <h3 style=\"\n      margin: 0px;\n    \">\n      Payment Due Date: "
        +
            datePaymentDue
        +
            "\n    </h3>\n  </div>\n  <table style=\"border-collapse: collapse; margin: 20px auto; width: 80%\">\n      \n      <tr>\n        <td style=\"\n        border: 1px solid #dddddd;\n        text-align: left;\n        padding: 8px;\n        font-size: 25px\">Description</td>\n        <td style=\"\n        border: 1px solid #dddddd;\n        text-align: left;\n        padding: 8px;\n        font-size: 25px\">Amount</td>\n      </tr>\n"
        +
            itemRows
        +
            "\n      <tr>\n        <th style=\"\n        border: 1px solid #dddddd;\n        text-align: left;\n        padding: 8px;\n        font-size: 25px;\"><strong>Total</strong></th>\n        <th style=\"\n        border: 1px solid #dddddd;\n        text-align: left;\n        padding: 8px;\n        font-weight: bold;\n        font-size: 25px;\"><strong>$"
        +
            invoice.amount
        +
            "</strong></th>\n      </tr>\n    </table>\n    <footer style=\"text-align: center;\">\n      <h2 style=\"margin: 0px\">\n        Mohannad Alkayale Landscaping\n      </h4>\n      <h4 style=\"margin: 0px\">\n        <a href=\"mailto:mohannad.alkayale@gmail.com\">mohannad.alkayale@gmail.com</a>\n      </h4>\n      <h4 style=\"margin: 0px\">\n        9024521113\n      </h4>\n    </footer>\n</body>\n</html>\n";
    return theBody;
}
var mailSender = nodemailer_1.createTransport(mailSenderOptions);
function sendInvoiceAsEmail(invoice, customer) {
    invoice = new commonClasses_1.Invoice(invoice.id, invoice.dateIssued, invoice.customerId, invoice.items, invoice.completed, invoice.paid);
    var emailBody = createEmailBody(invoice, customer);
    var emailOptions = {
        from: 'yaser.alkayale@gmail.com',
        to: customer.email,
        subject: 'Your Invoice From Mohannad Alkayale',
        html: emailBody
    };
    mailSender.sendMail(emailOptions, function (err, info) {
        if (err) {
            console.log("email ERROR");
            console.log(err);
        }
        else {
            console.log('Email sent: ' + info.response);
        }
    });
}
exports.sendInvoiceAsEmail = sendInvoiceAsEmail;
