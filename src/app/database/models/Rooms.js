const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const RoomsSchema = new Schema({
   to_id: {
       ref: 'users',
       type: Schema.Types.ObjectId
   },
   from_id: {
       ref: 'users',
       type: Schema.Types.ObjectId
   },
   shortId: {
       type: String,
       required: true
   }
});

export default mongoose.model('rooms', RoomsSchema);
