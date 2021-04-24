//导入mongoose模块
const mongoose = require('mongoose');
//创建集合规则
const CommentSchema = new mongoose.Schema({
   //文章id
   aid:  {
       type: mongoose.Schema.Types.ObjectId,
       //关联文章保存集合
       ref: 'Article',
       required: [true,'id未输入']
   },
   uid: {
       type: mongoose.Schema.Types.ObjectId,
       //关联用户集合
       ref: 'Blog'
   },
    //评论时间
   time: {
       type: Date
   },
   //评论内容
    content: {
       type: String
    }
});

const Comment = mongoose.model('Comment',CommentSchema);

module.exports = {
    Comment
}