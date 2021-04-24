const express = require('express');

//创建服务器路由
const home = express.Router();

home.get('/index',require('./home/index'));

//博客前台展示页面
home.get('/article',require('./home/article'));

//创建评论功能
home.post('/comment',require('./home/comment'))

//将路由对象做为模块对象进行导出
module.exports = home;