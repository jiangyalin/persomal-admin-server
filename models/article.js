var mongoose = require('./../lib/db');
var Schema = mongoose.Schema;

//文章模板
var ArticleSchema = new Schema({
    title : { type: String ,default: null},//标题
    description : { type: String ,default: null},//描述
    date : { type: Date , default: Date.now},//创建时间
    content : { type: String , default: null},//内容
    is_deleted : { type : Number ,default: 1},//删除状态
    label_id: [{ type: Schema.Types.ObjectId, ref: 'label'}]//标签id
});

module.exports = mongoose.model('Article',ArticleSchema);