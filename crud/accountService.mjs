import { Account } from "./account.mjs";

export const accountService = {
  addAccount(lastName, firstName) {
    const account = new Account(null, lastName, firstName, null);
    insertAccount(account);
  },
  getAccountList() {},
  saveAccount(id, lastName, firstName) {},
  getAccount(id) {},
};
