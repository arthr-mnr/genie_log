import { Account } from "./account.mjs";
import { accountCache } from "./cache.mjs";
import { ACCOUNT_LIST } from "./database.mjs";
import { queryDatabase } from "./queryDatabase.mjs";
import { eventStore } from "./eventStore.mjs";

export const accountQueryDAO = {
    retrieveAccountList() {
        return queryDatabase.accountSummaryList;
    },
    retrieveAccount(id) {
        return accountCache[id]
    },
    restore(id) {
        let account = eventStore.eventList.find(a => a.accountId === id).payload
        return new Account(id, account.lastName, account.firstName, account.creationDate)
    }
};
