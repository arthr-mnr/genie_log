const bankDAO = require('./bankDAO');

const bank = {
    getBalance(accountId) {
        return bankDAO.retrieveBalance(accountId);
    },
};

module.exports = bank;