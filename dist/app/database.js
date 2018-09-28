"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var tedious_1 = require("tedious");
var commonClasses_1 = require("../commonClasses");
var stringUtils_1 = require("./stringUtils");
var ConnectionPool = require('tedious-connection-pool');
var Database = /** @class */ (function () {
    function Database(connectionConfig) {
        this.connectionConfig = connectionConfig;
        var poolConfig = {
            min: 1,
            max: 10,
            log: true
        };
        this.connectionPool = new ConnectionPool(poolConfig, connectionConfig);
    }
    Database.prototype.getCustomerSummaries = function (callback) {
        this.connectionPool.acquire(function (err, connection) {
            var customerSummaries = [];
            var requestLine = "SELECT name, id FROM customers";
            var reqFunc = function (err, rowCount) {
                callback(customerSummaries);
                connection.release();
            };
            var request = new tedious_1.Request(requestLine, reqFunc);
            request.on('row', function (customerColumns) {
                customerSummaries.push({
                    name: customerColumns[0].value,
                    id: customerColumns[1].value
                });
            });
            connection.execSql(request);
        });
    };
    Database.prototype.getCustomer = function (customerId, callback) {
        var _this = this;
        this.connectionPool.acquire(function (err, connection) {
            var requestLine = "SELECT * FROM customers WHERE id='" + customerId + "'";
            var reqFunc = function (err, rowCount) {
                if (rowCount === 0) {
                    var requestedCustomer = new commonClasses_1.Customer('', '', '', '', [], []);
                    callback(requestedCustomer);
                }
                connection.release();
            };
            var request = new tedious_1.Request(requestLine, reqFunc);
            request.on('row', function (columns) {
                var resultCustomer = _this.parseCustomerRow(columns);
                _this.getInvoiceIdsForCustomer(resultCustomer.id, function (invoiceIds) {
                    resultCustomer.invoiceIds = invoiceIds;
                    callback(resultCustomer);
                });
            });
            connection.execSql(request);
        });
    };
    Database.prototype.getInvoiceIdsForCustomer = function (customerId, callback) {
        this.getInvoicesForCustomer(customerId, function (invoices) {
            var invoiceIds = [];
            invoices.forEach(function (invoice) {
                invoiceIds.push(invoice.id);
            });
            callback(invoiceIds);
        });
    };
    Database.prototype.getInvoice = function (invoiceId, callback) {
        var _this = this;
        this.connectionPool.acquire(function (err, connection) {
            var requestLine = "SELECT * FROM invoices WHERE id='" + invoiceId + "'";
            var reqFunc = function (err, rowCount, rows) {
                if (err) {
                    console.log(err);
                    callback(new commonClasses_1.Invoice('', '', '', [], false, false));
                }
                connection.release();
            };
            var request = new tedious_1.Request(requestLine, reqFunc);
            request.on('row', function (columns) {
                _this.getItemsForInvoice(invoiceId, function (items) {
                    var invoiceToReturn = _this.parseInvoiceRow(columns);
                    invoiceToReturn.items = items;
                    callback(invoiceToReturn);
                });
            });
            connection.execSql(request);
        });
    };
    Database.prototype.getInvoicesForCustomer = function (customerId, callback) {
        var _this = this;
        this.connectionPool.acquire(function (error, connection) {
            var requestLine = "SELECT * FROM invoices WHERE customerId='" + customerId + "'";
            var customerInvoices = [];
            var reqFunc = function (err, rowCount, rows) {
                if (err) {
                    console.log(err);
                    callback([]);
                }
                else {
                    callback(customerInvoices);
                }
                connection.release();
            };
            var request = new tedious_1.Request(requestLine, reqFunc);
            request.on('row', function (columns) {
                customerInvoices.push(_this.parseInvoiceRow(columns));
            });
            connection.execSql(request);
        });
    };
    Database.prototype.canLogin = function (username, password, callback) {
        this.connectionPool.acquire(function (error, connection) {
            var requestLine = "SELECT * FROM users WHERE username='" + username + "' AND password='" + password + "'";
            var reqFunc = function (err, rowCount) {
                if (rowCount > 0) {
                    callback(true);
                }
                else {
                    callback(false);
                }
                connection.release();
            };
            var request = new tedious_1.Request(requestLine, reqFunc);
            connection.execSql(request);
        });
    };
    Database.prototype.getItemsForInvoice = function (invoiceId, callback) {
        var _this = this;
        this.connectionPool.acquire(function (error, connection) {
            var itemsToReturn = [];
            var requestLine = "SELECT description, cost from invoiceItems WHERE invoiceId='" + invoiceId + "'";
            var reqFunc = function (err, rowCount, rows) {
                callback(itemsToReturn);
                connection.release();
            };
            var request = new tedious_1.Request(requestLine, reqFunc);
            request.on('row', function (columns) {
                itemsToReturn.push(_this.parseRow(columns));
            });
            connection.execSql(request);
        });
    };
    Database.prototype.addItem = function (itemToAdd) {
        this.connectionPool.acquire(function (error, connection) {
            var requestLine = "INSERT INTO invoiceItems (invoiceId, description, cost) VALUES ('" + itemToAdd.invoiceId + "', '" + itemToAdd.description + "', '" + itemToAdd.cost + "')";
            var reqFunc = function (err, rowCount, rows) {
                connection.release();
            };
            var request = new tedious_1.Request(requestLine, reqFunc);
            connection.execSql(request);
        });
    };
    Database.prototype.addItems = function (invoiceId, items) {
        var _this = this;
        items.forEach(function (item) {
            _this.addItem(__assign({ invoiceId: invoiceId }, item));
        });
    };
    Database.prototype.deleteAllItems = function (invoiceId, callback) {
        this.connectionPool.acquire(function (error, connection) {
            var requestLine = "\n      DELETE FROM invoiceItems\n      WHERE invoiceId='" + invoiceId + "'\n      ";
            var reqFunc = function (err, rowCount, rows) {
                callback();
                connection.release();
            };
            var request = new tedious_1.Request(requestLine, reqFunc);
            connection.execSql(request);
        });
    };
    Database.prototype.addInvoice = function (invoiceToAdd, callback) {
        var _this = this;
        this.connectionPool.acquire(function (error, connection) {
            var dateIssued = stringUtils_1.convertToSQLDate(invoiceToAdd.dateIssued);
            var isPaid = stringUtils_1.convertToSQLBoolean(invoiceToAdd.paid);
            var isCompleted = stringUtils_1.convertToSQLBoolean(invoiceToAdd.completed);
            var requestLine = "INSERT INTO invoices (dateIssued, customerId, completed, paid) VALUES ('" + dateIssued + "', '" + invoiceToAdd.customerId + "', " + isCompleted + ", " + isPaid + "); SELECT SCOPE_IDENTITY();";
            var reqFunc = function (err, rowCount, rows) {
                if (err) {
                    console.log(err);
                }
                else {
                    _this.addItems(invoiceToAdd.id, invoiceToAdd.items);
                }
                callback(invoiceToAdd);
                connection.release();
            };
            var request = new tedious_1.Request(requestLine, reqFunc);
            request.on('row', function (columns) {
                invoiceToAdd.id = columns[0].value;
            });
            connection.execSql(request);
        });
    };
    Database.prototype.updateInvoiceItems = function (invoiceId, invoiceItems, callback) {
        var _this = this;
        this.deleteAllItems(invoiceId, function () {
            invoiceItems.forEach(function (invoiceItem) {
                _this.addItem(__assign({ invoiceId: invoiceId }, invoiceItem));
            });
            callback();
        });
    };
    Database.prototype.updateInvoice = function (invoiceToUpdate, callback) {
        var _this = this;
        this.connectionPool.acquire(function (error, connection) {
            console.log(invoiceToUpdate.dateIssued);
            var dateIssued = stringUtils_1.convertToSQLDate(invoiceToUpdate.dateIssued);
            console.log(dateIssued);
            var isPaid = stringUtils_1.convertToSQLBoolean(invoiceToUpdate.paid);
            var isCompleted = stringUtils_1.convertToSQLBoolean(invoiceToUpdate.completed);
            var requestLine = "UPDATE invoices SET dateIssued='" + dateIssued + "', completed=" + isCompleted + ", paid=" + isPaid + " WHERE id='" + invoiceToUpdate.id + "'";
            console.log(requestLine);
            var reqFunc = function (err, rowCoutn, rows) {
                if (err) {
                    console.log(err);
                }
                else {
                    _this.updateInvoiceItems(invoiceToUpdate.id, invoiceToUpdate.items, function () {
                        _this.getInvoice(invoiceToUpdate.id, callback);
                    });
                }
                connection.release();
            };
            var request = new tedious_1.Request(requestLine, reqFunc);
            connection.execSql(request);
        });
    };
    Database.prototype.addCustomer = function (customerToAdd, callback) {
        this.connectionPool.acquire(function (error, connection) {
            var requestLine = "INSERT INTO customers (name, email, phone)\n       VALUES ('" + customerToAdd.name + "','" + customerToAdd.email + "','" + customerToAdd.phone + "');\n       SELECT SCOPE_IDENTITY();";
            var reqFunc = function (err, rowCount, rows) {
                if (err) {
                    console.log(err);
                    callback(customerToAdd);
                }
                connection.release();
            };
            var request = new tedious_1.Request(requestLine, reqFunc);
            request.on('row', function (columns) {
                customerToAdd.id = columns[0].value;
                callback(customerToAdd);
            });
            connection.execSql(request);
        });
    };
    Database.prototype.updateCustomer = function (customerToUpdate, callback) {
        var _this = this;
        this.connectionPool.acquire(function (error, connection) {
            var requestLine = "UPDATE customers\n       SET name='" + customerToUpdate.name + "', email='" + customerToUpdate.email + "', phone='" + customerToUpdate.phone + "'\n       WHERE id=" + customerToUpdate.id + "\n      ";
            var reqFunc = function (err, rowCount, row) {
                if (err) {
                    console.log(err);
                    callback(customerToUpdate);
                }
                _this.getCustomer(customerToUpdate.id, function (customer) {
                    callback(customer);
                });
                connection.release();
            };
            var request = new tedious_1.Request(requestLine, reqFunc);
            connection.execSql(request);
        });
    };
    Database.prototype.parseRow = function (rowColumns) {
        var tempCustomer = {};
        rowColumns.forEach(function (column) {
            tempCustomer[column.metadata.colName] = column.value;
        });
        var result = tempCustomer;
        return result;
    };
    Database.prototype.parseInvoiceRow = function (rowColumns) {
        var parsedInvoice = this.parseRow(rowColumns);
        parsedInvoice.items = [];
        return parsedInvoice;
    };
    Database.prototype.parseCustomerRow = function (rowColumns) {
        var resultCustomer = this.parseRow(rowColumns);
        resultCustomer.invoiceIds = [];
        return resultCustomer;
    };
    return Database;
}());
exports.Database = Database;
