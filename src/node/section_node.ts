import { NodeObject } from './nodeObject';

// namespace orui {
export class section_node implements NodeObject {
  constructor() {
    this.type = 'custom-section';
    this.name = '工段';
    this.className = 'section-node';
  }

  type: string;
  name: string;
  className: string;
  entity_name: string;

  get_style() {
    return {
      width: 66,
      height: 36,
      shape: 'custom-section',
    };
  }

  get_html(cell) {
    const { name, className } = cell.getData();
    const div = document.createElement('div');
    div.className = className;
    div.innerHTML = name; // 该名字可修改
    return div;
  }
}
// }
