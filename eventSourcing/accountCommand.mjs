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
        // accountCommandDAO.insertAccount(account);

        const event = new Event(
            "accountAdded",
            account.id,
            account,
        );

        eventStore.addEvent(event)

        queryDatabase.accountSummaryList.push({
            id: account.id,
            lastName: account.lastName,
            firstName: account.firstName
        });
        console.log(queryDatabase.accountSummaryList)

        accountCache[account.id] = {
            name: account.lastName + ' ' + account.firstName
        };
        console.log("Cache :")
        console.log(accountCache)
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

        const index = queryDatabase.accountSummaryList.findIndex(a => a.id === id);
        queryDatabase.accountSummaryList[index].lastName = lastName;
        queryDatabase.accountSummaryList[index].firstName = firstName;
        console.log("Contenu de queryDatabase mis à jour :")
        console.log(queryDatabase.accountSummaryList)

        accountCache[id] = {name: lastName + ' ' + firstName}
        console.log("Contenu du cache mis à jour :")
        console.log(accountCache)
    },
};
