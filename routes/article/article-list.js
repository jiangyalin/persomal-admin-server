const express = require('express');
const router = express.Router();
const Article = new require('./../../models/Article');
const pageList = require('./../../models/pageList');
const moment = require('moment');

//文档数据(分页)
router.get('/findArticlesList', function (req, res) {
    //查询数据
    const page = Number(req.query.pageIndex)+1;//当前页码
    const pageSize = Number(req.query.pageSize);//每页条数
    const qs = new RegExp(req.query.title);//标题正则参数
    const Model = Article;//模板
    const populate = '';
    const criteria = {is_deleted: 1, $or: [{title: qs},{description: qs}]};//查询条件
    let fields = {title : 2, description : 1, date : -1}; // 待返回的字段
    const options = {sort:[{ date: -1 }]};//排序
    pageList.pageQuery(page, pageSize, Model, populate, criteria, fields, options, function (err, $page) {
        if (err){
            next(err);
        } else{
            var data = {
                "total": $page.count,
                "rows": $page.results
            };
            res.jsonp(data);
        }
    });
});

//查找文章(搜索功能)(弃用中)
router.post('/findArticle',function (req, res) {
    //查询数据
    let qs = new RegExp(req.body.title);//正则参数
    let criteria = {title: qs, is_deleted: 1}; // 查询条件
    let fields   = {title : 2, description : 1, date : -1,content : 1}; // 待返回的字段
    let options = {sort:[{ date: -1 }]};//排序
    Article.find(criteria, fields, options, function(error, result){
        if (error) {
            console.log(error);
        } else {
            let data = [];
            result.forEach(function (value) {
                let node = {
                    id : value._id,
                    title : value.title,
                    description : value.description,
                    date : moment(value.date).format('YYYY-MM-DD HH:mm:ss'),
                    content : value.content
                };
                data.push(node);
            });
            res.jsonp(data);
        }
    });
});

//删除文章（假删除）
router.get('/removeArticle',function (req, res) {
    //修改数据
    let conditions = {_id: req.query.id};//查找条件
    let update = {$set : {is_deleted : 0}};//修改信息
    let options = {};//排序方式
    Article.update(conditions, update, options, function (error) {
        if (error) {
            console.log(error);
        } else {
            let information = JSON.stringify('success');
            res.jsonp(information);
        }
    });
});

module.exports = router;