// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export class Event implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public module: string;

    public event: string;

    public topics: string[];

    public parameters: string;

    public relatedAccounts: string[];

    public blockHeight: number;

    public era: number;

    public date: Date;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save Event entity without an ID");
        await store.set('Event', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove Event entity without an ID");
        await store.remove('Event', id.toString());
    }

    static async get(id:string): Promise<Event | undefined>{
        assert((id !== null && id !== undefined), "Cannot get Event entity without an ID");
        const record = await store.get('Event', id.toString());
        if (record){
            return Event.create(record);
        }else{
            return;
        }
    }



    static create(record: Partial<Omit<Event, FunctionPropertyNames<Event>>> & Entity): Event {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new Event(record.id);
        Object.assign(entity,record);
        return entity;
    }
}