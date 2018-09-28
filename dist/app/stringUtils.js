"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function convertToSQLDate(jsDate) {
    console.log('oldDate:' + jsDate);
    var result = !jsDate ? '' : new Date(jsDate).toISOString().slice(0, 19).replace('T', ' ');
    console.log('newDate:' + result);
    return result;
}
exports.convertToSQLDate = convertToSQLDate;
function convertToSQLBoolean(jsBoolean) {
    return jsBoolean ? '1' : '0';
}
exports.convertToSQLBoolean = convertToSQLBoolean;
