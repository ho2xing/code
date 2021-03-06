function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};

function getData(sortableObject){
    var order = [],
        el,
        children = sortableObject.el.children,
        i = 0,
        n = children.length,
        options = sortableObject.options;

    for (; i < n; i++) {
        el = children[i];
        if (_closest(el, options.draggable, sortableObject.el)) {
            order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
        }
    }

    return order;
}