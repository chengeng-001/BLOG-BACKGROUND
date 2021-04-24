const {User} = require('../../model/user');
module.exports = async (req,res) => {
    //获取删除的用户id
    let id = req.query.id;
    //根据id删除用户
    await User.findOneAndDelete({_id: id});
    //重定向
    res.redirect('./user');
}