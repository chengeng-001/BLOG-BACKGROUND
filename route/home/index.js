//主页
const { article }  = require('../../model/article');
//导入分页模块
const pagination = require('mongoose-sex-page');
module.exports = async (req,res) => {

    //接受分页数据
    const page = req.query.page;
    //查询文章数据
    let result = await pagination(article).find({}).page(page).size(4)
        .display(5).populate('auths').exec();

    //处理result数据
    result = JSON.stringify(result);
    result = JSON.parse(result);
    // res.send(result); //测试数据
    // return;
    // res.send("欢迎来到博客首页");
    res.render('home/default.art',{
        result: result
    });
}