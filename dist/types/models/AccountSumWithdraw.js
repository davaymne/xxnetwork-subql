"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountSumWithdraw = void 0;
const tslib_1 = require("tslib");
const assert_1 = (0, tslib_1.__importDefault)(require("assert"));
class AccountSumWithdraw {
    constructor(id) {
        this.id = id;
    }
    async save() {
        let id = this.id;
        (0, assert_1.default)(id !== null, "Cannot save AccountSumWithdraw entity without an ID");
        await store.set('AccountSumWithdraw', id.toString(), this);
    }
    static async remove(id) {
        (0, assert_1.default)(id !== null, "Cannot remove AccountSumWithdraw entity without an ID");
        await store.remove('AccountSumWithdraw', id.toString());
    }
    static async get(id) {
        (0, assert_1.default)((id !== null && id !== undefined), "Cannot get AccountSumWithdraw entity without an ID");
        const record = await store.get('AccountSumWithdraw', id.toString());
        if (record) {
            return AccountSumWithdraw.create(record);
        }
        else {
            return;
        }
    }
    static create(record) {
        (0, assert_1.default)(typeof record.id === 'string', "id must be provided");
        let entity = new AccountSumWithdraw(record.id);
        Object.assign(entity, record);
        return entity;
    }
}
exports.AccountSumWithdraw = AccountSumWithdraw;
