const bcrypt = require('bcryptjs');
const KEYS = require('../../env');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');

export const generateHashPassword = (password) => {
    return bcrypt.hashSync(password, salt);
};

export const compareHashPassword = (originalPassword, password) => {
    return bcrypt.compareSync(originalPassword, password);
};

export const generateJWToken = (candidate) => {
    return  jwt.sign({
        email: candidate.email,
        userId: candidate._id
    }, KEYS.JWT, {expiresIn: 36000});
};
