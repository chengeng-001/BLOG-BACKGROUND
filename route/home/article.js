//文章详情页面
const { article } = require('../../model/article');
//导入评论集合
const { Comment } = require('../../model/comment')
module.exports = async (req, res) => {
    //接受客户端传送的id值
    const id = req.query.id;
    //根据id查询文章详细信息
    let articles = await article.findOne({_id: id}).populate('auths').lean();
    //查询文章的信息
    let comment = await Comment.find({aid: id}).populate('uid').lean();
    // res.send(comment);//测试
    // return;
    // res.send("文章详情页面");
    res.render('home/article.art', {
        articles: articles,
        Comment: comment
    });
}
