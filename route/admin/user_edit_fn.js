//引入用户集合
//解构用户集合方式
const {User, validateUser} = require('../../model/user');
//引入加密模块
const bcrypt = require('bcrypt');

module.exports = async (req, res ,next ) => {

    //实施验证
    try {
        await validateUser(req.body);
    } catch (err) {
        //重定向回用户添加界面
        // return res.redirect('/admin/user-edit?massage=' + err.message);
        //调整错误信息 让错误信息到app.js 中统一监测执行

        //对参数进行封装达到可以实现传递的效果
        //因为next参数只能传递一个参数
        return next(JSON.stringify({path: '/admin/user-edit',message: err.message}));//共享数据
    }

    //根据邮箱地址查询
    let user = await User.findOne({email: req.body.email});

    //判断邮箱是否注册
    if (user) {
        //res.redirect(JSON.stringify({path: '/admin/user-edit' ,message: '邮箱地址被占用'}));
        return next(JSON.stringify({path: '/admin/user-edit',message: '邮箱地址被占用'}));
    }

    //对密码进行加密
    const salt = await bcrypt.genSalt(10);
    //加密
    const password = await bcrypt.hash(req.body.password, salt);
    //替换密码
    req.body.password = password;
    //将用户信息添加到数据库当中
    await User.create(req.body);

    //重新重定向回到列表页面
    res.redirect('/admin/user');
}
