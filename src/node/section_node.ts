import { NodeOptions } from './nodeObject';
import { baseNode } from './baseNode';
export class section_node extends baseNode {
  constructor(options:NodeOptions) {
    super(options)
    this.type = 'custom-section';
    this.name = '工段';
    this.imgurl = options.imgurl == undefined?'../images/create_bom.png':options.imgurl;
    this.isCheck = options.isCheck == undefined?false: options.isCheck 
    this.className = 'section-node';
  }

  type: string;
  name: string;
  className: string;
  imgurl:string;
  isCheck:boolean;
  entity_name: string = 'section_node';

  get_style() {
    return {
      width: 120,
      height: 120,
      shape: 'custom-section',
    };
  }


}
