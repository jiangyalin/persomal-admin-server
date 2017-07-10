//分页插件
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const async = require('async');
//当前页码，每页条数，模板, 外键, 查询参数, 排序方式, 回调
let pageQuery = function (page, pageSize, Model, populate, queryParams, fields, sortParams, callback) {
    let start = (page -1) * pageSize;
    let $page = {
        pageNumber: page
    };
    async.parallel({
        count: function (done) {    //查询数据总量
            Model.count(queryParams, function (err, count) {
                done(err, count);
            });
        },
        records: function (done) {    //查询一页的记录
            Model.find(queryParams, fields, sortParams, function (err, doc) {
                done(err, doc);
            }).skip(start).limit(pageSize).populate(populate);
        }
    },function (err, results) {
        let count = results.count;
        $page.pageCount = (count - 1) / pageSize + 1;
        $page.results = results.records;
        $page.count = results.count;
        callback(err, $page);
    });
};

module.exports = {
    pageQuery: pageQuery
};