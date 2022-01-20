import { Entity, FunctionPropertyNames } from "@subql/types";
export declare class Event implements Entity {
    constructor(id: string);
    id: string;
    module: string;
    event: string;
    topics: string[];
    parameters: string;
    relatedAccounts: string[];
    blockHeight: number;
    era: number;
    date: Date;
    save(): Promise<void>;
    static remove(id: string): Promise<void>;
    static get(id: string): Promise<Event | undefined>;
    static create(record: Partial<Omit<Event, FunctionPropertyNames<Event>>> & Entity): Event;
}
