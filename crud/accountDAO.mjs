import { Account } from "./account.mjs";
import { ACCOUNT_LIST } from "./database.mjs";

export const accountDAO = {
  insertAccount(account) {
    ACCOUNT_LIST.push(account);
    console.log("Contenu de la base de données :");
    console.log(ACCOUNT_LIST);
  },
  retrieveAccountList() {
    return ACCOUNT_LIST.map(a => ({ id: a.id, lastName: a.lastName, firstName: a.firstName }));
  },
  updateAccount(account) {
    const index = ACCOUNT_LIST.findIndex(a => a.id === account.id);
    ACCOUNT_LIST[index] = account;
    console.log("Contenu mis à jour :");
    console.log(ACCOUNT_LIST);
  },
  retrieveAccount(id) {
    const index = ACCOUNT_LIST.findIndex(a => a.id === id);
    let account = ACCOUNT_LIST[index];
    let res = {id: account.id, name: account.lastName + ' ' + account.firstName}
    return res
  },
  restore(id) {
    let account = ACCOUNT_LIST.find(a => a.id == id)
    return new Account(account.id, account.lastName, account.firstName, account.creationDate)
  }
};