function AttrBase() {
    this.attrs = new Object();
    this._baseAttrs = [{
        name: "margin-left",
        value: "0",
        type: "number"
    }, {
        name: "margin-right",
        value: "0",
        type: "number"
    }, {
        name: "margin-top",
        value: "10",
        type: "number"
    }, {
        name: "margin-bottom",
        value: "0",
        type: "number"
    }];
    this.attrs.base = this._baseAttrs;
}
AttrBase.prototype.getBaseAttrs = function(){
    return this.attrs;
}

function AttrCustom(){
    this
}