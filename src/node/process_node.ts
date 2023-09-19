import { NodeObject } from './nodeObject';

export class process_node implements NodeObject {
  constructor() {
    this.type = 'custom-process';
    this.name = '工序';
    this.className = 'process-node';
  }

  type: string;
  name: string;
  className: string;
  entity_name: string;

  get_style() {
    return {
      width: 66,
      height: 36,
      shape: 'custom-process',
    };
  }

  get_html(cell) {
    const { name, className } = cell.getData();
    const div = document.createElement('div');
    div.className = 'process-node';
    div.innerHTML = name; // 该名字可修改
    return div;
  }
}
