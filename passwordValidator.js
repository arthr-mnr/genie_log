function validatePassword(password, minLength=8) {
    const hasLength = password.length > minLength
    const hasNumber = [...password].some(char => char >= '0' && char <= '9')
    const hasLetter = [...password].some(char => char >= 'a' && char <= 'z')
    
    return hasLength && hasNumber && hasLetter
}

module.exports = validatePassword;
