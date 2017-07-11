//mongodb配置文件
module.exports = {
    port: 8082,
    session: {
        secret: 'personalDB',
        key: 'personalDB',
        maxAge: 2592000000
    },
    mongodb: 'mongodb://120.27.216.198:27017/personalDB'
};