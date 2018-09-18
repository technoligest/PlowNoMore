using System;
using System.Collections.Generic;
namespace PlowNoMoreAPI.Classes
{
    public class Globals
    {
        public static List<DateTime> dates = new List<DateTime>()
        {
            new DateTime(DateTime.Today.Year, DateTime.Today.Month, DateTime.Today.Day),
            new DateTime(2018, 7, 25),
            new DateTime(2017, 5, 2),
            new DateTime(2016, 3, 1),
            new DateTime(2015, 12, 29),
            new DateTime(2015, 12, 29),
            new DateTime(2015, 12, 29)
        };

        public static List<List<LineItem>> itemLists = new List<List<LineItem>>()
        {
            new List<LineItem>(),
            new List<LineItem>(),
            new List<LineItem>(),
            new List<LineItem>(),
            new List<LineItem>(),
            new List<LineItem>(),
            new List<LineItem>(),
            new List<LineItem>()
        };

        public static List<Quote> quotes = new List<Quote>()
        {
            new Quote("q1", dates[1], "c1", itemLists[1], dates[2], null),
            new Quote("q2", dates[2], "c2", itemLists[2], dates[3], null),
            new Quote("q3", dates[3], "c3", itemLists[3], dates[4], null),
            new Quote("q4", dates[4], "c4", itemLists[4], dates[5], null),
            new Quote("q5", dates[5], "c5", itemLists[5], dates[5], null)
        };

        public static List<List<string>> quoteLists = new List<List<string>>()
        {
            new List<string>(){"q1", "q2", "q4"},
            new List<string>(){"q3", "q2"},
            new List<string>(){"q1", "q4"}
        };

        public static List<List<string>> invoiceLists = new List<List<string>>()
        {
            new List<string>(){"i1", "i2", "i3", "i4"},
            new List<string>(){"i3", "i2", "i1"},
            new List<string>(){"i1"}
        };

        public static List<Customer> customers = new List<Customer>()
        {
            new Customer("cid1", "customer1", "cust1@gmail.com", "9024412277", invoiceLists[0], quoteLists[0]),
            new Customer("cid2", "customer2", "cust2@gmail.com", "9024412277", invoiceLists[1], quoteLists[1]),
            new Customer("cid3", "customer3", "cust3@gmail.com", "9024412277", invoiceLists[2], quoteLists[2])
        };

        public static List<Invoice> invoices = new List<Invoice>()
        {
            new Invoice("i1", dates[1], customers[0].id, itemLists[0], false, false),
            new Invoice("i2", dates[2], customers[1].id, itemLists[1], false, true),
            new Invoice("i3", dates[3], customers[2].id, itemLists[2], true, false),
            new Invoice("i4", dates[4], customers[0].id, itemLists[3], true, true),
            new Invoice("i5", dates[4], customers[1].id, itemLists[4], false, false)
        };

        public Globals()
        {
        }
    }
}
