import { accountService } from "./accountService.mjs";

accountService.addAccount("Rajot", "Paul")
accountService.addAccount("Rajot", "Paulllll")

let liste = accountService.getAccountList()
console.log(liste)

accountService.saveAccount(liste[1].id, "Meunier", "Arthur")