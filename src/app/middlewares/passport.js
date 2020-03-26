import {UsersSchema} from "../database/models/Users";

const JwtStategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const KEYS = require('../../env');
const mongoose = require('mongoose');
const Users = mongoose.model('users', UsersSchema);

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: KEYS.JWT,
};

module.exports = function (passport) {
    passport.use(new JwtStategy(options, async (payload, done) => {
        try {
            const user = await Users.findById(payload.userId).select('email id');

            if (user){
                done(null, user);
            } else {
                done(null, false);
            }
        } catch (err){
            console.log("Error Middleware")
        }
    }))
};
