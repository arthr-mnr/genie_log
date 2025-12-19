const bankDAO = require('./bankDAO');

const bank = {
    getBalance() {
        bankDAO.retrieveBalance();
    },
};

module.exports = bank;