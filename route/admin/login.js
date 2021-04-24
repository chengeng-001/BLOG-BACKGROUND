//导入用户集合函数 并且获取解构函数 也就是共享的对象数据
const {User} = require('../../model/user');

//导入加密模块
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    //接受客户端请求参数
    const {email, password} = req.body;

    //进行表单跳转判断 //这样的二级验证是为了防止有人恶意跳转到页面
    if (email.trim().length === 0 || password.trim().length === 0) {
        //render 跳转页面
        return res.status(400).render('admin/err', {msg: '邮件地址或者密码错误'});
    }

    //根据邮箱地址查询信息
    let user = await User.findOne({email});

    //查看用户信息是否为空
    if (user) {
        //加密比对进行验证
        const isPassword = await bcrypt.compare(password, user.password);
        if (isPassword) {//密码正确 && 邮箱正确
            req.session.username = user.username; //通过请求信息的session对象存储信息
            //存储用户的角色信息
            req.session.role = user.role;
            //暂时存储数据
            req.app.locals.userInfo = user;
            //对评论账户进行判断
            if (user.role === 'admin') {
                //重定向到用户列表页面
                res.redirect('/admin/user');
            } else {
                //跳转到博客首页
                res.redirect('/home/index')
            }
        } else {
            //密码错误
            res.status(400).render('admin/err', {msg: '邮件地址或者密码错误'});
        }
    } else {
        //没有查询到用户信息
        res.status(400).render('admin/err', {msg: '邮件地址或者密码错误'});

    }

};