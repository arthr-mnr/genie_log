function validatePassword(password) {
    const hasMinLength = password.length > 7;
    const hasNumber = [...password].some(char => char >= '0' && char <= '9');
    const hasLetter = [...password].some(char => (char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z'))

    return hasMinLength && hasNumber && hasLetter;
}

module.exports = validatePassword;
