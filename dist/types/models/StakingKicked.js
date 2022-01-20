"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StakingKicked = void 0;
const tslib_1 = require("tslib");
const assert_1 = (0, tslib_1.__importDefault)(require("assert"));
class StakingKicked {
    constructor(id) {
        this.id = id;
    }
    async save() {
        let id = this.id;
        (0, assert_1.default)(id !== null, "Cannot save StakingKicked entity without an ID");
        await store.set('StakingKicked', id.toString(), this);
    }
    static async remove(id) {
        (0, assert_1.default)(id !== null, "Cannot remove StakingKicked entity without an ID");
        await store.remove('StakingKicked', id.toString());
    }
    static async get(id) {
        (0, assert_1.default)((id !== null && id !== undefined), "Cannot get StakingKicked entity without an ID");
        const record = await store.get('StakingKicked', id.toString());
        if (record) {
            return StakingKicked.create(record);
        }
        else {
            return;
        }
    }
    static create(record) {
        (0, assert_1.default)(typeof record.id === 'string', "id must be provided");
        let entity = new StakingKicked(record.id);
        Object.assign(entity, record);
        return entity;
    }
}
exports.StakingKicked = StakingKicked;
