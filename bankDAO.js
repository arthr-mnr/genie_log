const bankDAO = {

    retrieveBalance(accountId) {
        console.log("Retrieve balance")
    },
    debitAccount(accountId, amout) {
        console.log("Debit account")
    }
}

module.exports = bankDAO;