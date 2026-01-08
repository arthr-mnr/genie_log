import { accountCommand } from "./accountCommand.mjs";
import { accountQuery } from "./accountQuery.mjs";
import { eventStore } from "./eventStore.mjs";

accountCommand.addAccount("Rajot", "Paul")
accountCommand.addAccount("Rajot", "Paulllll")

let liste = eventStore.eventList
console.log(liste)

accountCommand.saveAccount(liste[1].accountId, "Meunier", "Arthur")

let account = liste[1].payload
console.log("Compte :")
console.log(account)

console.log("eventStore :")
console.log(eventStore.eventList)
