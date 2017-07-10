const path = require('path');
const express = require('express');
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const pkg = require('./package');
const routes = require('./routes/');
const config = require('./config/default');
const bodyParser = require('body-parser');

app.set('views',path.join(__dirname,'views'));
app.engine('html',require('ejs').renderFile);//设置模板后缀名为.html
app.set('view engine','html');

app.use(express.static(path.join(__dirname,'static')));

app.use(session({
    name: config.session.key,// 设置 cookie 中保存 session id 的字段名称
    secret: config.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    resave: true,// 强制更新 session
    saveUninitialized: false,// 设置为 false，强制创建一个 session，即使用户未登录
    cookie: {
        maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
    },
    store: new MongoStore({// 将 session 存储到 mongodb
        url: config.mongodb// mongodb 地址
    })
}));

app.locals.blog = {
    title: pkg.name,
    description: pkg.description
};

app.use(bodyParser.json({limit: '50mb'}));//设置最大提交值
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    next();
});

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

