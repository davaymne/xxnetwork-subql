"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceEvent = void 0;
const tslib_1 = require("tslib");
const assert_1 = (0, tslib_1.__importDefault)(require("assert"));
class BalanceEvent {
    constructor(id) {
        this.id = id;
    }
    async save() {
        let id = this.id;
        (0, assert_1.default)(id !== null, "Cannot save BalanceEvent entity without an ID");
        await store.set('BalanceEvent', id.toString(), this);
    }
    static async remove(id) {
        (0, assert_1.default)(id !== null, "Cannot remove BalanceEvent entity without an ID");
        await store.remove('BalanceEvent', id.toString());
    }
    static async get(id) {
        (0, assert_1.default)((id !== null && id !== undefined), "Cannot get BalanceEvent entity without an ID");
        const record = await store.get('BalanceEvent', id.toString());
        if (record) {
            return BalanceEvent.create(record);
        }
        else {
            return;
        }
    }
    static create(record) {
        (0, assert_1.default)(typeof record.id === 'string', "id must be provided");
        let entity = new BalanceEvent(record.id);
        Object.assign(entity, record);
        return entity;
    }
}
exports.BalanceEvent = BalanceEvent;
