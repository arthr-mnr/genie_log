function validatePassword(password) {
    const hasNumber = [...password].some(char => char >= '0' && char <= '9')
    const hasLetter = [...password].some(char => char >= 'a' && char <= 'z')
    
    return password.length > 7 && hasNumber && hasLetter
}

module.exports = validatePassword;
