"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentHeight = void 0;
const tslib_1 = require("tslib");
const assert_1 = (0, tslib_1.__importDefault)(require("assert"));
class CurrentHeight {
    constructor(id) {
        this.id = id;
    }
    async save() {
        let id = this.id;
        (0, assert_1.default)(id !== null, "Cannot save CurrentHeight entity without an ID");
        await store.set('CurrentHeight', id.toString(), this);
    }
    static async remove(id) {
        (0, assert_1.default)(id !== null, "Cannot remove CurrentHeight entity without an ID");
        await store.remove('CurrentHeight', id.toString());
    }
    static async get(id) {
        (0, assert_1.default)((id !== null && id !== undefined), "Cannot get CurrentHeight entity without an ID");
        const record = await store.get('CurrentHeight', id.toString());
        if (record) {
            return CurrentHeight.create(record);
        }
        else {
            return;
        }
    }
    static create(record) {
        (0, assert_1.default)(typeof record.id === 'string', "id must be provided");
        let entity = new CurrentHeight(record.id);
        Object.assign(entity, record);
        return entity;
    }
}
exports.CurrentHeight = CurrentHeight;
