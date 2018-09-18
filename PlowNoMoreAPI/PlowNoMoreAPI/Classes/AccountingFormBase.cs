using System;
using System.Collections.Generic;
namespace PlowNoMoreAPI.Classes
{
    public class AccountingFormBase: IEquatable<AccountingFormBase>, Ideable
    {
        public string id { get; set; }
        public DateTime date { get; set; }
        public string customerId { get; set; }
        public List<LineItem> items { get; set; }
        public AccountingFormBase( string id, DateTime date, string customerId, List<LineItem> items)
        {
            this.id = id;
            this.date = date;
            this.customerId = customerId;
            this.items = items;
        }
        public bool Equals(AccountingFormBase toCompare) {
            return this.id.Equals(toCompare.id);
        }
    }
}
