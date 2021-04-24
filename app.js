const express = require('express');
const app = express();
//导入art-template
const template = require('art-template');
//导入日期
const dateformat = require('dateformat');
//配置全局时间变量
template.defaults.imports.dateformat = dateformat;
//导入模块
const morgan = require('morgan');
//导入开发环境设置模块
const  config = require('config');
const express_template = require('express-art-template');
const mongoose = require('mongoose');
//post 处理模块
const body_parser = require('body-parser');
const path = require('path');
//导入express-session 模块
//用户数据自动存储模块
const express_session = require('express-session');

//导入数据库连接文件
require('./model/connect');

//调用post解析工具
app.use(body_parser.urlencoded({extended: false}));

//配置session
app.use(express_session({
    secret: 'secret key',
    //是否确认保存cookie 的值
    saveUninitialized: false,
    cookie: {
        //设置cookie的存活时间
        maxAge: 24 * 60 * 60 * 1000
    }
}));


//调用创建管理员数据之后删除
// const User = require('./model/user');

//在node命令窗口 使用nodemon 修改时会帮忙保存文件并且在次执行

/*
   这项操作会使得导进来的包得到指定的相对地址并且执行
   不然直接导致失败
 */
//告诉express框架模板所在的位置
app.set('views',path.join(__dirname,'views'));
//告诉框架模板的默认后缀是什么
app.set('view engine','art');
//当渲染后缀为art的模板时所使用得模板引擎是什么
app.engine('art',express_template);

//开放静态资源文件
app.use(express.static(path.join(__dirname,'public')));

// console.log(config.get('db.pwd'));

//获取系统环境变量
if(process.env.NODE_ENV === 'development') {
    //开发环境
    console.log('当前是开发环境');
    //在开发环境中将客户端发送到服务端的请求信息打印到控制台中
    // app.use(morgan('dev'));
}else {
    //生产环境
    console.log('当前是生产环境');
}

//导入路由模块对象
const home = require('./route/home');
const admin = require('./route/admin');

//拦截请求 判断用户登陆
app.use('/admin',require('./middleware/loginGuard'));

//启动模块 并且分配Id
app.use('/home',home);
//要确定目录的css  js 等文件的资源地址一旦确定不能更改
//要在网页加上绝对路径可以随意更换 请求地址
app.use('/admin',admin);

app.use((err,req,res,next) => {
    //将字符串转化为对象类型
    console.log(err);
    const result = JSON.parse(err);
    //进行修改页面的操作
    let params = [];
    for (let attr in result) {
        if(attr !== 'path') {
           params.push(attr+ '=' + result[attr]);
        }
    }

    res.redirect(`${result.path}?${params.join('&')}`);

});


app.listen(8081);
console.log("服务器启动,请访问localhost:8080");