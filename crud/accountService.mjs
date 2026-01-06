import { Account } from "./account.mjs";
import { accountDAO } from "./accountDAO.mjs";

export const accountService = {
  addAccount(lastName, firstName) {
    const account = new Account(null, lastName, firstName, null);
    accountDAO.insertAccount(account);
  },
  getAccountList() {
    console.log(accountDAO.retrieveAccountList());
  },
  saveAccount(id, lastName, firstName) {},
  getAccount(id) {},
};
