import { ACCOUNT_LIST } from "./database.mjs";

export const accountQueryDAO = {
    retrieveAccountList() {
        return ACCOUNT_LIST.map(a => ({ id: a.id, lastName: a.lastName, firstName: a.firstName }));
    },
    retrieveAccount(id) {
        const index = ACCOUNT_LIST.findIndex(a => a.id === id);
        let account = ACCOUNT_LIST[index];
        let res = {id: account.id, name: account.lastName + ' ' + account.firstName}
        return res
    },
};
