"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountWithdraw = void 0;
const tslib_1 = require("tslib");
const assert_1 = (0, tslib_1.__importDefault)(require("assert"));
class AccountWithdraw {
    constructor(id) {
        this.id = id;
    }
    async save() {
        let id = this.id;
        (0, assert_1.default)(id !== null, "Cannot save AccountWithdraw entity without an ID");
        await store.set('AccountWithdraw', id.toString(), this);
    }
    static async remove(id) {
        (0, assert_1.default)(id !== null, "Cannot remove AccountWithdraw entity without an ID");
        await store.remove('AccountWithdraw', id.toString());
    }
    static async get(id) {
        (0, assert_1.default)((id !== null && id !== undefined), "Cannot get AccountWithdraw entity without an ID");
        const record = await store.get('AccountWithdraw', id.toString());
        if (record) {
            return AccountWithdraw.create(record);
        }
        else {
            return;
        }
    }
    static async getByAccountId(accountId) {
        const records = await store.getByField('AccountWithdraw', 'accountId', accountId);
        return records.map(record => AccountWithdraw.create(record));
    }
    static create(record) {
        (0, assert_1.default)(typeof record.id === 'string', "id must be provided");
        let entity = new AccountWithdraw(record.id);
        Object.assign(entity, record);
        return entity;
    }
}
exports.AccountWithdraw = AccountWithdraw;
