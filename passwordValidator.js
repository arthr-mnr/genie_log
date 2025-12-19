function validatePassword(password, minLength=8, minNumber=1, minLetter=1) {
    const hasLength = password.length > minLength
    const numberCount = [...password].filter(char => char >= '0' && char <= '9').length
    const letterCount = [...password].filter(char => char >= 'a' && char <= 'z').length

    return hasLength && (numberCount >= minNumber) && (letterCount >= minLetter)
}

module.exports = validatePassword;
