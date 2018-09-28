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
var QuoteItem = /** @class */ (function (_super) {
    __extends(QuoteItem, _super);
    function QuoteItem(description, cost, quoteId) {
        var _this = _super.call(this, description, cost) || this;
        _this.description = description;
        _this.cost = cost;
        _this.quoteId = quoteId;
        return _this;
    }
    return QuoteItem;
}(Item_1.Item));
exports.QuoteItem = QuoteItem;
