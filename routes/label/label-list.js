const express = require('express');
const router = express.Router();
const Label = new require('./../../models/label');

//查询所有标签
router.get('/findAllLabel', function (req, res) {
    //查询数据
    const criteria = {is_deleted: 1}; // 查询条件
    const fields = {name : 2, _id : 1}; // 待返回的字段
    const options = {sort:[{ date: -1 }]}; // 排序方式
    Label.find(criteria, fields, options, function(error, result){
        if (error) {
            return console.log(error);
        }
        if (result == null) {
            return res.jsonp('');
        }
        let data = [];
        result.forEach(function (value, index) {
            let node = {
                id : result[index]._id,
                name : result[index].name
            };
            data.push(node);
        });
        return res.jsonp(data);
    });
});

module.exports = router;