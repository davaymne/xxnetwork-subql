import { Entity, FunctionPropertyNames } from "@subql/types";
export declare class BalanceEvent implements Entity {
    constructor(id: string);
    id: string;
    module: string;
    event: string;
    parameters: string;
    account: string;
    amount: bigint;
    blockHeight: number;
    era: number;
    date: Date;
    save(): Promise<void>;
    static remove(id: string): Promise<void>;
    static get(id: string): Promise<BalanceEvent | undefined>;
    static create(record: Partial<Omit<BalanceEvent, FunctionPropertyNames<BalanceEvent>>> & Entity): BalanceEvent;
}
