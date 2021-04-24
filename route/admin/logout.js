module.exports = (req,res) =>{
    //删除session
    req.session.destroy(function () {
        //删除cookie码 cookie码可到控制台中查看
        res.clearCookie('connect.sid');
        //重定向到用户登录界面
        res.redirect('./admin/login');
        //全面清除用户登录信息
        req.app.locals.userInfo = null;
    });
}