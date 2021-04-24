//接收数据
function serializeToJson(form) {
    var result = {};
    //获取表单用户输入的内容
    var f = form.serializeArray();
    f.forEach(function (item) {
        result[item.name] = item.value;
    });
    return result;
}
