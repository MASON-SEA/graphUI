///<reference path="nodeObject.ts"/>
function init_sectionNode() {
    var node = new orui.section_node();
    return node;
}
var orui;
(function (orui) {
    var section_node = /** @class */ (function () {
        function section_node() {
            this.type = "custom-section";
            this.name = "工段";
            this.className = "section-node";
        }
        section_node.prototype.get_style = function () {
            return {
                width: 66,
                height: 36,
                shape: 'custom-section'
            };
        };
        section_node.prototype.get_html = function (cell) {
            var _a = cell.getData(), name = _a.name, className = _a.className;
            var div = document.createElement("div");
            div.className = className;
            div.innerHTML = name; // 该名字可修改
            return div;
        };
        return section_node;
    }());
    orui.section_node = section_node;
})(orui || (orui = {}));
