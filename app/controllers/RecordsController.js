import errorHandler from "../../utils/errorHandler";

const Records = require('../../database/models/Records');
const jwt = require('jsonwebtoken');
const KEYS = require('../../env');

export const index = async (req, res) => {
    let records = [];
    try {
        if (req.headers && req.headers['app-token']) {
            let authorization = req.headers['app-token'].split(' ')[1], decoded;
            try {
                decoded = jwt.verify(authorization, KEYS.JWT);
            } catch (e) {
                return res.status(401).send('unauthorized');
            }

            const userId = decoded.userId;
            records = await Records.find({ user: userId}).sort({week: -1 });
        }

        res.send(records);
    } catch (e) {
        errorHandler(res, e);
    }
};

export const update = async (req, res) => {
    let record = [];
    try {
        if (req.headers && req.headers['app-token']) {
            let authorization = req.headers['app-token'].split(' ')[1], decoded;
            try {
                decoded = jwt.verify(authorization, KEYS.JWT);
            } catch (e) {
                return res.status(401).send('unauthorized');
            }

            const userId = decoded.userId;
            record = await Records.findOne({ user: userId, _id: req.params.id});
        }

        res.send(record);
    } catch (e) {
        errorHandler(res, e);
    }
};

export const destroy = async (req, res) => {
    try {
        if (req.headers && req.headers['app-token']) {
            let authorization = req.headers['app-token'].split(' ')[1], decoded;
            try {
                decoded = jwt.verify(authorization, KEYS.JWT);
            } catch (e) {
                return res.status(401).send('unauthorized');
            }

            const userId = decoded.userId;
            await Records.remove({ user: userId, _id: req.params.id});
        }

        res.send(req.params.id);
    } catch (e) {
        errorHandler(res, e);
    }
};

export const edit = async (req, res) => {
    try {
        if (req.headers && req.headers['app-token']) {
            let authorization = req.headers['app-token'].split(' ')[1], decoded;
            try {
                decoded = jwt.verify(authorization, KEYS.JWT);
            } catch (e) {
                return res.status(401).send('unauthorized');
            }

            const userId = decoded.userId;
            await Records.remove({ user: userId, _id: req.params.id});
        }

        res.send(req.params.id);
    } catch (e) {
        errorHandler(res, e);
    }
};

export const store = async (req, res) => {
    const record = new Records({
        week: req.body.week,
        income: req.body.income,
        outcome: req.body.outcome,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        description: req.body.description,
        user: req.body.user_id
    });

    try {
        await record.save();
        res.send(record);
    } catch (e) {
        errorHandler(res, e);
    }
};
