// 节点继承对象
export interface NodeObject {
    name:string;
    type:string;
    entity_name:string;  // 用于dbclick弹窗,设置对应的参数
    get_style():Object;
    get_html(cell:any):HTMLElement;
}

export enum NodeType {
    section,
    process
}
