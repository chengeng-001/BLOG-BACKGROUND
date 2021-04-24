//引入mongoose模块
const mongoose = require('mongoose');
//创建文章集合规则
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 20,
        minlength: 4,
        required: [true,'请填写文章标题']
    },
    //进行文章关联
    auths: {
        //获取Id连接
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: [true,"请填写作者"]
    },
    //发布时间
    publishDate: {
        type: Date,
        default : Date.now()
    },
    //文章封面
    cover: {
        type: String,
        default: null
    },
    //文章内容
    content: String
});

//根据规则创建集合
const article = mongoose.model('Article', articleSchema);
//将集合规则作为模块成员
module.exports = {
    article
}
