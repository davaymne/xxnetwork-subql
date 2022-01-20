// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export class BalanceEvent implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public module: string;

    public event: string;

    public parameters: string;

    public account: string;

    public amount: bigint;

    public blockHeight: number;

    public era: number;

    public date: Date;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save BalanceEvent entity without an ID");
        await store.set('BalanceEvent', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove BalanceEvent entity without an ID");
        await store.remove('BalanceEvent', id.toString());
    }

    static async get(id:string): Promise<BalanceEvent | undefined>{
        assert((id !== null && id !== undefined), "Cannot get BalanceEvent entity without an ID");
        const record = await store.get('BalanceEvent', id.toString());
        if (record){
            return BalanceEvent.create(record);
        }else{
            return;
        }
    }



    static create(record: Partial<Omit<BalanceEvent, FunctionPropertyNames<BalanceEvent>>> & Entity): BalanceEvent {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new BalanceEvent(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
