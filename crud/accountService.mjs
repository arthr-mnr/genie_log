import { Account } from "./account.mjs";
import { accountDAO } from "./accountDAO.mjs";
import { ACCOUNT_LIST } from "./database.mjs";

export const accountService = {
  addAccount(lastName, firstName) {
    const account = new Account(null, lastName, firstName, null);
    accountDAO.insertAccount(account);
  },
  getAccountList() {
    return accountDAO.retrieveAccountList();
  },
  saveAccount(id, lastName, firstName) {
    const account = accountDAO.restore(id);
    if (account) {
      account.lastName = lastName;
      account.firstName = firstName;
      accountDAO.updateAccount(account);
    }
    else {
      console.log("Index not found")
    }
  },
  getAccount(id) {
    return accountDAO.retrieveAccount(id);
  },
};
