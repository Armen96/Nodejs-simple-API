const Records = require('../../database/models/Records');

export const index = async (req, res) => {
    try {
        const records = await Records.find({});
        console.log(records);
        res.send(records);
    } catch (e) {
        console.log(e);
    }
};

export const store = async (req, res) => {
    const record = new Records({
        body: req.body.body,
        title: req.body.title
    });

    try {
        await record.save();
        res.send(record);
    } catch (e) {
        console.log(e);
    }
};
