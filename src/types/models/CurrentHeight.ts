// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export class CurrentHeight implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public blockHeight: number;

    public era: number;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save CurrentHeight entity without an ID");
        await store.set('CurrentHeight', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove CurrentHeight entity without an ID");
        await store.remove('CurrentHeight', id.toString());
    }

    static async get(id:string): Promise<CurrentHeight | undefined>{
        assert((id !== null && id !== undefined), "Cannot get CurrentHeight entity without an ID");
        const record = await store.get('CurrentHeight', id.toString());
        if (record){
            return CurrentHeight.create(record);
        }else{
            return;
        }
    }



    static create(record: Partial<Omit<CurrentHeight, FunctionPropertyNames<CurrentHeight>>> & Entity): CurrentHeight {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new CurrentHeight(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
