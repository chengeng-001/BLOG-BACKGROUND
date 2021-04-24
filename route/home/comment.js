//导入评论集合
const {Comment} = require('../../model/comment');
module.exports =async (req, res) => {
    //进行信息解构
    const  {content, uid , aid } = req.body;
    //处理信息
    await Comment.create({
        content: content,
        uid: uid,
        aid: aid,
        time: new Date()
    });

    // 将页面重定向回到当前的页面
    res.redirect('/home/article?id='+aid);
}