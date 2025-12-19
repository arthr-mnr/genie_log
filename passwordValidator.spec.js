const validatePassword = require('./passwordValidator');

const checkLength1 = "password"
const checkLength2 = "azerty"

test("password w/ less than 8c should be invalid", () => {
  expect(validatePassword(checkLength1)).toBe(true);
  expect(validatePassword(checkLength2)).toBe(false);
});