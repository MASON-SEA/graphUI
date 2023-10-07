import { baseNode } from './baseNode';
import {NodeOptions } from './nodeObject';
export class process_node extends baseNode {
  constructor(options:NodeOptions) {
    super(options)
    this.type = 'custom-process';
    this.name = '工序';
    this.imgurl = options.imgurl == undefined?'../images/create_bom.png':options.imgurl;
    this.isCheck = options.isCheck == undefined?false: options.isCheck 
    this.className = 'process-node';
  }

  type: string;
  name: string;
  className: string;
  imgurl:string;
  isCheck:boolean;
  entity_name: string = 'process_node';

  get_style() {
    return {
      width: 120,
      height: 120,
      shape: 'custom-process',
    };
  }
}
