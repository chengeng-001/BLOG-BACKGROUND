module.exports = (req,res) => {
    //这是一个标识表示访问的是user页面
    req.app.locals.currentLink = 'article';

    res.render('./admin/article-edit.art');
}