function validatePassword(password) {
    const hasMinLength = password.length > 7;
    const hasNumber = [...password].some(char => char >= '0' && char <= '9');

    return hasMinLength && hasNumber;
}

module.exports = validatePassword;
