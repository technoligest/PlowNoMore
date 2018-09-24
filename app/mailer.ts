import { Invoice, Customer, Item } from '../commonClasses';
import { createTransport } from 'nodemailer';


const mailSenderOptions = {
  service: 'gmail',
  auth: {
    user: 'yaser.alkayale@gmail.com',
    pass: 'Y@sser1970'
  }
};

function formatDate(date: Date): string {
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

function createEmailBody(invoice: Invoice, customer: Customer) {
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
  const paidMark = '';
  let datePaymentDueObject = new Date(invoice.dateIssued);
  datePaymentDueObject.setMonth(datePaymentDueObject.getMonth()+1);
  const datePaymentDue = formatDate(datePaymentDueObject)
  let itemRows = '';
  invoice.items.forEach((item: Item) => {
    itemRows += `<tr>
    <th style="
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
      font-size: 20px;"><strong>
      `
      +
      item.description
      +
      `</strong></th>
      <th style="
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
      font-weight: bold;
      font-size: 20px;"><strong>$`
      +
      item.cost
      +
      `</strong></th>
    </tr>`;
  });
  
  const theBody = 
`
<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>MyApp</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body style="margin:0px; margin-top: 30px;">
`
+
paidMark
+
`
  <div style="
      text-align: center;
    ">
    <h1 style="
      margin: 0px;
    ">
`
+
customer.name
+
`
    </h1>
    <h3 style="
      margin: 0px;
    ">
      Invoice #`
+
invoice.id
+
`
    </h3>
    <h3 style="
      margin: 0px;
    ">
      Date Issued: `
+
formatDate(new Date(invoice.dateIssued))
+      
`
    </h3>
    <h3 style="
      margin: 0px;
    ">
      Payment Due Date: `
+
datePaymentDue
+
`
    </h3>
  </div>
  <table style="border-collapse: collapse; margin: 20px auto; width: 80%">
      
      <tr>
        <td style="
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
        font-size: 25px">Description</td>
        <td style="
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
        font-size: 25px">Amount</td>
      </tr>
`
+
itemRows
+
`
      <tr>
        <th style="
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
        font-size: 25px;"><strong>Total</strong></th>
        <th style="
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
        font-weight: bold;
        font-size: 25px;"><strong>$`
+
invoice.amount
+
        `</strong></th>
      </tr>
    </table>
    <footer style="text-align: center;">
      <h2 style="margin: 0px">
        Mohannad Alkayale Landscaping
      </h4>
      <h4 style="margin: 0px">
        <a href="mailto:mohannad.alkayale@gmail.com">mohannad.alkayale@gmail.com</a>
      </h4>
      <h4 style="margin: 0px">
        9024521113
      </h4>
    </footer>
</body>
</html>
`;
  return theBody;
}
const mailSender = createTransport(mailSenderOptions);

export function sendInvoiceAsEmail(invoice: Invoice, customer: Customer) {
  invoice = new Invoice(invoice.id, invoice.dateIssued, invoice.customerId, invoice.items, invoice.completed, invoice.paid);
  const emailBody = createEmailBody(invoice, customer);
  const emailOptions = {
    from: 'yaser.alkayale@gmail.com',
    to: customer.email,
    subject: 'Your Invoice From Mohannad Alkayale',
    html: emailBody
  }
  mailSender.sendMail(emailOptions, (err: Error | null, info: any) => {
    if (err) {
      console.log("email ERROR");
      console.log(err);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
