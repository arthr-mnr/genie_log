const validatePassword = require('./passwordValidator');

const checkLength1 = "password"
const checkLength2 = "azerty"

test("Check if the password's length is at least 8", () => {
  expect(validatePassword(checkLength1)).toBe(true);
  expect(validatePassword(checkLength2)).toBe(false);
});