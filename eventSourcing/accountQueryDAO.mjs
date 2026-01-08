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
        let account = eventStore.eventList
            .filter(a => a.accountId === id)
            .sort((a, b) => b.creationDate - a.creationDate)[0].payload
        return new Account(id, account.lastName, account.firstName, account.creationDate)
    }
};
