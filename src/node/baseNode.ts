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
    this.isEdit = options.isEdit == undefined?false:options.isEdit
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
  isEdit:boolean;
  edit_input:any;
  container:any

  get_style() {
    return {
      width: 100,
      height: 100,
      shape: 'custom-section',
    };
  }

  get_html(cell: X6.Cell<X6.Cell.Properties>) {
    const { name, className, imgurl, isCheck,checked,editable,isEdit,focusing } = cell.getData();
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
    if(isEdit && editable){
      const input = document.createElement('input')
      input.value = name
      input.className = 'base_node_editable_input'
      const _this = this
      input.onblur = function (e){
       cell.setData({name:input.value,editable:false,focusing:false})
      }
      this.edit_input = input
      div['edit_input'] = input
      nameContainer.appendChild(input)
    }else {
      nameContainer.innerHTML = name
    }
    div.appendChild(nameContainer)
    if(focusing && div['edit_input']){
      setTimeout(function(){
        div['edit_input'].focus()
      },0)
    }
    div['imgurl'] = imgurl; 
    div['isCheck'] = isCheck;
    this.container = div
    return div;
  }

  get_checked(cell:any){
    return cell.getData().checked
  }
}
