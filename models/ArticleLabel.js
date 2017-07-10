var mongoose = require('./../lib/db');
var Schema = mongoose.Schema;

//文章模板
var ArticleLabelSchema = new Schema({
    article_id : { type: Schema.Types.ObjectId, ref: 'Article' },//文档id
    label_id: [{ type: Schema.Types.ObjectId, ref: 'label'}]//标签id
});

module.exports = mongoose.model('article_label',ArticleLabelSchema);