const validatePassword = require('./passwordValidator');

test("password w/ less than 8 characters should be invalid", () => {
    const checkLength1 = "abcdefghij"
    
    expect(validatePassword(checkLength1)).toBe(true);
});
