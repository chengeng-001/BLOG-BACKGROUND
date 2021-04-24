//将文章集合函数导入到当前文件中
const { article } = require('../../model/article');
//导入分页模块
const  pagination = require('mongoose-sex-page');
module.exports = async (req,res) => {
    //文章列表页面

    //接收客户端的页码
    const paeg = req.query.page;
    //这是一个标识表示访问的是user页面
    req.app.locals.currentLink = 'article';
    //查询文章所有的数据
    //model  中article 的联合数据库名称一定要查询准确
    //跟mysql 级联是一样的
    //可以在查询链上使用lean() 告诉mongoose返回普通对象 不返回mongoose文档对象 //不调用会出错
    let articles = await pagination(article).find({}).page(paeg).size(2).
    display(3).populate('auths').exec();//调用多集合联合查询

    articles =  JSON.stringify(articles);
    articles =  JSON.parse(articles);


    // res.send(articles); // 测试数据
    // //对象中的参数在模板中是可以得到的
    res.render('./admin/article',{
        articles: articles
    });
}