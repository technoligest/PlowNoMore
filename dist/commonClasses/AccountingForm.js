"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AccountingForm = /** @class */ (function () {
    function AccountingForm(id, dateIssued, customerId, items) {
        this.id = id;
        this.dateIssued = dateIssued;
        this.customerId = customerId;
        this.items = items;
    }
    Object.defineProperty(AccountingForm.prototype, "amount", {
        get: function () {
            var totalCost = 0;
            this.items.forEach(function (item) {
                totalCost += item.cost;
            });
            console.log(totalCost);
            return totalCost;
        },
        enumerable: true,
        configurable: true
    });
    return AccountingForm;
}());
exports.AccountingForm = AccountingForm;
