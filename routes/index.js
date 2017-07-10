const moment = require('moment');
const bodyParser = require('body-parser');

module.exports = function (app) {

    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());//解析参数

    //登陆
    // app.use('/login',require("./login/index"));
    //文档管理
    app.use('/article',require('./article/index'));
    //标签管理
    app.use('/label', require('./label/index'));

};