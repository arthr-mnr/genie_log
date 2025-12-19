const validatePassword = require('./passwordValidator');

test("password w/ less than 8 characters should be invalid", () => {
    const checkLength1 = "abcdefghij1"
    const checkLength2 = "foo1"
    
    expect(validatePassword(checkLength1)).toBe(true);
    expect(validatePassword(checkLength2, 1, 3)).toBe(false);
});


test("password w/out a number should be invalid", () => {
    const checkNumber1 = "abcdefghij123"
    const checkNumber2 = "azertyuio"
    
    expect(validatePassword(checkNumber1, 2, 2)).toBe(true);
    expect(validatePassword(checkNumber2)).toBe(false);
});

test("password w/out a letter should be invalid", () => {
    const checkNumber1 = "abcdefghij123"
    const checkNumber2 = "123456789"
    
    expect(validatePassword(checkNumber1, 2, 2)).toBe(true);
    expect(validatePassword(checkNumber2)).toBe(false);
});