const {User} = require('../../model/user');
module.exports = async (req, res) => {

    //这是一个标识表示访问的是user页面
    req.app.locals.currentLink = 'user';
    //获取到地址栏中的id参数
    let {message,id} = req.query;
    //修改信息
    if(id) {//如果id不为空
        let user = await User.findOne({_id: id});
        //开放模板文件供给给art 文件使用
        res.render('./admin/user-edit', {
            message: message,
            id: id,
            user: user,
            link: '/admin/user-modify?id='+ id,
            button: '修改'
        });
    }else {
        //开放模板文件供给给art 文件使用
        res.render('./admin/user-edit', {
            message: message,
            id: id,
            link: '/admin/user-edit',
            button: '添加'
        });
    }


}