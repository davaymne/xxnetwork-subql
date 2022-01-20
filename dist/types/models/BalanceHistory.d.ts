import { Entity, FunctionPropertyNames } from "@subql/types";
export declare class BalanceHistory implements Entity {
    constructor(id: string);
    id: string;
    blockHeight: number;
    date: Date;
    era: number;
    account: string;
    free: bigint;
    reserved: bigint;
    miscFrozen: bigint;
    feeFrozen: bigint;
    save(): Promise<void>;
    static remove(id: string): Promise<void>;
    static get(id: string): Promise<BalanceHistory | undefined>;
    static create(record: Partial<Omit<BalanceHistory, FunctionPropertyNames<BalanceHistory>>> & Entity): BalanceHistory;
}
