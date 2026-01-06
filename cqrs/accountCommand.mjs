import { Account } from "./account.mjs";
import { accountCommandDAO } from "./accountCommandDAO.mjs";
import { accountQueryDAO } from "./accountQueryDAO.mjs";
import {queryDatabase} from "./queryDatabase.mjs"

export const accountCommand = {
    addAccount(lastName, firstName) {
        const account = new Account(null, lastName, firstName, null);
        accountCommandDAO.insertAccount(account);
        queryDatabase.accountSummaryList.push({
            id: account.id,
            lastName: account.lastName,
            firstName: account.firstName
        });
        console.log(queryDatabase.accountSummaryList)
    },
    saveAccount(id, lastName, firstName) {
        let account = accountQueryDAO.restore(id)
    
        if (account) {
            account.lastName = lastName;
            account.firstName = firstName;
            accountCommandDAO.updateAccount(account);
        }
        else {
          console.log("Index not found")
        }
    },
};
