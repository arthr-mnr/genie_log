import { ACCOUNT_LIST } from "./database.mjs";
import { Event } from "./event.mjs";
import { eventStore } from "./eventStore.mjs";

export const accountCommandDAO = {
    insertAccount(account) {
        ACCOUNT_LIST.push(account);
        console.log("Contenu de la base de données :");
        console.log(ACCOUNT_LIST);
    },
    updateAccount(account) {    
        const event = new Event(
            "accountModified",
            account.id,
            account,
        );

        eventStore.addEvent(event)
    },
};
