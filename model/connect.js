//连接数据库
const mongoose = require('mongoose');
//导入程序抽离模块
const config = require('config');


// mongoose.connect('mongodb://localhost/blog',{useNewUrlParser: true}) //原来的地址
//通过用户权限的区分的用户
mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:
${config.get('db.port')}/${config.get('db.name')}`,{useNewUrlParser: true})
.then(() => console.log("数据库连接成功"))
.catch(() => console.log("数据库连接失败"));

