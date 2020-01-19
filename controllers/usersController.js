const Users = require('../database/models/Users');

module.exports.getAll = async (req, res) =>  {
    try {
        const users = await Users.find({}).limit(15);
        res.send(users);
    }catch(e) {
        console.log(e);
    }
};

module.exports.search = async (req, res) =>  {
    try {
        const name = req.query.name;
        const queryOptions = {
            $and: [{
                name: {
                    '$regex': name,
                    '$options': 'i'
                }
            }]
        };
        console.time();
        const searchTextRegex = new RegExp("^" + name + "");
        const users = await Users.find({name: searchTextRegex});
        console.timeEnd();
        /**
         * Search time by one latter
         default: 81.103ms // a
         default: 50.066ms // b
         default: 54.487ms // c
         default: 51.71ms  // d
         */

        res.send(users);
    }catch(e) {
        console.log(e);
    }
};

module.exports.store = async (req, res) =>  {
    const user = new Users({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try {
        await user.save();

        res.status(201).json(user);
    }catch(e){
        console.log(e);
    }
};
