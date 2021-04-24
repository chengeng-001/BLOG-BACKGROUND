//获取数据库操作文件
const {User} = require('../../model/user');
//导入加密模块
const bcrypt = require('bcrypt');
module.exports = async (req, res, next) => {
    //接收客户端传递过来的请求参数
    const {username, email, role, state, password} = req.body;
    //从post请求中获取id 参数
    let id = req.query.id;
    // res.send(password);
    let user = await User.findOne({_id: id});
    //密码比对
    const isValid = await bcrypt.compare(password, user.password);
    //进行密码比对
    if (isValid) {
        //将用户信息更新到数据库中
        await User.updateOne({_id: id}, {
            username: username,
            email: email,
            role: role,
            state: state
        });
        //重定向到列表页面
        res.redirect('/admin/user');
    } else {
        //设置密码比对失败时的跳转链接
        let obj = {path: '/admin/user-edit', message: '密码比对失败不能进行用户信息的修改', id: id};
        //密码比对失败
        next(JSON.stringify(obj));
    }
}