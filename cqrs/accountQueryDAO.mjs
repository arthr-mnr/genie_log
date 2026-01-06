import { Account } from "./account.mjs";
import { accountCache } from "./cache.mjs";
import { ACCOUNT_LIST } from "./database.mjs";
import { queryDatabase } from "./queryDatabase.mjs";

export const accountQueryDAO = {
    retrieveAccountList() {
        return queryDatabase.accountSummaryList;
    },
    retrieveAccount(id) {
        /* const index = ACCOUNT_LIST.findIndex(a => a.id === id);
        let account = ACCOUNT_LIST[index];
        let res = {id: account.id, name: account.lastName + ' ' + account.firstName}
        return res */
        return accountCache[id]
    },
    restore(id) {
        let account = ACCOUNT_LIST.find(a => a.id == id)
        return new Account(account.id, account.lastName, account.firstName, account.creationDate)
    }
};
