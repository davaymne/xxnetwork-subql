// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export class AccountSumWithdraw implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public totalWithdraw: bigint;

    public blockheight: number;

    public date: Date;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save AccountSumWithdraw entity without an ID");
        await store.set('AccountSumWithdraw', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove AccountSumWithdraw entity without an ID");
        await store.remove('AccountSumWithdraw', id.toString());
    }

    static async get(id:string): Promise<AccountSumWithdraw | undefined>{
        assert((id !== null && id !== undefined), "Cannot get AccountSumWithdraw entity without an ID");
        const record = await store.get('AccountSumWithdraw', id.toString());
        if (record){
            return AccountSumWithdraw.create(record);
        }else{
            return;
        }
    }



    static create(record: Partial<Omit<AccountSumWithdraw, FunctionPropertyNames<AccountSumWithdraw>>> & Entity): AccountSumWithdraw {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new AccountSumWithdraw(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
