import { NodeObject } from './nodeObject';
import * as X6 from '@antv/x6';
export class section_node implements NodeObject {
  constructor() {
    this.type = 'custom-section';
    this.name = '工段';
    this.className = 'section-node';
  }

  type: string;
  name: string;
  className: string;
  entity_name: string = 'section_node';

  get_style() {
    return {
      width: 66,
      height: 36,
      shape: 'custom-section',
    };
  }

  get_html(cell: X6.Cell<X6.Cell.Properties>) {
    const { name, className } = cell.getData();
    const div = document.createElement('div');
    div.className = className;
    div.innerHTML = name; // 该名字可修改
    return div;
  }
}
