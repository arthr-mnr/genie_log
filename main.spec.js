const bankDAO = require("./bankDAO");
const bank = require("./bank");

test("retrieveBalance is called", () => {
    const retrieveBalanceSpy = jest.spyOn(bankDAO, "retrieveBalance").mockImplementation();

    bank.getBalance();

    expect(retrieveBalanceSpy).toHaveBeenCalled();
});