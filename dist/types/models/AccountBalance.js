"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountBalance = void 0;
const tslib_1 = require("tslib");
const assert_1 = (0, tslib_1.__importDefault)(require("assert"));
class AccountBalance {
    constructor(id) {
        this.id = id;
    }
    async save() {
        let id = this.id;
        (0, assert_1.default)(id !== null, "Cannot save AccountBalance entity without an ID");
        await store.set('AccountBalance', id.toString(), this);
    }
    static async remove(id) {
        (0, assert_1.default)(id !== null, "Cannot remove AccountBalance entity without an ID");
        await store.remove('AccountBalance', id.toString());
    }
    static async get(id) {
        (0, assert_1.default)((id !== null && id !== undefined), "Cannot get AccountBalance entity without an ID");
        const record = await store.get('AccountBalance', id.toString());
        if (record) {
            return AccountBalance.create(record);
        }
        else {
            return;
        }
    }
    static async getByAccountId(accountId) {
        const records = await store.getByField('AccountBalance', 'accountId', accountId);
        return records.map(record => AccountBalance.create(record));
    }
    static create(record) {
        (0, assert_1.default)(typeof record.id === 'string', "id must be provided");
        let entity = new AccountBalance(record.id);
        Object.assign(entity, record);
        return entity;
    }
}
exports.AccountBalance = AccountBalance;
