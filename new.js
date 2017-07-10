var mongoose = require('./lib/db');
var Article = new require('./models/article');
var User = new require('./models/user');
var Label = new require('./models/label');
let ArticleLabel = new require('./models/ArticleLabel');
let Aa = new require('./models/cs').aa;
let Bb = new require('./models/cs').bb;
let Cc = new require('./models/cs').cc;
let Kk = new require('./models/kk');

// var article = new Article({
//     title : '标题7',
//     description : '7内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
//     is_deleted : 1,
//     date : new Date()
// });
// var user = new User({
//     name : 'admin',
//     pwd : '123456'
// });
// var label = new Label({
//     name : 'mysql'
// });
// let articleLabel = new ArticleLabel({
//     article_id : '5948750473045b3190b2f060',
//     label_id: '59451cb246162b4340559421'
// });
var userIds	= [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()];
var postIds	= [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()];
var commentIds = [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()];
let aa = new Aa({
    _id   : userIds[0],
    name  : 'aikin',
    posts : [postIds[0]]
});

let bb = new Bb({
    _id	  : postIds[0],
    title	: 'post-by-aikin',
    poster   : userIds[0],
    comments : [commentIds[0]]
});

let cc = new Cc({
    _id	   : commentIds[0],
    content   : 'comment-by-luna',
    commenter : userIds[1],
    post	  : postIds[0]
});

let kk = new Kk({
    name: 'abc',
    labels: ['59451cb246162b4340559421', '59451e258b941b3ea0a3c29e', '59451e349dd7da228c5237a0']
});


// Aa.create(aa, function(err, docs) {
//     Bb.create(bb, function(err, docs) {
//         Cc.create(cc, function(err, docs) {
//             console.log("kk")
//         });
//     });
// });

// Kk.create(kk, function (err, docs) {
//     console.log(docs)
// });

// Kk.findOne({name: 'abc'}, null, '', function (err, result) {
//     if (err) {
//         console.log(err);
//     } else {
//         // console.log("result",result);
//         result.populate({path: 'labels', select: ['name']}, function (err, docs) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log('docs',docs);
//             }
//         })
//     }
// });

// Cc.findOne({content: 'comment-by-luna'}, null, '', function (err, result) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("c",result);
//         result.populate({path: 'commenter', select: ['name', 'posts'],
//         //     populate: {
//         //         path: 'commenter',
//         //         select: ['name'],
//         //     }
//         }, function (err, k) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log("a",k);
//                 k.populate({path: 'post', select: ['poster', 'comments', 'title', '_id'],
//                     populate: {
//                         path: 'poster',
//                         select: ['name', 'posts'],
//                     }
//                 }, function (err, a) {
//                     if (err) {
//                         console.log(err);
//                     } else {
//                         console.log("b",a);
//                     }
//                 });
//             }
//         });
//     }
// });

// Aa.findOne({name: 'aikin'}, null, '', function (err, result) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("r",result);
//     }
// }).populate({
//     path: 'posts',
//     select: ['title','poster','comments'],
//     model: 'Bb',
//     populate: {
//         path: 'comments',
//         select: ['commenter', 'post', 'content'],
//         model: 'Cc'
//     }
// });

//添加数据
// Article.create(article,function (err) {
//     if (err){
//         console.log('Error:' + err);
//     }
// });
// User.create(user,function (err) {
//     if (err){
//         console.log('Error:' + err);
//     }
// });
// Label.create(label,function (err) {
//     if (err){
//         console.log('Error:' + err);
//     }
// });
// ArticleLabel.create(articleLabel, function (err, result) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(result)
//     }
// });

//查询数据
// var qs = new RegExp('');
// var criteria = {_id: {$lt: '5952061dd4bafd6558604c52'}}; // 查询条件
// var fields   = {title : 1, date : 1}; // 待返回的字段
// var options  = {sort:[{ 'date': -1 }]};//排序方式
// Article.findOne(criteria, fields, options, function(error, result){
//     console.log("k")
//     if(error) {
//         console.log(error);
//     } else {
//         console.log(result);
//     }
// });

//联表查询
// ArticleLabel.find({}, function (err, result) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(result)
//     }
// }).populate('Article');

//修改数据
// var conditions = {title: '标题6'};//查找条件
// var update = {$set : {is_deleted : 1}};//修改信息
// var options = {};//排序方式
// Article.update(conditions, update, options, function (error) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("更新成功");
//     }
// });
