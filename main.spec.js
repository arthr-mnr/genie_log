const bankDAO = require("./bankDAO");
const bank = require("./bank");
const bankTransfer = require("./bankTransfer");

test("retrieveBalance is called", () => {
    const retrieveBalanceSpy = jest.spyOn(bankDAO, "retrieveBalance").mockImplementation();

    bank.getBalance();

    expect(retrieveBalanceSpy).toHaveBeenCalled();
});

test("retrieveBalance est appelée avec accountId", () => {
    const retrieveBalanceSpy = jest.spyOn(bankDAO, "retrieveBalance").mockImplementation();

    const accountId = 123;

    bank.getBalance(accountId);

    expect(retrieveBalanceSpy).toHaveBeenCalledWith(accountId);
});

test("getBalance retourne le solde", () => {
    const value = 456
    const retrieveBalanceSpy = jest.spyOn(bankDAO, "retrieveBalance").mockReturnValue(value);

    expect(bank.getBalance()).toBe(value);
});

test("bankTransfert appelé avec les bons paramètres", () => {
    const accountId = 123
    const amout = 1000000
    const bankTransferSpy = jest.spyOn(bankTransfer, "transfer").mockImplementation();

    bank.transferMoney(accountId, amout)

    expect(bankTransferSpy).toHaveBeenCalledWith(accountId, amout);
});

test("debitAccount est appelé avec les bons paramètres", () => {
    const accountId = 123
    const amout = 1000000
    const debitAccountSpy = jest.spyOn(bankDAO, "debitAccount").mockImplementation();

    bank.transferMoney(accountId, amout)

    expect(debitAccountSpy).toHaveBeenCalledWith(accountId, amout);
});