using System;
using System.Collections.Generic;
namespace PlowNoMoreAPI.Classes
{
    public class Quote : AccountingFormBase
    {
        public DateTime validUntil { get; set; }
        public string invoiceId { get; set; }
        public Quote(string id, DateTime date, string customerId, List<LineItem> items, DateTime validUntil, string invoiceId)
            : base(id, date, customerId, items)
        {
            this.validUntil = validUntil;
            this.invoiceId = invoiceId;
        }
    }
}
