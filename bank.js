const bankDAO = require('./bankDAO');

const bank = {
    getBalance(accountId) {
        bankDAO.retrieveBalance(accountId);
    },
};

module.exports = bank;