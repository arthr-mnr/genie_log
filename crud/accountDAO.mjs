import { ACCOUNT_LIST } from "./database.mjs";

export const accountDAO = {
  insertAccount(account) {
    ACCOUNT_LIST.push(account);
    console.log("Contenu de la base de données :");
    console.log(ACCOUNT_LIST);
  },
  retrieveAccountList() {},
  updateAccount(account) {},
  retrieveAccount(id) {},
};
