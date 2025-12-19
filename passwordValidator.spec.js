const validatePassword = require('./passwordValidator');

const checkLength1 = "password9"
const checkLength2 = "azert1"

test("password w/ less than 8c should be invalid", () => {
  expect(validatePassword(checkLength1)).toBe(true);
  expect(validatePassword(checkLength2)).toBe(false);
});


const checkNumber1 = "azerty12345"
const checkNumber2 = "azertyazerty"

test("password w/out a number should be invalid", () => {
  expect(validatePassword(checkNumber1)).toBe(true);
  expect(validatePassword(checkNumber2)).toBe(false);
});