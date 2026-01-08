import { accountCommand } from "./accountCommand.mjs";
import { accountQuery } from "./accountQuery.mjs";
import { eventStore } from "./eventStore.mjs";

accountCommand.addAccount("Rajot", "Paul")
accountCommand.addAccount("Rajot", "Paulllll")

let liste = accountQuery.getAccountList()
console.log(liste)

accountCommand.saveAccount(liste[1].id, "Meunier", "Arthur")

let account = accountQuery.getAccount(liste[1].id)
console.log("Compte :")
console.log(account)

console.log("eventStore :")
console.log(eventStore)
