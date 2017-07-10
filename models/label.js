var mongoose = require('./../lib/db');
var Schema = mongoose.Schema;

//标签模板
var LabelSchema = new Schema({
    name : { type: String ,default: null},//标签名
    date : { type: Date , default: Date.now},//创建时间
    is_deleted : { type : Number ,default: 1}//删除状态
});

module.exports = mongoose.model('label',LabelSchema);