import { Entity, FunctionPropertyNames } from "@subql/types";
export declare class AccountSumWithdraw implements Entity {
    constructor(id: string);
    id: string;
    totalWithdraw: bigint;
    blockheight: number;
    date: Date;
    save(): Promise<void>;
    static remove(id: string): Promise<void>;
    static get(id: string): Promise<AccountSumWithdraw | undefined>;
    static create(record: Partial<Omit<AccountSumWithdraw, FunctionPropertyNames<AccountSumWithdraw>>> & Entity): AccountSumWithdraw;
}
