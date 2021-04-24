//引入大文件处理
const formidable = require('formidable');
const path = require('path');
const {article} = require('../../model/article');
module.exports = (req,res) => {
    //创建表单解析对象
    const form = new formidable.IncomingForm();
    //配置文件到uploads
    form.uploadDir = path.join(__dirname,'../','../','public','uploads');
    //保留上传文件后缀
    form.keepExtensions = true;
    //解析表单 第一个获取客户端参数 第二个为执行函数
    form.parse(req,async (err,fields,files) => {
        //错误信息err
        //fields 对象类型 保存普通表单类型
        // files 对象类型 保存和上传文件相关数据、
        // console.log(files.cover.path.split('public')[1]); //验证获取图片地址
        await article.create({
            title:fields.title,
            auths:fields.auths,
            publishDate:fields.publishDate,
            cover: files.cover.path.split('public')[1], //获取图片的所有信息
            content:fields.content
        });
        //将页面重定向回到列表页面
        res.redirect('/admin/article')
    });
    // res.send('ok');
}