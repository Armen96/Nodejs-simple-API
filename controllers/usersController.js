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
        const searchTextRegex = new RegExp("^" + name + "");
        const users = await Users.find({name: searchTextRegex});
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
