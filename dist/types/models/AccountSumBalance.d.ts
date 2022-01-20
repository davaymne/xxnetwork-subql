import { Entity, FunctionPropertyNames } from "@subql/types";
export declare class AccountSumBalance implements Entity {
    constructor(id: string);
    id: string;
    totalBalance: bigint;
    blockheight: number;
    date: Date;
    save(): Promise<void>;
    static remove(id: string): Promise<void>;
    static get(id: string): Promise<AccountSumBalance | undefined>;
    static create(record: Partial<Omit<AccountSumBalance, FunctionPropertyNames<AccountSumBalance>>> & Entity): AccountSumBalance;
}
