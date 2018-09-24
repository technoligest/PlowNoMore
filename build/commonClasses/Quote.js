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
var Quote = /** @class */ (function (_super) {
    __extends(Quote, _super);
    function Quote(id, date, customerId, items, validUntil, invoiceId) {
        var _this = _super.call(this, id, date, customerId, items) || this;
        _this.id = id;
        _this.date = date;
        _this.customerId = customerId;
        _this.items = items;
        _this.validUntil = validUntil;
        _this.invoiceId = invoiceId;
        return _this;
    }
    return Quote;
}(AccountingForm_1.AccountingForm));
exports.Quote = Quote;
