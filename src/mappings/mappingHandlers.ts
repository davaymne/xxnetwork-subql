import {SubstrateEvent, SubstrateBlock} from "@subql/types";
import {BalanceHistory, BalanceEvent, Event, StakingReward, SumReward, AccountBalance, AccountSumBalance, AccountWithdraw, AccountSumWithdraw, StakingKicked, CurrentHeight} from "../types";
import {Balance} from "@polkadot/types/interfaces";
import { uniq, flatten } from "lodash";

const ACCOUNT_TYPES= ["Address","LookupSource","AccountId"]
const BALANCE_EVENTS= ["balances.Deposit", "balances.Withdraw", "staking.Rewarded"]

function getEventId(event: SubstrateEvent): string {
    return `${event.block.block.header.number.toString()}-${event.idx.toString()}`
}

export function extractRelatedAccountsFromEvent (event: SubstrateEvent): string[]{
    const accounts: string[] = [];
    let extrinsic = event.extrinsic? event.extrinsic.extrinsic: null;
    if(!extrinsic){
        return accounts
    }
    let signer = extrinsic.signer
    if (extrinsic.isSigned && signer) {
        accounts.push(signer.toString())
    }
    for (const [key, typeDef] of Object.entries(event.event.data.typeDef)){
        if(ACCOUNT_TYPES.includes(typeDef.type)){
            const index = Number(key);
            accounts.push(event.event.data[index].toString());
        }
    }
    return uniq(accounts);
}

export async function balanceEvent(event: SubstrateEvent): Promise<void> {
    const {event: {data: [account, amount]}} = event;
    const eventId = getEventId(event);
    let record = await BalanceEvent.get(eventId);
    if(record === undefined){
        record = new BalanceEvent(eventId);
        record.module = event.event.section;
        record.event = event.event.method;
        record.parameters = event.event.data.toString();
        record.account = account.toString();
        record.amount = (amount as Balance).toBigInt(); 
        record.date = event.block.timestamp;
        record.blockHeight = event.block.block.header.number.toNumber();
        record.era = Math.trunc(record.blockHeight / 14400);
        await record.save();
    }
}

export async function balanceHistory(event: SubstrateEvent): Promise<void> {
    const eventId = getEventId(event);
    let record = await BalanceHistory.get(eventId);
    if(record === undefined){
        record = new BalanceHistory(eventId);
        record.account = event.event.data[0].toString();
        const b = await api.query.system.account(record.account);
        const balanceObj = JSON.parse(b.toString());
        record.free = BigInt(balanceObj.data.free);
	record.reserved = BigInt(balanceObj.data.reserved);
	record.miscFrozen = BigInt(balanceObj.data.miscFrozen);
        record.feeFrozen = BigInt(balanceObj.data.feeFrozen);		
        //logger.info("Account:Balance " + record.account + ":" + record.free);
        record.date = event.block.timestamp;
        record.blockHeight = event.block.block.header.number.toNumber();
        record.era = Math.trunc(record.blockHeight / 14400);
        await record.save();
    }
}

export async function handleEvent(event: SubstrateEvent): Promise<void> {
    const eventId = getEventId(event);
    let record = await Event.get(eventId);
    const relatedAccounts = extractRelatedAccountsFromEvent(event);
    if(record === undefined){
        record = new Event(eventId);
        record.module = event.event.section;
        record.event = event.event.method;
        record.topics = event.topics.map(topic=>topic.toString());
        record.parameters = event.event.data.toString();
        record.date = event.block.timestamp;
        record.relatedAccounts = relatedAccounts;
        record.blockHeight = event.block.block.header.number.toNumber();
        record.era = Math.trunc(record.blockHeight / 14400);
        await record.save();
    }
    if(BALANCE_EVENTS.includes(record.module + "." + record.event)) {
      logger.info("Event: " + record.event) 
      await balanceEvent(event);
      await balanceHistory(event); 
    }

}

export async function handleBlock(block: SubstrateBlock): Promise<void> {
    let entity = new CurrentHeight(block.block.header.hash.toString());
    entity.blockHeight = block.block.header.number.toNumber();
    entity.era = Math.trunc(entity.blockHeight / 14400);
    //entity.date = block.block.timestamp;
    await entity.save();
}

export async function handleEventKicked(event: SubstrateEvent): Promise<void> {
    const {event: {data: [nominator, validator]}} = event;
    const entity = new StakingKicked(`${event.block.block.header.number}-${event.idx.toString()}`);
    entity.nominator = nominator.toString();
    entity.validator = validator.toString();
    entity.date = event.block.timestamp;
    entity.blockHeight = event.block.block.header.number.toNumber();
    entity.era = Math.trunc(entity.blockHeight / 14400);
    logger.info("Block: " + entity.blockHeight + " Era: " + entity.era + " Nominator: " + entity.nominator + " Validator: " + entity.validator);
    await entity.save();
}

export async function handleStakingReward(event: SubstrateEvent): Promise<void> {
    await handleStakingRewarded(event)
}

export async function handleStakingRewarded(event: SubstrateEvent): Promise<void> {
    const {event: {data: [account, newReward]}} = event;
    const entity = new StakingReward(`${event.block.block.header.number}-${event.idx.toString()}`);
    entity.accountId = account.toString();
    entity.balance = (newReward as Balance).toBigInt();
    entity.date = event.block.timestamp;
    entity.blockHeight = event.block.block.header.number.toNumber();
    entity.era = Math.trunc(entity.blockHeight / 14400);
    logger.info("Block: " + entity.blockHeight + " Era: " + entity.era + " Account: " + entity.accountId + " Rewarded: " + entity.balance);
    
    await entity.save();
}

function createSumReward(accountId: string): SumReward {
    const entity = new SumReward(accountId);
    entity.totalReward = BigInt(0);
    return entity;
}

export async function handleSumReward(event: SubstrateEvent): Promise<void> {
    await handleSumRewarded(event)
}

export async function handleSumRewarded(event: SubstrateEvent): Promise<void> {
    const {event: {data: [account, newReward]}} = event;

    let entity = await SumReward.get(account.toString());
    if (entity === undefined){
        entity = createSumReward(account.toString());
    }
    entity.totalReward = entity.totalReward + (newReward as Balance).toBigInt();
    entity.date = event.block.timestamp;
    entity.blockheight = event.block.block.header.number.toNumber();
    await entity.save();
}

function createSumBalance(accountId: string): AccountSumBalance {
    const entity = new AccountSumBalance(accountId);
    entity.totalBalance = BigInt(0);
    return entity;
}

export async function handleSumDeposit(event: SubstrateEvent): Promise<void> {
    const {event: {data: [account, newDeposit]}} = event;

    let entity = await AccountSumBalance.get(account.toString());
    if (entity === undefined){
        entity = createSumBalance(account.toString());
    }
    entity.totalBalance = entity.totalBalance + (newDeposit as Balance).toBigInt();
    entity.date = event.block.timestamp;
    entity.blockheight = event.block.block.header.number.toNumber();
    await entity.save();
}

export async function handleEventDeposit(event: SubstrateEvent): Promise<void> {
    const {event: {data: [account, newDeposit]}} = event;
    const entity = new AccountBalance(`${event.block.block.header.number}-${event.idx.toString()}`);
    entity.accountId = account.toString();
    entity.balance = (newDeposit as Balance).toBigInt();
    entity.date = event.block.timestamp;
    entity.blockHeight = event.block.block.header.number.toNumber();
    entity.era = Math.trunc(entity.blockHeight / 14400);
    logger.info("Account: " + entity.accountId + " Deposit: " + entity.balance);

    await entity.save();
}

function createSumWithdraw(accountId: string): AccountSumWithdraw {
    const entity = new AccountSumWithdraw(accountId);
    entity.totalWithdraw = BigInt(0);
    return entity;
}

export async function handleSumWithdraw(event: SubstrateEvent): Promise<void> {
    const {event: {data: [account, newWithdraw]}} = event;

    let entity = await AccountSumWithdraw.get(account.toString());
    if (entity === undefined){
        entity = createSumWithdraw(account.toString());
    }
    entity.totalWithdraw = entity.totalWithdraw + (newWithdraw as Balance).toBigInt();
    entity.date = event.block.timestamp;
    entity.blockheight = event.block.block.header.number.toNumber();
    await entity.save();
}

export async function handleEventWithdraw(event: SubstrateEvent): Promise<void> {
    const {event: {data: [account, newWithdraw]}} = event;
    const entity = new AccountWithdraw(`${event.block.block.header.number}-${event.idx.toString()}`);
    entity.accountId = account.toString();
    entity.withdraw = (newWithdraw as Balance).toBigInt();
    entity.date = event.block.timestamp;
    entity.blockHeight = event.block.block.header.number.toNumber();
    entity.era = Math.trunc(entity.blockHeight / 14400);
    logger.info("Account: " + entity.accountId + " Withdraw: " + entity.withdraw);

    await entity.save();
}
