///<reference path="nodeObject.ts"/>
function init_processNode() {
    var node = new orui.process_node();
    return node;
}
var orui;
(function (orui) {
    var process_node = /** @class */ (function () {
        function process_node() {
            this.type = "custom-process";
            this.name = "工序";
            this.className = "process-node";
        }
        process_node.prototype.get_style = function () {
            return {
                width: 66,
                height: 36,
                shape: 'custom-process'
            };
        };
        process_node.prototype.get_html = function (cell) {
            var _a = cell.getData(), name = _a.name, className = _a.className;
            var div = document.createElement("div");
            div.className = "process-node";
            div.innerHTML = name; // 该名字可修改
            return div;
        };
        return process_node;
    }());
    orui.process_node = process_node;
})(orui || (orui = {}));
