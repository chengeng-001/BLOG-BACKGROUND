//创建用户集合
const mongoose = require('mongoose');
//导入加密模块
const bcrypt = require('bcrypt');
//引入验证模块
const joi = require('joi');


//创建用户集合规则
const  UserSchema = new mongoose.Schema({
   username: {
       type: String,
       //必填项
       required: true,
       minlength: 2,
       maxlength: 20
   },
   email: {
       type: String,
       //验证邮箱 并查询内容是否相同
       unique: true,
       required: true
   },
   password: {
       type: String,
       required: true
   },
    //角色
   role: {
       type: String,
       required: true
   },
   state: {
       type: Number,
       default: 0
   }
});

const User = mongoose.model("Blog",UserSchema);
//先创建管理员账户 创建完成关闭
// User.create({
//     username: 'zhangsan',
//     email: '1069684567@qq.com',
//     password: '123456',
//     role: 'admin',
//     state: 0
// }).then(() => {
//     console.log("用户创建成功")
// }).catch(console.log("用户创建失败"));

//创建管理员账户并且进行优化
    //对密码进行加密
// async function CreateBcrypt() {
//     const salt = await bcrypt.genSalt(10);
//     const pwd = await bcrypt.hash('123456',salt);
//     const user = await User.create({
//         username: 'zhangsan',
//         email: '1069684567@qq.com',
//         password: pwd,
//         role: 'admin',
//         state: 0
//     });
//     console.log(user);
// }
// CreateBcrypt();

//验证用户信息

const validateUser = user => {
    const schema = joi.object({
        username: joi.string().min(2).max(12).required().error(new Error("用户名错误")),
        //email 验证邮箱
        email: joi.string().email().error(new Error("邮箱错误")),
        //密码验证
        password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).error(new Error("密码错误")),
        //valid 是规定的参数 可以规定输入多个
        role: joi.string().valid('normal', 'admin').required().error(new Error("角色名非法")),
        state: joi.number().valid(0, 1).required().error(new Error("状态值非法"))
    });
    //实施验证
    return  schema.validateAsync(user);
}



module.exports = {
    User,
    validateUser
};