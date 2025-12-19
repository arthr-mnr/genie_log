const bankDAO = require("./bankDAO");
const bank = require("./bank");
const bankTransfer = require("./bankTransfer");

afterEach (() => {
    jest.restoreAllMocks();
});

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

test("bankTransfert appelé avec les bons paramètres", async () => {
    const accountId = 123
    const amout = 1000000
    const bankTransferSpy = jest.spyOn(bankTransfer, "transfer").mockImplementation();

    await bank.transferMoney(accountId, amout)

    expect(bankTransferSpy).toHaveBeenCalledWith(accountId, amout);
});

test("debitAccount est appelé avec les bons paramètres", async () => {
    const accountId = 123;
    const amount = 1000000;
    
    const transferSpy = jest.spyOn(bankTransfer, "transfer").mockResolvedValue();
    const debitAccountSpy = jest.spyOn(bankDAO, "debitAccount").mockResolvedValue();

    await bank.transferMoney(accountId, amount);

    expect(transferSpy).toHaveBeenCalledWith(accountId, amount);
    expect(debitAccountSpy).toHaveBeenCalledWith(accountId, amount);
});

test("debitAccount n'est pas appelé si transfer retourne une erreur", async () => {
    const accountId = 123;
    const amount = 1000000;
    
    const transferSpy = jest.spyOn(bankTransfer, "transfer").mockRejectedValue(new Error("Erreur de transfert"));
    const debitAccountSpy = jest.spyOn(bankDAO, "debitAccount").mockResolvedValue();

    await bank.transferMoney(accountId, amount);

    expect(transferSpy).toHaveBeenCalledWith(accountId, amount);
    expect(debitAccountSpy).not.toHaveBeenCalled();
});