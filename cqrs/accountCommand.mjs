import { Account } from "./account.mjs";
import { accountCommandDAO } from "./accountCommandDAO.mjs";
import { ACCOUNT_LIST } from "./database.mjs";

export const accountCommand = {
    addAccount(lastName, firstName) {
        const account = new Account(null, lastName, firstName, null);
        accountCommandDAO.insertAccount(account);
    },
    saveAccount(id, lastName, firstName) {
        let index = ACCOUNT_LIST.findIndex(a => a.id == id)
    
        if (index != -1) {
          let account = ACCOUNT_LIST[index];
          account.lastName = lastName;
          account.firstName = firstName;
          accountCommandDAO.updateAccount(account);
        }
        else {
          console.log("Index not found")
        }
    },
};
