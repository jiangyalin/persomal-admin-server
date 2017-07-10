var mongoose = require('./../lib/db');
var Schema = mongoose.Schema;

let ASchema = new Schema({
    name : {type: String, unique: true},
    posts : [{type: Schema.Types.ObjectId, ref: 'Bb'}]
});
let Aa = mongoose.model('Aa', ASchema);
let BSchema = new Schema({
    poster : {type: Schema.Types.ObjectId, ref: 'Aa'},
    comments : [{type: Schema.Types.ObjectId, ref: 'Cc'}],
    title : {type: String, default: null}
});
let Bb = mongoose.model('Bb', BSchema);
let CSchema = new Schema({
    post : {type: Schema.Types.ObjectId, ref: 'Bb'},
    commenter : {type: Schema.Types.ObjectId, ref: 'Aa'},
    content : {type: String, default: null}
});
let Cc = mongoose.model('Cc', CSchema);
module.exports.aa = Aa;
module.exports.bb = Bb;
module.exports.cc = Cc;