// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export class StakingKicked implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public nominator: string;

    public validator: string;

    public date: Date;

    public blockHeight: number;

    public era: number;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save StakingKicked entity without an ID");
        await store.set('StakingKicked', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove StakingKicked entity without an ID");
        await store.remove('StakingKicked', id.toString());
    }

    static async get(id:string): Promise<StakingKicked | undefined>{
        assert((id !== null && id !== undefined), "Cannot get StakingKicked entity without an ID");
        const record = await store.get('StakingKicked', id.toString());
        if (record){
            return StakingKicked.create(record);
        }else{
            return;
        }
    }



    static create(record: Partial<Omit<StakingKicked, FunctionPropertyNames<StakingKicked>>> & Entity): StakingKicked {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new StakingKicked(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
