const express = require('express');
const router = express.Router();
const Label = new require('./../../models/Label');
const Article = new require('./../../models/Article');
const ArticleLabel = new require('./../../models/ArticleLabel');
const moment = require('moment');

//添加文档
router.post('/addArticle',function (req, res) {
    //插入数据
    let article = {
        title : req.body.title,
        description : req.body.description,
        content : req.body.content,
        label_id: req.body.label
    };
    Article.create(article, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            let information = JSON.stringify('success');
            res.jsonp(information);
        }
    });
});

//修改文档
router.post('/editArticle',function (req, res) {
    let id = req.body.id;
    let title = req.body.title;
    let description = req.body.description;
    let content = req.body.content;
    let label_id = req.body.label;
    let conditions = {_id: id };//修改对象条件
    let update = {$set: {title: title, description: description, content: content, label_id: label_id}};//修改项
    let options = {};
    //更新数据
    Article.update(conditions, update, options, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            let information = JSON.stringify('success');
            res.jsonp(information);
        }
    });
});

//查询文档
router.get('/findArticle',function (req, res) {
    let id = req.query.id;
    id = id || '';
    let criteria = {is_deleted: 1, _id: id}; // 查询条件
    let fields = {title : 2, description : 1, date : -1,content : 1, label_id: 1}; // 待返回的字段
    let options = {sort:[{ date: 1 }]}; // 排序方式（根据时间倒序排序）
    Article.findOne(criteria, fields, options, function(error, result){
        if(error) {
            console.log(error);
        } else {
            let data = {
                id : result._id,
                title : result.title,
                description : result.description,
                content: result.content,
                label: result.label_id,
                date : moment(result.date).format('YYYY-MM-DD HH:mm:ss')
            };
            res.jsonp(data);
        }
    }).populate({path: 'label_id', select: ['name']});
});

module.exports = router;