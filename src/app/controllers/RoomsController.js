import Rooms from "../database/models/Rooms";
import shortId from "shortid";
import errorHandler from "../../utils/errorHandler";

export const getRoom = async (req, res) => {
    let room = await Rooms.findOne({to_id: req.body.to_id, from_id: req.body.from_id });

    if(room && Object.keys(room).length) {
        res.status(200).json({
            data: room
        });
    } else {
        room = await Rooms.findOne({to_id: req.body.from_id, from_id: req.body.to_id });

        if(room && Object.keys(room).length) {
            res.status(200).json({
                data: room
            });
        } else {
            const newRoom = new Rooms({
                to_id: req.body.to_id,
                from_id: req.body.from_id,
                shortId: shortId.generate()
            });

            try {
                await newRoom.save();

                res.status(201).json({
                    data: newRoom
                });
            } catch (e){
                errorHandler(res, e);
            }
        }
    }
};
