(function (factory) {

    "use strict";

    if (typeof define === "function" && define.amd) {
        define(factory);
    }
    else if (typeof module != "undefined" && typeof module.exports != "undefined") {
        module.exports = factory();
    }
    else if (typeof Package !== "undefined") {
        Attr = factory();  // export for Meteor.js
    }
    else {
        window["Attr"] = factory();
    }
})(function () {

    "use strict";
    var baseTemplate;
    var attrPrefix = "attr-";
    var pricateIdSuffix = "_private";

    function _createInput(obj) {
        var html = "<div class=\"input-group mt10\"  >";
        html += "<span class=\"input-group-addon\" id=\"basic-addon1\">" + obj.name + "</span>";
        html += "<input id=\"" + attrPrefix + obj.name + "\" type=\"" + obj.type + "\" value=\"" + obj.value + "\" class=\"form-control\"   aria-describedby=\"basic-addon1\">";
        html += "</div>"
        return html;
    }

    function _getBaseTemplate(callback) {
        if (baseTemplate == null) {
            $.get("./attr/baseAttr.json", function (ret) {
                callback(ret);
            });
        } else {
            callback(baseTemplate);
        }

    }

    function _createHtmlFormInput(ret) {
        var t = "";
        for (var i = 0; i < ret.length; i++) {
            t += _createInput(ret[i]);
        }
        return t;
    }

    function _saveLocal(id, _val) {
        sessionStorage.setItem(id, JSON.stringify(_val));
    }

    function _getLocal(id) {
        return JSON.parse(sessionStorage.getItem(id));
    }

    function _getBaseAttrHtml(id, callback) {
        _getBaseTemplate(function (ret) {
            var _idFormAttr = _getLocal(id);
            if (_idFormAttr == null) {
                _saveLocal(id, ret);
                callback(_createHtmlFormInput(ret));
            } else {
                callback(_createHtmlFormInput(_idFormAttr));
            }
        });
    }


    function _getPrivateAttrHtml(id, attrs, callback) {
        _saveLocal(id, attrs);
        callback(_createHtmlFormInput(attrs));
    }
    function Attr() {

        _getBaseTemplate(function (ret) {
            baseTemplate = ret;
        });
    };

    function _change(id, attrId, _val, callback) {
        var ret = _getLocal(id);
        var _result = new Object();
        if (ret == null) return;
        for (var i = 0; i < ret.length; i++) {
            if (attrId == (attrPrefix + ret[i].name)) {
                _result.attr = { name: ret[i].name, value: _val };
            }
        }
        callback(_result);
    }

    function _save(id, attrId, _val) {
        var ret = _getLocal(id);
        if (ret == null) return;
        for (var i = 0; i < ret.length; i++) {
            if (attrId == (attrPrefix + ret[i].name)) {
                ret[i].value = _val;
            }
        }
        _saveLocal(id, ret);
    }

    Attr.prototype = {
        html: function (el, id, callback) {
            _getBaseAttrHtml(id, function (ret) {
                el.html(ret);
                el.find('input[id^=' + attrPrefix + ']').each(function (index) {
                    $(this).change(function () {
                        var attrId = $(this).attr("id");
                        _save(id, attrId, $(this).val());
                        _change(id, attrId, $(this).val(), function (data) {
                            callback(data);
                        });
                    });
                });

            })
        },
        phtml: function (el, id, attrs, callback) {
            id = id + pricateIdSuffix;
            _getPrivateAttrHtml(id, function (ret) {
                el.html(ret);
                el.find('input[id^=' + attrPrefix + ']').each(function (index) {
                    $(this).change(function () {
                        var attrId = $(this).attr("id");
                        _save(id, attrId, $(this).val());
                        _change(id, attrId, $(this).val(), function (data) {
                            callback(data);
                        });
                    });
                });

            })
        },
        read: function (id) {

            return _getLocal(id);
        },
        save: function (id, res) {
            _saveLocal(id, res);
        },
        destory: function (id) {
            localStorage.removeItem(id);
        }
    }

    /**
     */
    Attr.init = function () {
        return new Attr();
    };


    // Export
    Attr.version = '1.0.0';
    return Attr;
});
