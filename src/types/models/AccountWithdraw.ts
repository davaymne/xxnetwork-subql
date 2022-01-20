// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export class AccountWithdraw implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public accountId: string;

    public withdraw: bigint;

    public date: Date;

    public blockHeight: number;

    public era: number;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save AccountWithdraw entity without an ID");
        await store.set('AccountWithdraw', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove AccountWithdraw entity without an ID");
        await store.remove('AccountWithdraw', id.toString());
    }

    static async get(id:string): Promise<AccountWithdraw | undefined>{
        assert((id !== null && id !== undefined), "Cannot get AccountWithdraw entity without an ID");
        const record = await store.get('AccountWithdraw', id.toString());
        if (record){
            return AccountWithdraw.create(record);
        }else{
            return;
        }
    }


    static async getByAccountId(accountId: string): Promise<AccountWithdraw[] | undefined>{
      
      const records = await store.getByField('AccountWithdraw', 'accountId', accountId);
      return records.map(record => AccountWithdraw.create(record));
      
    }


    static create(record: Partial<Omit<AccountWithdraw, FunctionPropertyNames<AccountWithdraw>>> & Entity): AccountWithdraw {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new AccountWithdraw(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
