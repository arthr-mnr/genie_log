const bankDAO = require('./bankDAO');
const bankTransfer = require('./bankTransfer');

const bank = {
    getBalance(accountId) {
        return bankDAO.retrieveBalance(accountId);
    },

    async transferMoney(accountId, amount) {
        try {
            const result = await bankTransfer.transfer(accountId, amount);
            return await bankDAO.debitAccount(accountId, amount);
        }
        catch (e) {
            console.error('Erreur lors du transfert:', e);
        }
    }
};

module.exports = bank;