using System;
using System.Collections.Generic;
namespace PlowNoMoreAPI.Classes
{
    public class Customer: IEquatable<Customer>, Ideable
    {
        public string id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public List<string> invoiceIds { get; set; }
        public List<string> quoteIds { get; set; }

        public Customer(string id, string name, string email, string phone, List<string> invoiceIds, List<string> quoteIds)
        {
            this.id = id;
            this.name = name;
            this.email = email;
            this.phone = phone;
            this.invoiceIds = invoiceIds;
            this.quoteIds = quoteIds;
        }

        public Customer(){
            this.id = "";
            this.name = "";
            this.email = "";
            this.phone = "";
            this.invoiceIds = new List<string>();
            this.quoteIds = new List<string>();
        }

        public Customer(string id)
        {
            this.id = id;
            name = "";
            email = "";
            phone = "";
            invoiceIds = new List<string>();
            quoteIds = new List<string>();
        }

        public bool Equals(Customer toCompare){
            return this.id.Equals(toCompare.id);
        }
    }
}
