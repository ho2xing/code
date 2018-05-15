function createPathAttr(options){
    var defaults = {
        dir : "./component/",
        methodFileName : "index.js",
        templateFileName : "index.tpl",
    };
     // set defaults options
    for (var name in defaults) {
        !(name in options) && (options[name] = defaults[name]);
    }
    return options;
}
function createBaseAttr(options){
    var defaults = {
        id : -1,
        name : "组件名称",
        desc : this.name,
        dir :"example",   
    }
    // set defaults options
    for (var name in defaults) {
        !(name in options) && (options[name] = defaults[name]);
    }
    return  options;
}



return 
[
    $.extend(createBaseAttr() ,createPathAttr({id : "1" , name : "单列组件" , dir : "singleInput"})) ,


];
