const express = require('express');

//创建服务器路由
const admin = express.Router();

//渲染页面
admin.get('/login',require('./admin/loginPage'));

//实现登录请求参数
//后面如果是函数量较多的话 可以单独创建一个js 文件去接收
admin.post('/login',require('./admin/login'));

//用户列表 管理员界面
admin.get('/user',require('./admin/userPage'));

//实现退出功能
admin.get('/logout',require('./admin/logout'));

//新增用户功能
admin.get('/user-edit',require('./admin/user_edit'));

//创建实现用户添加功能
admin.post('/user-edit',require('./admin/user_edit_fn'));

//实现修改功能
admin.post('/user-modify',require('./admin/user-modify'));

//删除用户功能
admin.get('/delete',require('./admin/user-delete'));

//文章列表页面
admin.get('/article',require('./admin/article'));
//文章编辑路由
admin.get('/article-edit',require('./admin/article-edit'));
//实现文章添加的功能的路由
admin.post('/article-add',require('./admin/article-add'));


//将路由对象做为模块对象进行导出
module.exports = admin;