(function (factory) {

    "use strict";

    if (typeof define === "function" && define.amd) {
        define(factory);
    }
    else if (typeof module != "undefined" && typeof module.exports != "undefined") {
        module.exports = factory();
    }
    else if (typeof Package !== "undefined") {
        App = factory();  
    }
    else {
        window["App"] = factory();
    }
})(function () {

    "use strict";
  
    









    function _extend(dst, src) {
        if (dst && src) {
            for (var key in src) {
                if (src.hasOwnProperty(key)) {
                    dst[key] = src[key];
                }
            }
        }
        return dst;
    }

    function App(options){

        this.options = options = _extend({}, options);

        var defaults = {
            phoneAreaId: "phoneArea",
            baseAttrId: "baseAttr",
            userAttrId: "userAttr",
            componentAreaId : "tab1",
            model: ["singleInput", "title", "numberInput"]
        }


        for (var name in defaults) {
            !(name in options) && (options[name] = defaults[name]);
        }

        sessionStorage.clear();
        var _attr = Attr.init();
        var _utils = Sortable.utils;

        function _buildBindOptions(data) {
            var bindOptions = {
                animation: 200,
                group: {
                    name: "shared",
                    pull: "clone",
                    dataIdAttr: 'data-id',
                    revertClone: true,
                },
                sort: false,
                setData: function (dataTransfer, dragEl) {
                    dragEl.unique_id = data.unique_id;
                    dragEl.attrs = data.attrs;
                }
            };
            return bindOptions;
        }
        //左侧组件部分
        var _component = Component.create();
        for (var i = 0; i < this.options.model.length; i++) {
            _component.add({ dir: this.options.model[i] });
        }
        _component.appendTo("#" + this.options.componentAreaId, function (ret) {
            for (var i = 0; i < ret.length; i++) {
                var data = new Object();
                data.attrs = (ret[i].data.attrs == "undefined") ? null : ret[i].data.attrs;
                Sortable.create(document.getElementById(ret[i].name), _buildBindOptions(data));
            }
            $("#" + options.componentAreaId).children().each(function (index) {
                if (index > 0) {
                    $(this).css({ "margin-top": "10px" });
                }
            })
        })
        var phone = document.getElementById(this.options.phoneAreaId);
        var phoneObject = Sortable.create(phone, {
            group: "shared",
            sort: true,
            onAdd: function (/**Event*/evt) {
                var baseArea = $("#" + options.baseAttrId);
                var userArea = $("#" + options.userAttrId);
                var unique_id = new Date().getTime();

                console.log(evt.item.attrs);
                function addBaseAttr() {
                    _attr.makeBaseAttr(baseArea, unique_id, function (data) {
                        var attrName = data.attr.name + "";
                        var attrValue = data.attr.value + "px";
                        $(evt.item).css(attrName, attrValue);
                    });
                }

                function addPrivateAttr() {
                    _attr.makeComAttr(userArea, unique_id, evt.item.attrs, function (data) {
                        var attrName = data.attr.name + "";
                        var attrValue = data.attr.value + "px";
                        $(evt.item).css(attrName, attrValue);
                    });
                }

                function init() {
                    if (evt.item.attrs != "undefined" && evt.item.attrs != null) {
                        try {
                            addPrivateAttr();
                        } catch (e) { };
                    } else {
                        privatePropertyWarp.html("");
                    }
                    addBaseAttr();
                }


                function bindClickAction() {
                    _utils.on(evt.item, "click", function () {
                        addBaseAttr();
                        if (evt.item.attrs != "undefined" && evt.item.attrs != null) {
                            try {
                                addPrivateAttr();
                            } catch (e) { };
                        } else {
                            privatePropertyWarp.html("");
                        }
                    });
                }

                init();
                bindClickAction();
            },
            onRemove: function (/**Event*/evt) {


            },
            onSort: function (/**Event*/evt) {


            },
            onUpdate: function (evt) {

            }
        });

       
    }

    // App.prototype = {
        
    // }

    /**
     */
    App.init = function (options) {
        return new App(options);
    };


    // Export
    App.version = '1.0.0';
    return App;
});
