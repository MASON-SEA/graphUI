// 节点继承对象
export interface NodeObject {
    name:string;
    type:string;
    entity_name:string;  // 用于dbclick弹窗,设置对应的参数
    get_style():Object;
    get_html(cell:any):HTMLElement;
    get_checked(cell:any):boolean
}

export enum NodeType {
    section,
    process
}

export interface NodeOptions {
    name:string;
    group:string;
    imgurl?:string;
    isCheck?:boolean;
    isEdit?:boolean
}

export interface HTMLElementNodePlus extends HTMLDivElement{
    imgurl:string;
    isCheck:string
}
