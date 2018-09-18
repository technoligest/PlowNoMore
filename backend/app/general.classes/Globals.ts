import {
  Item,
  Quote,
  Customer,
  Invoice
} from './index';


export let dates: Date[] = [
  new Date('12/12/2018'),
  new Date('12/12/2018'),
  new Date('12/12/2018'),
  new Date('12/12/2018'),
  new Date('12/12/2018'),
  new Date('12/12/2018'),
  new Date('12/12/2018'),
  new Date('12/12/2018')
];

const items: Item[] = [
  new Item('plowing1', 100),
  new Item('plowing2', 200),
  new Item('plowing3', 300),
  new Item('plowing4', 400),
  new Item('plowing5', 500),
  new Item('landscaping1', 1000),
  new Item('landscaping2', 2000),
  new Item('landscaping3', 3000),
  new Item('landscaping4', 4000)
]

const itemLists: Array < Item[] > = [
  [items[0], items[2], items[3]],
  [items[7], items[6]],
  [items[1], items[4], items[5], items[6]],
  [items[1], items[5], items[3]],
  [items[7], items[3]],
  [items[5], items[4], items[7], items[1]]
];

const invoiceLists: Array < string[] > = [
  ["i1", "i2", "i3", "i4"],
  ["i3", "i2", "i1"],
  ["i1"]
];

const quoteLists: Array < string[] > = [
  ["q1", "q2", "q4"],
  ["q3", "q2"],
  ["q1", "q4"]
];

export let customers = [
  new Customer("cid1", "customer1", "cust1@gmail.com", "9024412277", invoiceLists[0], quoteLists[0]),
  new Customer("cid2", "customer2", "cust2@gmail.com", "9024412277", invoiceLists[1], quoteLists[1]),
  new Customer("cid3", "customer3", "cust3@gmail.com", "9024412277", invoiceLists[2], quoteLists[2])
];

export let invoices = [
  new Invoice("i1", dates[1], customers[0].id, itemLists[0], false, false),
  new Invoice("i2", dates[2], customers[1].id, itemLists[1], false, true),
  new Invoice("i3", dates[3], customers[2].id, itemLists[2], true, false),
  new Invoice("i4", dates[4], customers[0].id, itemLists[3], true, true),
  new Invoice("i5", dates[4], customers[1].id, itemLists[4], false, false)
];

export let quotes: Quote[] = [
  new Quote("q1", dates[1], "c1", itemLists[1], dates[2], "i3"),
  new Quote("q2", dates[2], "c2", itemLists[2], dates[3], "i1"),
  new Quote("q3", dates[3], "c3", itemLists[3], dates[4]),
  new Quote("q4", dates[4], "c4", itemLists[4], dates[5]),
  new Quote("q5", dates[5], "c5", itemLists[5], dates[5], "i2")
];
