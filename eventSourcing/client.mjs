import { accountCommand } from "./accountCommand.mjs";
import { accountQuery } from "./accountQuery.mjs";
import { accountQueryDAO } from "./accountQueryDAO.mjs";
import { eventStore } from "./eventStore.mjs";

accountCommand.addAccount("Rajot", "Paul")
accountCommand.addAccount("Rajot", "Paulllll")

let liste = eventStore.eventList
console.log(liste)

accountCommand.saveAccount(liste[1].accountId, "Meunier", "Arthur")
let account = accountQueryDAO.restore(liste[1].accountId)
console.log("Compte :")
console.log(account)

accountCommand.saveAccount(liste[1].accountId, "Goncalves", "André")
let account2 = accountQueryDAO.restore(liste[1].accountId)
console.log("Compte :")
console.log(account2)

console.log("eventStore :")
console.log(eventStore.eventList)
