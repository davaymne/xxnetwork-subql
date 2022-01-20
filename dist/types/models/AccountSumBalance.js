"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountSumBalance = void 0;
const tslib_1 = require("tslib");
const assert_1 = (0, tslib_1.__importDefault)(require("assert"));
class AccountSumBalance {
    constructor(id) {
        this.id = id;
    }
    async save() {
        let id = this.id;
        (0, assert_1.default)(id !== null, "Cannot save AccountSumBalance entity without an ID");
        await store.set('AccountSumBalance', id.toString(), this);
    }
    static async remove(id) {
        (0, assert_1.default)(id !== null, "Cannot remove AccountSumBalance entity without an ID");
        await store.remove('AccountSumBalance', id.toString());
    }
    static async get(id) {
        (0, assert_1.default)((id !== null && id !== undefined), "Cannot get AccountSumBalance entity without an ID");
        const record = await store.get('AccountSumBalance', id.toString());
        if (record) {
            return AccountSumBalance.create(record);
        }
        else {
            return;
        }
    }
    static create(record) {
        (0, assert_1.default)(typeof record.id === 'string', "id must be provided");
        let entity = new AccountSumBalance(record.id);
        Object.assign(entity, record);
        return entity;
    }
}
exports.AccountSumBalance = AccountSumBalance;
