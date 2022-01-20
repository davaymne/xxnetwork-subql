"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleEventWithdraw = exports.handleSumWithdraw = exports.handleEventDeposit = exports.handleSumDeposit = exports.handleSumRewarded = exports.handleSumReward = exports.handleStakingRewarded = exports.handleStakingReward = exports.handleEventKicked = exports.handleBlock = exports.handleEvent = exports.balanceHistory = exports.balanceEvent = exports.extractRelatedAccountsFromEvent = void 0;
const types_1 = require("../types");
const lodash_1 = require("lodash");
const ACCOUNT_TYPES = ["Address", "LookupSource", "AccountId"];
const BALANCE_EVENTS = ["balances.Deposit", "balances.Withdraw", "staking.Rewarded"];
function getEventId(event) {
    return `${event.block.block.header.number.toString()}-${event.idx.toString()}`;
}
function extractRelatedAccountsFromEvent(event) {
    const accounts = [];
    let extrinsic = event.extrinsic ? event.extrinsic.extrinsic : null;
    if (!extrinsic) {
        return accounts;
    }
    let signer = extrinsic.signer;
    if (extrinsic.isSigned && signer) {
        accounts.push(signer.toString());
    }
    for (const [key, typeDef] of Object.entries(event.event.data.typeDef)) {
        if (ACCOUNT_TYPES.includes(typeDef.type)) {
            const index = Number(key);
            accounts.push(event.event.data[index].toString());
        }
    }
    return (0, lodash_1.uniq)(accounts);
}
exports.extractRelatedAccountsFromEvent = extractRelatedAccountsFromEvent;
async function balanceEvent(event) {
    const { event: { data: [account, amount] } } = event;
    const eventId = getEventId(event);
    let record = await types_1.BalanceEvent.get(eventId);
    if (record === undefined) {
        record = new types_1.BalanceEvent(eventId);
        record.module = event.event.section;
        record.event = event.event.method;
        record.parameters = event.event.data.toString();
        record.account = account.toString();
        record.amount = amount.toBigInt();
        record.date = event.block.timestamp;
        record.blockHeight = event.block.block.header.number.toNumber();
        record.era = Math.trunc(record.blockHeight / 14400);
        await record.save();
    }
}
exports.balanceEvent = balanceEvent;
async function balanceHistory(event) {
    const eventId = getEventId(event);
    let record = await types_1.BalanceHistory.get(eventId);
    if (record === undefined) {
        record = new types_1.BalanceHistory(eventId);
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
exports.balanceHistory = balanceHistory;
async function handleEvent(event) {
    const eventId = getEventId(event);
    let record = await types_1.Event.get(eventId);
    const relatedAccounts = extractRelatedAccountsFromEvent(event);
    if (record === undefined) {
        record = new types_1.Event(eventId);
        record.module = event.event.section;
        record.event = event.event.method;
        record.topics = event.topics.map(topic => topic.toString());
        record.parameters = event.event.data.toString();
        record.date = event.block.timestamp;
        record.relatedAccounts = relatedAccounts;
        record.blockHeight = event.block.block.header.number.toNumber();
        record.era = Math.trunc(record.blockHeight / 14400);
        await record.save();
    }
    if (BALANCE_EVENTS.includes(record.module + "." + record.event)) {
        logger.info("Event: " + record.event);
        await balanceEvent(event);
        await balanceHistory(event);
    }
}
exports.handleEvent = handleEvent;
async function handleBlock(block) {
    let entity = new types_1.CurrentHeight(block.block.header.hash.toString());
    entity.blockHeight = block.block.header.number.toNumber();
    entity.era = Math.trunc(entity.blockHeight / 14400);
    //entity.date = block.block.timestamp;
    await entity.save();
}
exports.handleBlock = handleBlock;
async function handleEventKicked(event) {
    const { event: { data: [nominator, validator] } } = event;
    const entity = new types_1.StakingKicked(`${event.block.block.header.number}-${event.idx.toString()}`);
    entity.nominator = nominator.toString();
    entity.validator = validator.toString();
    entity.date = event.block.timestamp;
    entity.blockHeight = event.block.block.header.number.toNumber();
    entity.era = Math.trunc(entity.blockHeight / 14400);
    logger.info("Block: " + entity.blockHeight + " Era: " + entity.era + " Nominator: " + entity.nominator + " Validator: " + entity.validator);
    await entity.save();
}
exports.handleEventKicked = handleEventKicked;
async function handleStakingReward(event) {
    await handleStakingRewarded(event);
}
exports.handleStakingReward = handleStakingReward;
async function handleStakingRewarded(event) {
    const { event: { data: [account, newReward] } } = event;
    const entity = new types_1.StakingReward(`${event.block.block.header.number}-${event.idx.toString()}`);
    entity.accountId = account.toString();
    entity.balance = newReward.toBigInt();
    entity.date = event.block.timestamp;
    entity.blockHeight = event.block.block.header.number.toNumber();
    entity.era = Math.trunc(entity.blockHeight / 14400);
    logger.info("Block: " + entity.blockHeight + " Era: " + entity.era + " Account: " + entity.accountId + " Rewarded: " + entity.balance);
    await entity.save();
}
exports.handleStakingRewarded = handleStakingRewarded;
function createSumReward(accountId) {
    const entity = new types_1.SumReward(accountId);
    entity.totalReward = BigInt(0);
    return entity;
}
async function handleSumReward(event) {
    await handleSumRewarded(event);
}
exports.handleSumReward = handleSumReward;
async function handleSumRewarded(event) {
    const { event: { data: [account, newReward] } } = event;
    let entity = await types_1.SumReward.get(account.toString());
    if (entity === undefined) {
        entity = createSumReward(account.toString());
    }
    entity.totalReward = entity.totalReward + newReward.toBigInt();
    entity.date = event.block.timestamp;
    entity.blockheight = event.block.block.header.number.toNumber();
    await entity.save();
}
exports.handleSumRewarded = handleSumRewarded;
function createSumBalance(accountId) {
    const entity = new types_1.AccountSumBalance(accountId);
    entity.totalBalance = BigInt(0);
    return entity;
}
async function handleSumDeposit(event) {
    const { event: { data: [account, newDeposit] } } = event;
    let entity = await types_1.AccountSumBalance.get(account.toString());
    if (entity === undefined) {
        entity = createSumBalance(account.toString());
    }
    entity.totalBalance = entity.totalBalance + newDeposit.toBigInt();
    entity.date = event.block.timestamp;
    entity.blockheight = event.block.block.header.number.toNumber();
    await entity.save();
}
exports.handleSumDeposit = handleSumDeposit;
async function handleEventDeposit(event) {
    const { event: { data: [account, newDeposit] } } = event;
    const entity = new types_1.AccountBalance(`${event.block.block.header.number}-${event.idx.toString()}`);
    entity.accountId = account.toString();
    entity.balance = newDeposit.toBigInt();
    entity.date = event.block.timestamp;
    entity.blockHeight = event.block.block.header.number.toNumber();
    entity.era = Math.trunc(entity.blockHeight / 14400);
    logger.info("Account: " + entity.accountId + " Deposit: " + entity.balance);
    await entity.save();
}
exports.handleEventDeposit = handleEventDeposit;
function createSumWithdraw(accountId) {
    const entity = new types_1.AccountSumWithdraw(accountId);
    entity.totalWithdraw = BigInt(0);
    return entity;
}
async function handleSumWithdraw(event) {
    const { event: { data: [account, newWithdraw] } } = event;
    let entity = await types_1.AccountSumWithdraw.get(account.toString());
    if (entity === undefined) {
        entity = createSumWithdraw(account.toString());
    }
    entity.totalWithdraw = entity.totalWithdraw + newWithdraw.toBigInt();
    entity.date = event.block.timestamp;
    entity.blockheight = event.block.block.header.number.toNumber();
    await entity.save();
}
exports.handleSumWithdraw = handleSumWithdraw;
async function handleEventWithdraw(event) {
    const { event: { data: [account, newWithdraw] } } = event;
    const entity = new types_1.AccountWithdraw(`${event.block.block.header.number}-${event.idx.toString()}`);
    entity.accountId = account.toString();
    entity.withdraw = newWithdraw.toBigInt();
    entity.date = event.block.timestamp;
    entity.blockHeight = event.block.block.header.number.toNumber();
    entity.era = Math.trunc(entity.blockHeight / 14400);
    logger.info("Account: " + entity.accountId + " Withdraw: " + entity.withdraw);
    await entity.save();
}
exports.handleEventWithdraw = handleEventWithdraw;
