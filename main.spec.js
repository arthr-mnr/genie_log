const bankDAO = require("./bankDAO");
const bank = require("./bank");

test("retrieveBalance is called", () => {
    const retrieveBalanceSpy = jest.spyOn(bankDAO, "retrieveBalance");

    bank.getBalance();

    expect(retrieveBalanceSpy).toHaveBeenCalled();
});

test("retrieveBalance est appelée avec accountId", () => {
    const retrieveBalanceSpy = jest.spyOn(bankDAO, "retrieveBalance");

    const accountId = 123;

    bank.getBalance(accountId);

    expect(retrieveBalanceSpy).toHaveBeenCalledWith(accountId);
});
