//导入集合构造函数
const { User } = require('../../model/user');
module.exports = async (req, res, next) => {

    //这是一个标识表示访问的是user页面
    req.app.locals.currentLink = 'user';
    //接收客户端参数
    //如果第一页的数据不会进行计算
    let page = req.query.page || 1;
    //每一页显示的数据数
    let pagesize = 10;
    // 查询用户的数据总数
    let count = await User.countDocuments({})
    //总页数
    let total =Math.ceil( count / pagesize );

    //控制最后页数分配
    //详细看页面布局 有更好的属性
    // if(page > total) {
    //     var index = 0;
    //     for (let i = 0; i <page.length ; i++) {
    //         index = i;
    //     }
    //     page = index;
    // }

    //页码对应的开始位置
    let start = (page - 1) * pagesize;//数据查询位置等于  = (当前页 - 1) * 当前页数

    //渲染页面
    //查询所有信息
    let users = await User.find({}).limit(pagesize).skip(start);
    //渲染用户列表
    res.render('admin/user',{
        users: users,
        page: page,
        total: total
    });
}
