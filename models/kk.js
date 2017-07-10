var mongoose = require('./../lib/db');
var Schema = mongoose.Schema;

let Kkchema = new Schema({
    name : {type: String, unique: true},
    labels : [{type: Schema.Types.ObjectId, ref: 'label'}]
});
let Kk = mongoose.model('Kk', Kkchema);
module.exports = Kk;