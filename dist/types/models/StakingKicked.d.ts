import { Entity, FunctionPropertyNames } from "@subql/types";
export declare class StakingKicked implements Entity {
    constructor(id: string);
    id: string;
    nominator: string;
    validator: string;
    date: Date;
    blockHeight: number;
    era: number;
    save(): Promise<void>;
    static remove(id: string): Promise<void>;
    static get(id: string): Promise<StakingKicked | undefined>;
    static create(record: Partial<Omit<StakingKicked, FunctionPropertyNames<StakingKicked>>> & Entity): StakingKicked;
}
