CREATE TABLE invoiceItems (
  invoiceId varchar(255),
  description varchar(255),
  cost int
)
CREATE TABLE customers (
  id int IDENTITY(1,1) PRIMARY KEY,
  name varchar(255),
  email varchar(255),
  phone varchar(255)
);
CREATE TABLE invoices (
  id int IDENTITY(1,1) PRIMARY KEY,
  dateIssued DATETIME,
  customerId varchar(255),
  completed bit,
  paid bit
);
CREATE TABLE quotes (
  id int IDENTITY(1,1) PRIMARY KEY,
  dateIssued DATETIME,
  customerId varchar(255),
  validUntil bit,
  invoiceId varchar(255) UNIQUE
);

CREATE TABLE users (
  username varchar(255) PRIMARY KEY,
  password varchar(255),
  fb_user_id varchar(255),
  email varchar(255),
  phone varchar(255)
)
