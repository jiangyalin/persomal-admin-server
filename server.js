const path = require('path');
const express = require('express');
const app = express();
const session = require('express-session');
const routes = require('./routes/');
const config = require('./config/default');
const bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '50mb'}));//设置最大提交值
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//跨域
app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
});

routes(app);

app.listen(config.port,function () {
    console.log('服务启动'+config.port);
});

