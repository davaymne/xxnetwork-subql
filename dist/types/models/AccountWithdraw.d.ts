import { Entity, FunctionPropertyNames } from "@subql/types";
export declare class AccountWithdraw implements Entity {
    constructor(id: string);
    id: string;
    accountId: string;
    withdraw: bigint;
    date: Date;
    blockHeight: number;
    era: number;
    save(): Promise<void>;
    static remove(id: string): Promise<void>;
    static get(id: string): Promise<AccountWithdraw | undefined>;
    static getByAccountId(accountId: string): Promise<AccountWithdraw[] | undefined>;
    static create(record: Partial<Omit<AccountWithdraw, FunctionPropertyNames<AccountWithdraw>>> & Entity): AccountWithdraw;
}
