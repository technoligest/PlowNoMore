using System;
using System.Collections.Generic;
namespace PlowNoMoreAPI.Classes
{
    public class Invoice : AccountingFormBase
    {
        public Boolean isPaid { get; set; }
        public Boolean isCompleted { get; set; }
        public Invoice(string id, DateTime date, string customerId, List<LineItem> items, Boolean isPaid, Boolean isCompleted)
            : base(id, date, customerId, items)
        {
            this.isPaid = isPaid;
            this.isCompleted = isCompleted;
        }
    }
}
