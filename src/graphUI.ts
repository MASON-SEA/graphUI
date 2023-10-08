import { NodeObject } from './node/nodeObject';
import * as X6 from '@antv/x6';
import * as X6PluginKeyboard from '@antv/x6-plugin-keyboard';
import * as X6PluginClipboard from '@antv/x6-plugin-clipboard';
import * as X6PluginSnapline from '@antv/x6-plugin-snapline';
import * as X6PluginSelection from '@antv/x6-plugin-selection';
import * as X6PluginHistory from '@antv/x6-plugin-history';
import * as X6PluginMinimap from '@antv/x6-plugin-minimap';
import * as X6PluginStencil from '@antv/x6-plugin-stencil';

import { process_node } from './node/process_node';
import { section_node } from './node/section_node';

const node_map = {
  processNode: process_node,
  sectionNode: section_node,
};

export type node_name = keyof typeof node_map;

/*
 * @Title: GraphUI
 * @Date: 2023.7.4
 * @Author: solo
 * @Desc: 功能型画布:
 *   1. 实现动态注入html节点 (节点类型)，根据不同类型，打开不同entity组件
 *   2. 实现快捷键操作方式,eg:ctrl+s 保存数据
 *   3. 设置连接点位、连接桩
 *   4. stencil模板设置分组和添加节点
 * */

interface graphUIOptions {
  container: HTMLElement;
  node_info: Array<NodeInfo>;
  stencil_title: string; // 模板title
  stencil_groups: Array<StencilGroups>;
}

interface NodeInfo {
  node_name: node_name;
  group_name: string;
  imgurl?:string;
  isCheck?:boolean;
  isEdit?:boolean
}

interface StencilGroupsLayoutOptions {
  rowHeight: number;
}

interface StencilGroups {
  title: string;
  name: string;
  graphHeight: number;
  layoutOptions: StencilGroupsLayoutOptions;
}

// export namespace orui {
export class graphUI {
  constructor(options: graphUIOptions) {
    this.container = options.container;
    this.custom_nodes = options.node_info || [];
    this.node_instances = {};
    this.stencil_title = options.stencil_title || 'default';
    this.stencil_groups = options.stencil_groups || [];
    this.translate_position = {x:0,y:0}

    this.init();
  }

  container: HTMLElement;
  graph!: X6.Graph;
  stencil: any;
  stencil_container!: HTMLElement;
  graph_container!: HTMLElement;
  minimap_container!: HTMLElement;
  ports: any; // 节点上的连接点
  translate_position:{
    x:number,
    y:number
  }

  // 节点信息
  custom_nodes: Array<NodeInfo>;
  node_instances: {
    [key in node_name | string]?: NodeObject;
  };
  node_labels:any;
  stencil_title: string;
  stencil_groups: Array<StencilGroups>;

  // 插件
  _keyboard!: X6PluginKeyboard.Keyboard;
  _clipboard!: X6PluginClipboard.Clipboard;
  _selection!: X6PluginSelection.Selection;
  _history!: X6PluginHistory.History;

  // 设置节点数据and更新画布
  set_data(data) {
    let cells = this.get_selected_cells();
    if (cells) {
      // cell.setData(data);
    }
  }

  // 判断是否有选中的节点
  get_selected_cells(): X6.Cell[] | null {
    let cells = this._selection.getSelectedCells();
    if (cells.length) {
      return cells;
    }
    return null;
  }

  get_selected_cell(): X6.Cell | null {
    let nodes = this.graph.getCells();
    for (let i = 0; i < nodes.length; ++i) {
      let n = nodes[i];
      if (n?.data?.is_selected) {
        return n;
      }
    }
    return null;
  }

  // 控制连接桩显示/隐藏
  show_ports(ports, show) {
    for (let i = 0, len = ports.length; i < len; i = i + 1) {
      ports[i].style.visibility = show ? 'visible' : 'hidden';
    }
  }

  init_plugin() {
    // 键盘插件
    const keyboard = new X6PluginKeyboard.Keyboard();
    keyboard.init(this.graph);
    this._keyboard = keyboard;

    // 剪贴板插件
    const clipboard = new X6PluginClipboard.Clipboard();
    clipboard.init(this.graph);
    this._clipboard = clipboard;

    // 辅助线
    const snapline = new X6PluginSnapline.Snapline();
    snapline.init(this.graph);

    // 选择节点插件
    const selection = new X6PluginSelection.Selection();
    selection.init(this.graph);
    this._selection = selection;

    // 小地图
    const minimap = new X6PluginMinimap.MiniMap({
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
    const history = new X6PluginHistory.History();
    history.init(this.graph);
    this._history = history;
  }

  // 快捷键与事件
  bind_event() {
    let _this = this;

    //#region 复制粘贴
    this._keyboard.bindKey(['meta+c', 'ctrl+c'], () => {
      const cells = _this._selection.getSelectedCells();
      if (cells.length) {
        _this._clipboard.copy(cells);
      }
      return false;
    });

    this._keyboard.bindKey(['meta+v', 'ctrl+v'], () => {
      if (_this._clipboard) {
        const cells = _this._clipboard.paste({ offset: 32 });
        _this._selection.clean();
        _this._selection.select(cells);
      }
      return false;
    });
    //#endregion

    // 撤销
    this._keyboard.bindKey(['meta+z', 'ctrl+z'], () => {
      // undo redo
      _this._history.undo();
      return false;
    });

    // 画布保存
    this._keyboard.bindKey(['meta+s', 'ctrl+s'], () => {
      // 保存逻辑;
      console.log('save');
      return false;
    });

    // 删除选中cell
    this._keyboard.bindKey(['Backspace'], this._onKeyboardDelete.bind(this));

    this.graph.on('node:click', ({ e, node, view }) => {
      console.log('click');
      console.log(arguments);
      _this._selection.select(node);

      // 判断之前有没有点击的节点
      let cell = _this.get_selected_cell();
      if (cell && cell.id != node.id) {
        cell.setData({
          className: cell.data.defaultClassName,
          is_selected: false,
        });
      } else {
      }
      if(node.data.className != node.data.defaultClassName + '-active' && e.target.type != 'checkbox'){
        node.setData({
          className: node.data.defaultClassName + '-active',
          is_selected: true,
        });
      }
    });

    // 弹窗处理
    this.graph.on('node:dbclick', ({ e, node, view }) => { });

    this.graph.on('node:mouseenter', ({ e, node, view }) => {
      const ports = _this.graph_container.querySelectorAll('.x6-port-body');
      _this.show_ports(ports, true);

      node.setData({
        className: node.data.defaultClassName + '-hover',
      });
    });

    this.graph.on('node:mouseleave', ({ e, node, view }) => {
      const ports = _this.graph_container.querySelectorAll('.x6-port-body');
      _this.show_ports(ports, false);

      // 判断是否点击状态
      let cell = _this.get_selected_cell();
      if (cell && cell.id !== node.id && node.data.is_selected) {
        cell.setData({
          className: cell.data.defaultClassName,
        });
      } else {
        if (!node.data.is_selected) {
          node.setData({
            className: node.data.defaultClassName,
            editable:false
          });
        } else {
          node.setData({
            className: node.data.defaultClassName + '-active',
          });
        }
      }
    });

    this.graph.on('cell:mouseenter', ({ cell }) => {
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
      } else {
        cell.addTools(['vertices', 'segments']);
      }
    });

    this.graph.on('cell:mouseleave', ({ cell }) => {
      cell.removeTools();
    });

    this.graph.on('cell:contextmenu', ({ e, cell }) => {
      if (cell.isEdge()) {
        // 创建输入框
        const input = document.createElement('input');
        input.style.all = 'unset';
        input.style.position = 'absolute';
        input.style.zIndex = '1000';
        input.style.backgroundColor = '#fff';
        input.style.width = '60px';
        input.style.height = '20px';
        input.style.border = '1px solid #ddd'

        // 设置输入框的初始值
        let value = cell.getLabelAt(0)?.attrs?.text?.text || '';
        value = isNaN(parseInt(value)) ? 1 : parseInt(value);
        input.value = value;

        //清空线上的值
        cell.prop('labels/0/attrs/text/text', '');

        // 当用户完成编辑时，更新边的标签
        input.addEventListener('blur', () => {
          let value: number | string = isNaN(parseInt(input.value)) ? 1 : parseInt(input.value);
          value = value < 1 ? 1 : value;
          value = value == 1 ? '' : value + 'x';
          if (cell.getLabels().length === 0) {
            cell.addLabel({ attrs: { text: { text: value } } });
          } else {
            cell.prop('labels/0/attrs/text/text', value);
          }
          document.body.removeChild(input);
        });

        // 将输入框添加到文档中，并自动获取焦点
        document.body.appendChild(input);
        input.focus();

        // 获取点击的位置
        const clientPosition = this.graph.clientToLocal(e.clientX, e.clientY);

        // 调整输入框的位置为相对于输入框的中心
        setTimeout(() => {
          input.style.left = `calc(${e.clientX}px - ${input.offsetWidth / 2}px)`;
          input.style.top = `calc(${e.clientY}px - ${input.offsetHeight / 2}px)`;
        }, 0);
      }else if(cell.isNode()){
        cell.setData({editable:true})
        if(cell.data.isEdit){
          const input = document.createElement('input');
          input.style.all = 'unset';
          input.style.position = 'absolute';
          input.style.zIndex = '1000';
          input.style.backgroundColor = '#fff';
          input.style.width = '60px';
          input.style.height = '20px';
          input.style.border = '1px solid #ddd'
          input.autofocus = true
          input.value = cell.data.name
          // const target = e.target.parentElement.className.indexOf('-node') != -1 ?e.target.parentElement:e.target
          document.body.appendChild(input)
          
          input.onblur = function(e){
            let value = input.value
            cell.setData({name:value,editable:false})
            document.body.removeChild(input)
          }
          input.focus()
          const cell_position = cell.position()
          let _width = this.stencil.container.clientWidth + parseFloat(input.style.width) / 2 + this.translate_position.x
          
          let _height = cell.size().height - parseFloat(input.style.height) + this.translate_position.y
          setTimeout(() => {
            
            input.style.left = `calc(${cell_position.x}px + ${_width}px)`;
            input.style.top = `calc(${cell_position.y}px + ${_height}px)`;
          }, 0);
        }
        // // const keys = Object.keys(this.node_instances)
        // // for(let j = 0; j < keys.length; j++){
        // //   let key = keys[j]
        // //   //@ts-ignore
        // //   if(this.node_instances[key].name == cell.data.name){
        // //     this.node_instances[key]?.addOnBlurEvent(this.set_node_name)
        // //   }
        // // }
        // debugger
      }
    });

    this.graph.on('translate',({ tx, ty}) => {
      // console.log(tx,ty)
      Object.assign(this.translate_position,{x:tx,y:ty})
    })

  }

  private _onKeyboardDelete() {
    const cell = this.get_selected_cell();
    cell?.remove();
  }

  // 根据node_name查重, 是否注册过
  check_registed_node(node_name: string) {
    if (this.node_instances[node_name]) return true;
    else false;
  }

  // 注册节点-目前为html节点  （动态注入节点）
  register_node() {
    this.node_labels = {
      'sectionNode':'工段',
      'processNode':'工序'
    }
    for (let i = 0; i < this.custom_nodes.length; i++) {
      let name = this.custom_nodes[i].node_name;
      if (this.check_registed_node(name)) continue;

      const node_constructor = node_map[<node_name>name];
      let node: NodeObject = new node_constructor(this.custom_nodes[i]);
      this.node_instances[name] = node;
      let style: any = node.get_style();
      console.log(style)
      X6.Shape.HTML.register({
        shape: style.shape,
        width: style.width,
        height: style.height,
        effect: ['data'],
        html(cell) {
          // cell.setData(JSON.parse(JSON.stringify(cell.getData())));
          return node.get_html(cell);
        },
        ports: { ...this.ports },
      });
    }
  }

  // 根据注册的节点-创建节点
  create_node() {
    let rs = [];
    // 根据group_name分组
    //let _groups = this.custom_nodes.groupBy(item => item.group_name);
    const _groups = this.custom_nodes.reduce((acc, item) => {
      const key = item.group_name;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});

    let _groups_arr = Object.entries(_groups);

    for (let i = 0; i < _groups_arr.length; ++i) {
      let _group_name = _groups_arr[i][0],
        _nodes = _groups_arr[i][1];
      rs = [];
      for (let j = 0; j < _nodes?.length; j++) {
        let _n = _nodes[j];
        const node = this.node_instances[_n.node_name];
        const r = this.graph.createNode({
          shape: node.get_style().shape,
          data: {
            name: node.name,
            className: node.className,
            imgurl:node.imgurl,
            defaultClassName: node.className,
            isEdit:node.isEdit,
          },
        });
        rs.push(r);
        console.log(rs)
        // if(_n.isEidt){
        //   r.setAttrs({
        //     label:{
        //       contenteditable:true
        //     }
        //   })
        // }
      }
      this.stencil.load(rs, _group_name);
    }
  }

  // 初始化画布左边节点块
  init_stencil() {
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

    const stencil = new X6PluginStencil.Stencil({
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
  }

  // 初始化画布
  init_graph() {
    let _this = this;
    const graph = new X6.Graph({
      container: _this.graph_container,
      //网格背景
      grid: {
        visible: true,
        type: 'doubleMesh',
        args: [
          {
            color: '#eee', // 主网格线颜色
            thickness: 1, // 主网格线宽度
          },
          {
            color: '#ddd', // 次网格线颜色
            thickness: 1, // 次网格线宽度
            factor: 4, // 主次网格线间隔
          },
        ],
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
        createEdge() {
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
        validateConnection({ targetMagnet }) {
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
        global: true,
      },
      clipboard: true,
    });
    this.graph = graph;
  }

  // 连接桩
  init_ports() {
    const ports = {
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
  }

  render() {
    let stencil_dom = document.createElement('div');
    stencil_dom.className = 'stencil-container';
    this.container.appendChild(stencil_dom);
    this.stencil_container = stencil_dom;

    let graph_dom = document.createElement('div');
    graph_dom.className = 'graph-container';
    this.container.appendChild(graph_dom);
    this.graph_container = graph_dom;

    let minimap_dom = document.createElement('div');
    minimap_dom.className = 'minimap-container';
    this.container.appendChild(minimap_dom);
    this.minimap_container = minimap_dom;
  }

  init() {
    let _this = this;
    this.render();

    this.init_graph();
    this.init_stencil();
    this.init_ports();
    this.init_plugin();

    this.register_node();
    this.create_node();

    _this.bind_event();
  }

  get_data() {
    return this.graph.toJSON();
  }


  load_data(data) {
    this.graph.fromJSON(data);
  }



  get_checked_cells():any[]{
    const nodes = this.graph.getNodes()
    let cells = [] as any[]
    nodes.forEach((node) => {
      const keys = Object.keys(this.node_instances)
      for(let j = 0; j < keys.length; j++){
        let key = keys[j]
        //@ts-ignore
        if(this.node_instances[key].name == node.data.name){
          const checked = this.node_instances[key]?.get_checked(node)
          if(checked){
            cells.push(node)
          }
        }
      }
      
    })
    return cells
  }

  // set_node_name(value,cell){
  //   cell.setData({name:value,editable:false})
  // }
}
// }
