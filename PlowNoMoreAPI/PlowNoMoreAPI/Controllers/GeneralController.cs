using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PlowNoMoreAPI.Classes;

namespace PlowNoMoreAPI.Controllers
{
    [Route("api")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        [HttpGet("customerNamesAndIDs")]
        public ActionResult<IEnumerable<CustomerNameAndId>> GetCustomerSummaries()
        {
            List<CustomerNameAndId> allCustomers = new List<CustomerNameAndId>();
            Globals.customers.ForEach((Customer customer) =>
            {
                allCustomers.Add(new CustomerNameAndId(customer.name, customer.id));
            });
            return allCustomers;
        }

        [HttpGet("customer/{id}")]
        public ActionResult<Customer> getCustomer(string id) {
            Customer requestedCustomer = new Customer();
            Globals.customers.ForEach(
                (Customer customer) =>
                {
                    if (customer.id.Equals(id)){
                        requestedCustomer = customer;
                        return;
                    }
                }
            );
            return requestedCustomer;
        }

        [HttpGet("login/{username}/{password}")]
        public ActionResult<bool> login(string username, string password)
        {
            return username.Equals("mo") && password.Equals("password");
        }

        [HttpGet("invoice/{id}")]
        public ActionResult<Invoice> getInvoice(string id){
            Invoice requestedInvoice = null;
            Globals.invoices.ForEach((Invoice invoice) =>
            {
                if (invoice.id == id)
                {
                    requestedInvoice = invoice;
                    return;
                }
            });
            return requestedInvoice;
        }
        [HttpGet("quote/{id}")]
        public ActionResult<Quote> getQuote(string id)
        {
            Quote requestedInvoice = null;
            Globals.quotes.ForEach((Quote invoice) =>
            {
                if (invoice.id == id)
                {
                    requestedInvoice = invoice;
                    return;
                }
            });
            return requestedInvoice;
        }

        [HttpPost("addCustomer")]
        public ActionResult<Customer> addCustomer([FromBody] Customer customerToAdd){
            if (customerToAdd == null)
            {
                return customerToAdd;
            }
            customerToAdd.id = Generators.generateCustomerId();
            Globals.customers.Append(customerToAdd);
            return customerToAdd;
        }

        [HttpPost("addInvoice")]
        public ActionResult<Invoice> addInvoice([FromBody] Invoice invoiceToAdd)
        {
            if (invoiceToAdd == null)
            {
                return invoiceToAdd;
            }
            Customer invoiceOwner = null;
            Globals.customers.ForEach((Customer customer)=>{
                if(customer.id == invoiceToAdd.customerId){
                    invoiceOwner = customer;
                }
            });
            invoiceToAdd.id = Generators.generateInvoiceId();
            invoiceOwner.invoiceIds.Add(invoiceToAdd.id);
            Globals.invoices.Add(invoiceToAdd);
            return invoiceToAdd;
        }

        // GET api/values
        [HttpGet("values")]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "value1s2s", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
