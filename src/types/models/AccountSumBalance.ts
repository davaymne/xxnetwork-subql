// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export class AccountSumBalance implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public totalBalance: bigint;

    public blockheight: number;

    public date: Date;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save AccountSumBalance entity without an ID");
        await store.set('AccountSumBalance', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove AccountSumBalance entity without an ID");
        await store.remove('AccountSumBalance', id.toString());
    }

    static async get(id:string): Promise<AccountSumBalance | undefined>{
        assert((id !== null && id !== undefined), "Cannot get AccountSumBalance entity without an ID");
        const record = await store.get('AccountSumBalance', id.toString());
        if (record){
            return AccountSumBalance.create(record);
        }else{
            return;
        }
    }



    static create(record: Partial<Omit<AccountSumBalance, FunctionPropertyNames<AccountSumBalance>>> & Entity): AccountSumBalance {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new AccountSumBalance(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
