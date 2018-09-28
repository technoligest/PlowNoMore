"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var AccountingForm_1 = require("./AccountingForm");
var Invoice = /** @class */ (function (_super) {
    __extends(Invoice, _super);
    function Invoice(id, dateIssued, customerId, items, completed, paid) {
        var _this = _super.call(this, id, dateIssued, customerId, items) || this;
        _this.id = id;
        _this.dateIssued = dateIssued;
        _this.customerId = customerId;
        _this.items = items;
        _this.completed = completed;
        _this.paid = paid;
        return _this;
    }
    Invoice.prototype.cloneFrom = function (invoice) {
        var _this = this;
        this.id = invoice.id;
        this.dateIssued = invoice.dateIssued;
        this.customerId = invoice.customerId;
        if (invoice.items) {
            invoice.items.forEach(function (item) {
                _this.items.push(item);
            });
        }
        ;
        this.items = invoice.items;
        this.completed = invoice.completed;
        this.paid = invoice.paid;
    };
    return Invoice;
}(AccountingForm_1.AccountingForm));
exports.Invoice = Invoice;
