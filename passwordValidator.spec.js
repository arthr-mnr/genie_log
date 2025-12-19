const validatePassword = require('./passwordValidator');

test("password w/ less than 8c should be invalid", () => {
    const checkLength1 = "password9"
    const checkLength2 = "azert1"
    expect(validatePassword(checkLength1)).toBe(true);
    expect(validatePassword(checkLength2)).toBe(false);
});


test("password w/out a number should be invalid", () => {
    const checkNumber1 = "azerty12345"
    const checkNumber2 = "azertyazerty"
    expect(validatePassword(checkNumber1)).toBe(true);
    expect(validatePassword(checkNumber2)).toBe(false);
});


test("password w/out a letter should be invalid", () => {
    const checkLetter1 = "123456789a"
    const checkLetter2 = "123456789"
    expect(validatePassword(checkLetter1)).toBe(true);
    expect(validatePassword(checkLetter2)).toBe(false);
});