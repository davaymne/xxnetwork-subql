import { Entity, FunctionPropertyNames } from "@subql/types";
export declare class AccountBalance implements Entity {
    constructor(id: string);
    id: string;
    accountId: string;
    balance: bigint;
    date: Date;
    blockHeight: number;
    era: number;
    save(): Promise<void>;
    static remove(id: string): Promise<void>;
    static get(id: string): Promise<AccountBalance | undefined>;
    static getByAccountId(accountId: string): Promise<AccountBalance[] | undefined>;
    static create(record: Partial<Omit<AccountBalance, FunctionPropertyNames<AccountBalance>>> & Entity): AccountBalance;
}
