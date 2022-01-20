"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceHistory = void 0;
const tslib_1 = require("tslib");
const assert_1 = (0, tslib_1.__importDefault)(require("assert"));
class BalanceHistory {
    constructor(id) {
        this.id = id;
    }
    async save() {
        let id = this.id;
        (0, assert_1.default)(id !== null, "Cannot save BalanceHistory entity without an ID");
        await store.set('BalanceHistory', id.toString(), this);
    }
    static async remove(id) {
        (0, assert_1.default)(id !== null, "Cannot remove BalanceHistory entity without an ID");
        await store.remove('BalanceHistory', id.toString());
    }
    static async get(id) {
        (0, assert_1.default)((id !== null && id !== undefined), "Cannot get BalanceHistory entity without an ID");
        const record = await store.get('BalanceHistory', id.toString());
        if (record) {
            return BalanceHistory.create(record);
        }
        else {
            return;
        }
    }
    static create(record) {
        (0, assert_1.default)(typeof record.id === 'string', "id must be provided");
        let entity = new BalanceHistory(record.id);
        Object.assign(entity, record);
        return entity;
    }
}
exports.BalanceHistory = BalanceHistory;
