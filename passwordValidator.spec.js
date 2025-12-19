const validatePassword = require('./passwordValidator');

test("password w/ less than 8 characters should be invalid", () => {
    const checkLength1 = "abcdefghij"
    const checkLength2 = "foo"
    
    expect(validatePassword(checkLength1)).toBe(true);
    expect(validatePassword(checkLength1)).toBe(false);
});
