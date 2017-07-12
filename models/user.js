var mongoose = require('./../lib/db');
var Schema = mongoose.Schema;

//文章模板
var UserSchema = new Schema({
    name : { type: String ,default: null },
    pwd : { type: String ,default: '123456' },
    is_deleted : { type : Number ,default: 1}
});

module.exports = mongoose.model('user',UserSchema);