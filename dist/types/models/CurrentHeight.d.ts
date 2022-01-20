import { Entity, FunctionPropertyNames } from "@subql/types";
export declare class CurrentHeight implements Entity {
    constructor(id: string);
    id: string;
    blockHeight: number;
    era: number;
    save(): Promise<void>;
    static remove(id: string): Promise<void>;
    static get(id: string): Promise<CurrentHeight | undefined>;
    static create(record: Partial<Omit<CurrentHeight, FunctionPropertyNames<CurrentHeight>>> & Entity): CurrentHeight;
}
