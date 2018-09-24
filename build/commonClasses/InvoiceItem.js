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
var Item_1 = require("./Item");
var InvoiceItem = /** @class */ (function (_super) {
    __extends(InvoiceItem, _super);
    function InvoiceItem(description, cost, invoiceId) {
        var _this = _super.call(this, description, cost) || this;
        _this.description = description;
        _this.cost = cost;
        _this.invoiceId = invoiceId;
        return _this;
    }
    return InvoiceItem;
}(Item_1.Item));
exports.InvoiceItem = InvoiceItem;
