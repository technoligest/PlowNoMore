"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CustomerSummary = /** @class */ (function () {
    function CustomerSummary(id, name) {
        this.id = id;
        this.name = name;
    }
    return CustomerSummary;
}());
exports.CustomerSummary = CustomerSummary;
var Customer = /** @class */ (function () {
    function Customer(id, name, email, phone, invoiceIds, quoteIds) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.invoiceIds = invoiceIds;
        this.quoteIds = quoteIds;
    }
    Object.defineProperty(Customer.prototype, "summary", {
        get: function () {
            return new CustomerSummary(this.id, this.name);
        },
        enumerable: true,
        configurable: true
    });
    return Customer;
}());
exports.Customer = Customer;
