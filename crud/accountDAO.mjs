import { ACCOUNT_LIST } from "./database.mjs";

export const accountDAO = {
  insertAccount(account) {
    ACCOUNT_LIST.push(account);
    console.log("Contenu de la base de données :");
    console.log(ACCOUNT_LIST);
  },
  retrieveAccountList() {
    return ACCOUNT_LIST.map(a => ({ id: a.id, lastName: a.lastName, firstName: a.firstName }));
  },
  updateAccount(account) {},
  retrieveAccount(id) {},
};