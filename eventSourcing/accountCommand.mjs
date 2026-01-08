import { Account } from "./account.mjs";
import { accountCommandDAO } from "./accountCommandDAO.mjs";
import { accountQueryDAO } from "./accountQueryDAO.mjs";
import { queryDatabase } from "./queryDatabase.mjs"
import { accountCache } from "./cache.mjs";
import { Event } from "./event.mjs"
import { eventStore } from "./eventStore.mjs";

export const accountCommand = {
    addAccount(lastName, firstName) {
        const account = new Account(null, lastName, firstName, null);

        const event = new Event(
            "accountAdded",
            account.id,
            account,
        );

        eventStore.addEvent(event)

    },
    saveAccount(id, lastName, firstName) {
        let account = accountQueryDAO.restore(id)
    
        if (account) {
            account.lastName = lastName;
            account.firstName = firstName;
            
            accountCommandDAO.updateAccount(account)
        }
        else {
          console.log("Index not found")
        }
    },
};
