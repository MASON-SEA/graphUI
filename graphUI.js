var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
///<reference path="./node/nodeObject.ts"/>
var orui;
(function (orui) {
    var graphUI = /** @class */ (function () {
        function graphUI(options) {
            this.container = options.container;
            this.custom_nodes = options.node_info || [];
            this.node_instances = {};
            this.stencil_title = options.stencil_title || 'default';
            this.stencil_groups = options.stencil_groups || [];
            this.init();
        }
        // 设置节点数据and更新画布
        graphUI.prototype.set_data = function (data) {
            var cell = this.get_selected_cells();
            if (cell) {
                cell.setData(data);
            }
        };
        // 判断是否有选中的节点
        graphUI.prototype.get_selected_cells = function () {
            var cells = this._selection.getSelectedCells();
            if (cells.length) {
                return cells;
            }
            return null;
        };
        graphUI.prototype.get_selected_cell = function () {
            var _a;
            var nodes = this.graph.getCells();
            for (var i = 0; i < nodes.length; ++i) {
                var n = nodes[i];
                if ((_a = n === null || n === void 0 ? void 0 : n.data) === null || _a === void 0 ? void 0 : _a.is_selected) {
                    return n;
                }
            }
            return null;
        };
        // 控制连接桩显示/隐藏
        graphUI.prototype.show_ports = function (ports, show) {
            for (var i = 0, len = ports.length; i < len; i = i + 1) {
                ports[i].style.visibility = show ? 'visible' : 'hidden';
            }
        };
        graphUI.prototype.init_plugin = function () {
            // 键盘插件
            var keyboard = new X6PluginKeyboard.Keyboard();
            keyboard.init(this.graph);
            this._keyboard = keyboard;
            // 剪贴板插件
            var clipboard = new X6PluginClipboard.Clipboard();
            clipboard.init(this.graph);
            this._clipboard = clipboard;
            // 辅助线
            var snapline = new X6PluginSnapline.Snapline();
            snapline.init(this.graph);
            // 选择节点插件
            var selection = new X6PluginSelection.Selection();
            selection.init(this.graph);
            this._selection = selection;
            // 小地图
            var minimap = new X6PluginMinimap.MiniMap({
                container: this.minimap_container,
                width: 200,
                height: 160,
                padding: 10,
                // position: 'top-right',
                // controls: ['zoom'],
                // showBackground: false
            });
            minimap.init(this.graph);
            // 撤消重做功能插件
            var history = new X6PluginHistory.History();
            history.init(this.graph);
            this._history = history;
        };
        // 快捷键与事件
        graphUI.prototype.bind_event = function () {
            var _this = this;
            //#region 复制粘贴
            this._keyboard.bindKey(['meta+c', 'ctrl+c'], function () {
                var cells = _this._selection.getSelectedCells();
                if (cells.length) {
                    _this._clipboard.copy(cells);
                }
                return false;
            });
            this._keyboard.bindKey(['meta+v', 'ctrl+v'], function () {
                if (_this._clipboard) {
                    var cells = _this._clipboard.paste({ offset: 32 });
                    _this._selection.clean();
                    _this._selection.select(cells);
                }
                return false;
            });
            //#endregion
            // 撤销
            this._keyboard.bindKey(['meta+z', 'ctrl+z'], function () {
                // undo redo
                _this._history.undo();
                return false;
            });
            // 画布保存
            this._keyboard.bindKey(['meta+s', 'ctrl+s'], function () {
                // 保存逻辑;
                console.log("save");
                return false;
            });
            this.graph.on("node:click", function (_a) {
                var e = _a.e, node = _a.node, view = _a.view;
                console.log("click");
                _this._selection.select(node);
                // 判断之前有没有点击的节点
                var cell = _this.get_selected_cell();
                if (cell && cell.id != node.id) {
                    cell.setData({
                        className: cell.data.defaultClassName,
                        is_selected: false
                    });
                }
                else {
                }
                node.setData({
                    className: node.data.defaultClassName + "-active",
                    is_selected: true
                });
                // node.setData({
                //     is_selected: true
                // });
            });
            // 弹窗处理
            this.graph.on("node:dbclick", function (_a) {
                var e = _a.e, node = _a.node, view = _a.view;
            });
            this.graph.on("node:mouseenter", function (_a) {
                var e = _a.e, node = _a.node, view = _a.view;
                var ports = _this.graph_container.querySelectorAll(".x6-port-body");
                _this.show_ports(ports, true);
                node.setData({
                    className: node.data.defaultClassName + "-hover"
                });
            });
            this.graph.on("node:mouseleave", function (_a) {
                var e = _a.e, node = _a.node, view = _a.view;
                var ports = _this.graph_container.querySelectorAll(".x6-port-body");
                _this.show_ports(ports, false);
                // 判断是否点击状态
                var cell = _this.get_selected_cell();
                if (cell && cell.id !== node.id && node.data.is_selected) {
                    cell.setData({
                        className: cell.data.defaultClassName
                    });
                }
                else {
                    if (!node.data.is_selected) {
                        node.setData({
                            className: node.data.defaultClassName
                        });
                    }
                    else {
                        node.setData({
                            className: node.data.defaultClassName + "-active"
                        });
                    }
                }
            });
            this.graph.on('cell:mouseenter', function (_a) {
                var cell = _a.cell;
                if (cell.isNode()) {
                    // cell.addTools([
                    //     {
                    //         name: 'boundary',
                    //         args: {
                    //             attrs: {
                    //                 fill: '#7c68fc',
                    //                 stroke: '#333',
                    //                 'stroke-width': 1,
                    //                 'fill-opacity': 0.2,
                    //             },
                    //         },
                    //     },
                    // ])
                }
                else {
                    cell.addTools(['vertices', 'segments']);
                }
            });
            this.graph.on('cell:mouseleave', function (_a) {
                var cell = _a.cell;
                cell.removeTools();
            });
        };
        // 根据node_name查重, 是否注册过
        graphUI.prototype.check_registed_node = function (node_name) {
            if (this.node_instances['node_name'])
                return true;
            else
                false;
        };
        // 注册节点-目前为html节点  （动态注入节点）
        graphUI.prototype.register_node = function () {
            var _loop_1 = function (i) {
                var name_1 = this_1.custom_nodes[i].node_name;
                if (this_1.check_registed_node(name_1))
                    return "continue";
                var node = eval("init_" + name_1)();
                this_1.node_instances[name_1] = node;
                var style = node.get_style();
                X6.Shape.HTML.register({
                    shape: style.shape,
                    width: style.width,
                    height: style.height,
                    effect: ['data'],
                    html: function (cell) {
                        return node.get_html(cell);
                    },
                    ports: __assign({}, this_1.ports)
                });
            };
            var this_1 = this;
            for (var i = 0; i < this.custom_nodes.length; i++) {
                _loop_1(i);
            }
        };
        // 根据注册的节点-创建节点
        graphUI.prototype.create_node = function () {
            var rs = [];
            // 根据group_name分组
            //let _groups = this.custom_nodes.groupBy(item => item.group_name);
            var _groups = this.custom_nodes.reduce(function (acc, item) {
                var key = item.group_name;
                if (!acc[key]) {
                    acc[key] = [];
                }
                acc[key].push(item);
                return acc;
            }, {});
            var _groups_arr = Object.entries(_groups);
            for (var i = 0; i < _groups_arr.length; ++i) {
                var _group_name = _groups_arr[i][0], _nodes = _groups_arr[i][1];
                var rs_1 = [];
                for (var j = 0; j < (_nodes === null || _nodes === void 0 ? void 0 : _nodes.length); j++) {
                    var _n = _nodes[j];
                    var node = this.node_instances[_n.node_name];
                    var r = this.graph.createNode({
                        shape: node.get_style().shape,
                        data: {
                            name: node.name,
                            className: node.className,
                            defaultClassName: node.className
                        }
                    });
                    rs_1.push(r);
                }
                this.stencil.load(rs_1, _group_name);
            }
        };
        // 初始化画布左边节点块
        graphUI.prototype.init_stencil = function () {
            // const stencil = new X6PluginStencil.Stencil({
            //     title: '流程图',
            //     target: this.graph,
            //     stencilGraphWidth: 200,
            //     stencilGraphHeight: 180,
            //     collapsable: true,
            //     groups: [
            //         {
            //             title: '基础流程图',
            //             name: 'group1',
            //         },
            //         {
            //             title: '系统设计图',
            //             name: 'group2',
            //             graphHeight: 250,
            //             layoutOptions: {
            //                 rowHeight: 70,
            //             },
            //         },
            //     ],
            //     layoutOptions: {
            //         columns: 2,
            //         columnWidth: 80,
            //         rowHeight: 55,
            //     },
            // });
            var stencil = new X6PluginStencil.Stencil({
                title: this.stencil_title,
                target: this.graph,
                stencilGraphWidth: 200,
                stencilGraphHeight: 180,
                collapsable: true,
                groups: this.stencil_groups,
                layoutOptions: {
                    columns: 2,
                    columnWidth: 80,
                    rowHeight: 55,
                },
            });
            this.stencil_container.appendChild(stencil.container);
            this.stencil = stencil;
        };
        // 初始化画布
        graphUI.prototype.init_graph = function () {
            var _this = this;
            var graph = new X6.Graph({
                container: _this.graph_container,
                //网格背景
                grid: {
                    visible: true,
                    type: 'doubleMesh',
                    args: [
                        {
                            color: '#eee',
                            thickness: 1, // 主网格线宽度
                        },
                        {
                            color: '#ddd',
                            thickness: 1,
                            factor: 4 // 主次网格线间隔
                        }
                    ]
                },
                mousewheel: {
                    enabled: true,
                    zoomAtMousePosition: true,
                    modifiers: 'ctrl',
                    minScale: 0.5,
                    maxScale: 3,
                },
                panning: true,
                connecting: {
                    router: {
                        name: 'manhattan',
                        args: {
                            padding: 1,
                        },
                    },
                    connector: {
                        name: 'rounded',
                        args: {
                            radius: 8,
                        },
                    },
                    anchor: 'center',
                    connectionPoint: 'anchor',
                    allowBlank: false,
                    snap: {
                        radius: 20,
                    },
                    createEdge: function () {
                        return new X6.Shape.Edge({
                            attrs: {
                                line: {
                                    stroke: '#A2B1C3',
                                    strokeWidth: 2,
                                    targetMarker: {
                                        name: 'block',
                                        width: 12,
                                        height: 8,
                                    },
                                },
                            },
                            zIndex: 0,
                        });
                    },
                    validateConnection: function (_a) {
                        var targetMagnet = _a.targetMagnet;
                        return !!targetMagnet;
                    },
                },
                highlighting: {
                    magnetAdsorbed: {
                        name: 'stroke',
                        args: {
                            attrs: {
                                fill: '#5F95FF',
                                stroke: '#5F95FF',
                            },
                        },
                    },
                },
                resizing: true,
                rotating: true,
                selecting: {
                    enabled: true,
                    rubberband: true,
                    showNodeSelectionBox: true,
                },
                snapline: true,
                // 键盘事件
                keyboard: {
                    enabled: true,
                    global: true
                },
                clipboard: true,
            });
            this.graph = graph;
        };
        // 连接桩
        graphUI.prototype.init_ports = function () {
            var ports = {
                groups: {
                    top: {
                        position: 'top',
                        attrs: {
                            circle: {
                                r: 4,
                                magnet: true,
                                stroke: '#5F95FF',
                                strokeWidth: 1,
                                fill: '#fff',
                                style: {
                                    visibility: 'hidden',
                                },
                            },
                        },
                    },
                    right: {
                        position: 'right',
                        attrs: {
                            circle: {
                                r: 4,
                                magnet: true,
                                stroke: '#5F95FF',
                                strokeWidth: 1,
                                fill: '#fff',
                                style: {
                                    visibility: 'hidden',
                                },
                            },
                        },
                    },
                    bottom: {
                        position: 'bottom',
                        attrs: {
                            circle: {
                                r: 4,
                                magnet: true,
                                stroke: '#5F95FF',
                                strokeWidth: 1,
                                fill: '#fff',
                                style: {
                                    visibility: 'hidden',
                                },
                            },
                        },
                    },
                    left: {
                        position: 'left',
                        attrs: {
                            circle: {
                                r: 4,
                                magnet: true,
                                stroke: '#5F95FF',
                                strokeWidth: 1,
                                fill: '#fff',
                                style: {
                                    visibility: 'hidden',
                                },
                            },
                        },
                    },
                },
                items: [
                    {
                        group: 'top',
                    },
                    {
                        group: 'right',
                    },
                    {
                        group: 'bottom',
                    },
                    {
                        group: 'left',
                    },
                ],
            };
            this.ports = ports;
        };
        graphUI.prototype.render = function () {
            var stencil_dom = document.createElement("div");
            stencil_dom.className = "stencil-container";
            this.container.appendChild(stencil_dom);
            this.stencil_container = stencil_dom;
            var graph_dom = document.createElement("div");
            graph_dom.className = "graph-container";
            this.container.appendChild(graph_dom);
            this.graph_container = graph_dom;
            var minimap_dom = document.createElement("div");
            minimap_dom.className = "minimap-container";
            this.container.appendChild(minimap_dom);
            this.minimap_container = minimap_dom;
        };
        graphUI.prototype.init = function () {
            var _this = this;
            this.render();
            this.init_graph();
            this.init_stencil();
            this.init_ports();
            this.init_plugin();
            this.register_node();
            this.create_node();
            _this.bind_event();
        };
        graphUI.prototype.get_data = function () {
            return this.graph.toJSON();
        };
        return graphUI;
    }());
    orui.graphUI = graphUI;
})(orui || (orui = {}));
