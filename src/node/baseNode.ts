import { NodeObject,NodeOptions,HTMLElementNodePlus } from './nodeObject';
import * as X6 from '@antv/x6';
export class baseNode implements NodeObject {
  constructor(options:NodeOptions) {
    this.type = 'custom-section';
    this.name = '工段';
    this.imgurl = options.imgurl == undefined?'../images/create_bom.png':options.imgurl;
    this.isCheck = options.isCheck == undefined?false: options.isCheck 
    this.className = 'section-node';
    this.checked = false
  }

  type: string;
  name: string;
  className: string;
  imgurl:string;
  isCheck:boolean;
  entity_name: string = 'section_node';
  checkbox:any;
  cell:any;
  checked:boolean;

  get_style() {
    return {
      width: 150,
      height: 150,
      shape: 'custom-section',
    };
  }

  get_html(cell: X6.Cell<X6.Cell.Properties>) {
    const { name, className, imgurl, isCheck,checked,editable,isEidt } = cell.getData();
    console.log(cell, cell.getData());
    const div = document.createElement('div') as HTMLElementNodePlus;
    div.className = className;
    const nameContainer = document.createElement('div')
    if(this.isCheck){
      let checkbox = document.createElement('input')
      checkbox.type = 'checkbox'
      this.checkbox = checkbox
      this.checkbox.checked = checked
      div.appendChild(checkbox)
      
      checkbox.onchange = function(){
        cell.setData({checked:!checked})
      }

    }
    if(imgurl){
      const img = document.createElement('img')
      img.src =  `/src/images/section_default_icon.png`
      div.appendChild(img)
    }
    if(isEidt && editable){
      const input = document.createElement('input')
      input.value = name
      nameContainer.appendChild(input)
    }else {
      nameContainer.innerHTML = name
    }
    div.appendChild(nameContainer)
    div['imgurl'] = imgurl; 
    div['isCheck'] = isCheck;
    return div;
  }

  get_checked(cell:any){
    return cell.getData().checked
  }
}
