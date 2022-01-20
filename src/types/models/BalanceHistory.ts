// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export class BalanceHistory implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public blockHeight: number;

    public date: Date;

    public era: number;

    public account: string;

    public free: bigint;

    public reserved: bigint;

    public miscFrozen: bigint;

    public feeFrozen: bigint;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save BalanceHistory entity without an ID");
        await store.set('BalanceHistory', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove BalanceHistory entity without an ID");
        await store.remove('BalanceHistory', id.toString());
    }

    static async get(id:string): Promise<BalanceHistory | undefined>{
        assert((id !== null && id !== undefined), "Cannot get BalanceHistory entity without an ID");
        const record = await store.get('BalanceHistory', id.toString());
        if (record){
            return BalanceHistory.create(record);
        }else{
            return;
        }
    }



    static create(record: Partial<Omit<BalanceHistory, FunctionPropertyNames<BalanceHistory>>> & Entity): BalanceHistory {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new BalanceHistory(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
