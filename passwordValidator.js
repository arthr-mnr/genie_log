function validatePassword(password) {
    const hasNumber = [...password].some(char => char >= '0' && char <= '9')
    
    return password.length > 7 && hasNumber
}

module.exports = validatePassword;
