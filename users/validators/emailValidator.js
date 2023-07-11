const emailValidator = (email, intendedEmail) => {
    // Check if the provided email matches the intended email
    return email === intendedEmail;
};

const isValidEmail = (email) => {
    return emailValidator.validate(email);
};

module.exports = { isValidEmail, emailValidator };