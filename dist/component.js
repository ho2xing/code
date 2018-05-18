(function (factory) {

    "use strict";

    if (typeof define === "function" && define.amd) {
        define(factory);
    }
    else if (typeof module != "undefined" && typeof module.exports != "undefined") {
        module.exports = factory();
    }
    else if (typeof Package !== "undefined") {
        Component = factory();  // export for Meteor.js
    }
    else {
        window["Component"] = factory();
    }
})(function () {

    "use strict";

    var displayEl, _callback;
    var methodFileRequestCount = 0;
    var tplFileRequestCount = 0;
    var componentArray = new Array();
    var defaults = {
        rootDir: "./component/",
        dir: "",
        methodFileName: "index.json",
        templateFileName: "index.tpl",
        dir: "example",
    };


    function Component() {
    };



    function _createItem(options) {
        return _getOptions(defaults, options);
    }

    function _getOptions(defaults, options) {
        for (var name in defaults) {
            !(name in options) && (options[name] = defaults[name]);
        }
        return options;
    }

    function _loadMethodFile() {

        if (methodFileRequestCount >= componentArray.length) {
            _LoadTemplateFile();
            return;
        }
        var methodfilePath = componentArray[methodFileRequestCount].rootDir + "/"
            + componentArray[methodFileRequestCount].dir + "/"
            + componentArray[methodFileRequestCount].methodFileName;

        $.ajax({
            type: 'get',
            url: methodfilePath,
            // cache: true,
            success: function (ret) {
                componentArray[methodFileRequestCount].methodFile = ret;
                methodFileRequestCount++;
                _loadMethodFile();
            },
            error: function (ret) {
                methodFileRequestCount++;
                _loadMethodFile();
            }
        });
    }

    function _LoadTemplateFile() {

        if (tplFileRequestCount >= componentArray.length) {
            _make();
            return;
        }
        var telFilePath = componentArray[tplFileRequestCount].rootDir
            + "/" + componentArray[tplFileRequestCount].dir
            + "/" + componentArray[tplFileRequestCount].templateFileName;

        $.ajax({
            type: 'get',
            url: telFilePath,
            // cache: true,
            success: function (ret) {
          
                componentArray[tplFileRequestCount].tplFile = ret;
                tplFileRequestCount++;
                _loadMethodFile();
            },
            error: function (ret) {
                tplFileRequestCount++;
                _loadMethodFile();
            }
        });
    }


    function _make() {
        $.getScript("./dist/jquery.tmpl.min.js", function () {
            var attrArray = new Array();
            for (var i = 0; i < componentArray.length; i++) {
                var target = componentArray[i].dir + i;
                $.template(target, componentArray[i].tplFile);
                $.tmpl(target, componentArray[i].methodFile).appendTo(displayEl);
                try {
                    attrArray[i] = { data: componentArray[i].methodFile, name: componentArray[i].dir };
                } catch{ }
            }
            if (_callback != null) {
                _callback(attrArray);
            }

        })
    }
    Component.prototype = {

        add: function (options) {
            componentArray.push(_createItem(options));
        },
        appendTo: function (el, callback) {
            displayEl = el;
            _callback = callback;
            methodFileRequestCount = 0;
            tplFileRequestCount = 0;
            _loadMethodFile();
        }
    }

    /**
     */
    Component.create = function () {
        return new Component();
    };


    // Export
    Component.version = '1.0.0';
    return Component;
});
