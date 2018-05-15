(function (f) {

    "use strict";

    if (typeof define === "function" && define.amd) {
        define(f);
    }
    else if (typeof module != "undefined" && typeof module.exports != "undefined") {
        module.exports = f();
    }
    else if (typeof Package !== "undefined") {
        Attr = f();  // export for Meteor.js
    }
    else {
        window["Attr"] = f();
    }
})(function () {

    "use strict";
    var baseAttr , element, 

    function _createInput(options) {
        var html = "<div class=\"input-group mt10\"  >";
        html += "<span class=\"input-group-addon\" id=\"basic-addon1\">" + options.name + "</span>";
        html += "<input id=\"attr-" + options.name + "\" type=\"" + options.type + "\" value=\"" + options.value + "\" class=\"form-control\"   aria-describedby=\"basic-addon1\">";
        html += "</div>"
        return html;
    }

    function Attr(el) {
        element = el;
        $.get("./attr/baseAttr.json", function(ret){
            baseAttr = ret;
            var t;
            for(var i = 0 ; i < ret.length ; i ++){
                t += _createInput(ret[i]);
            }
            el.html(t);
        })
    };


    Attr.prototype = {
       
    }

    /**
     */
    Attr.create = function () {
        return new Attr(el);
    };


    // Export
    Attr.version = '1.0.0';
    return Attr;
});
