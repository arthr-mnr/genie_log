const bankDAO = require('./bankDAO');
const bankTransfer = require('./bankTransfer');

const bank = {
    getBalance(accountId) {
        return bankDAO.retrieveBalance(accountId);
    },
    transferMoney(accountId, amount) {
        bankTransfer.transfer(accountId, amount)
    }
};

module.exports = bank;