function createMargin(options) {
    var defaults = {
        type: "number",
        value: "text",
        name: "",
        min: "0",
        id: "0",
    }
    for (var name in defaults) {
        !(name in options) && (options[name] = defaults[name]);
    }
    var html = "<div class=\"input-group mt10\"  >";
    html += "<span class=\"input-group-addon\" id=\"basic-addon1\">" + options.name + "</span>";
    html += "<input id=\"" + options.id + "\" type=\"" + options.type + "\" value=\"" + options.value + "\" class=\"form-control\"  min=\"" + options.min + "\" aria-describedby=\"basic-addon1\">";
    html += "</div>"
    return html;
}

function createHeader(title){
    return "<div class=\"page-header\"><h5> " + title+"</h5></div>";
}

function createMaringPlane(json) {
    var ret = createHeader(json.margin.title);;
    var attr = json.margin.attr;
    for (var i = 0; i < attr.length ; i ++){
        ret += createMargin(attr[i]);
    }
    return ret;
}


function changeContentWarp(index , el) {
    console.log(el);
    if ($.cookie("margin_json_file") == null){
        $.get("./dist/margin.json", function (ret) {
            $.cookie("margin_json_file", ret);
            $(el).html(createMaringPlane(ret));
        });
    }else{
        var ret = $.cookie("margin_json_file") ;
        console.log(ret);
        $(el).html(createMaringPlane(ret));
    }
}
