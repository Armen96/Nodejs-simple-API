const bcrypt = require('bcryptjs');
const KEYS = require('../../env');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
import shortId from "shortid";

export const generateHashPassword = (password) => {
    return bcrypt.hashSync(password, salt);
};

export const compareHashPassword = (originalPassword, password) => {
    return bcrypt.compareSync(originalPassword, password);
};

export const generateJWToken = (candidate) => {
    return jwt.sign({
        email: candidate.email,
        userId: candidate._id
    }, KEYS.JWT, {expiresIn: 36000});
};

export const generateUniqueImageNames = (imageName) => {
    const array = imageName.split('.');

    const uniqueId = shortId.generate();
    const randomNumber = Math.ceil(Math.random() * 1000000);

    return uniqueId + '_' + randomNumber + '.' + array[1];
};
