const guard = (req, res ,next) => {
    //判断用户是否是登陆页面
    //判断用户登陆状态
    //如果用户是登陆的 将请求放行
    if(req.url !== '/login' && !req.session.username) {
        res.redirect('/admin/login');
    } else {
        //如果普通用户试图想访问博客首页会自动跳回博客浏览页
        if(req.session.role === 'normal' ) {
            return  res.redirect('/home/index');
        }
        next();
    }
}

module.exports = guard;