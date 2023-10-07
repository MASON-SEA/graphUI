/*
 * @Author: MASON-SEA yangyangmason@outlook.co
 * @Date: 2023-09-19 14:23:04
 * @LastEditors: MASON-SEA yangyangmason@outlook.co
 * @LastEditTime: 2023-09-26 16:00:32
 * @FilePath: \graphUI\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { graphUI } from './graphUI';

// init graph
const container = document.getElementById('container') as any;
let data = {"cells":
[{"shape":"edge","attrs":{"line":{"stroke":"#A2B1C3","targetMarker":{"name":"block","width":12,"height":8}}},"id":"7f05ef17-963d-456a-bd5b-77572ccf9c67","zIndex":0,"source":{"cell":"e61bde10-4f25-45f9-985e-880522b7c7e8","port":"3f1c9274-b8b0-470f-8a2b-dc31cc0912a1"},"target":{"cell":"6dbcef15-c49f-4bbc-a7c7-7291af9d8549","port":"439d811c-445f-4fa3-b28a-b790a24aa9c6"},"labels":[{"attrs":{"text":{"text":"8x"}}}]},{"shape":"edge","attrs":{"line":{"stroke":"#A2B1C3","targetMarker":{"name":"block","width":12,"height":8}}},"id":"e081a866-a64a-461b-9d12-527517cc0946","zIndex":0,"source":{"cell":"6dbcef15-c49f-4bbc-a7c7-7291af9d8549","port":"3f1c9274-b8b0-470f-8a2b-dc31cc0912a1"},"target":{"cell":"e95364fd-f4ce-4270-9b65-2538989408d0","port":"439d811c-445f-4fa3-b28a-b790a24aa9c6"},"labels":[{"attrs":{"text":{"text":"6x"}}}]},{"shape":"edge","attrs":{"line":{"stroke":"#A2B1C3","targetMarker":{"name":"block","width":12,"height":8}}},"id":"e0cc68d7-ff7b-4fcb-92a2-088bf671640a","zIndex":0,"source":{"cell":"e95364fd-f4ce-4270-9b65-2538989408d0","port":"7fbb44bd-a801-4f96-a6bf-e716e197c30a"},"target":{"cell":"e61bde10-4f25-45f9-985e-880522b7c7e8","port":"7fbb44bd-a801-4f96-a6bf-e716e197c30a"},"vertices":[{"x":820,"y":420},{"x":473,"y":420}],"labels":[{"attrs":{"text":{"text":"3x"}}}]},{"shape":"edge","attrs":{"line":{"stroke":"#A2B1C3","targetMarker":{"name":"block","width":12,"height":8}}},"id":"a72687bb-0c52-4c1a-b6f1-71bbd11abe42","zIndex":0,"source":{"cell":"1701d80f-70b3-4663-beaa-d552367055ce","port":"8cd1523a-f1c8-41fb-a343-91e6972cf7e7"},"target":{"cell":"e61bde10-4f25-45f9-985e-880522b7c7e8","port":"439d811c-445f-4fa3-b28a-b790a24aa9c6"},"labels":[{"attrs":{"text":{"text":"6x"}}}]},{"shape":"edge","attrs":{"line":{"stroke":"#A2B1C3","targetMarker":{"name":"block","width":12,"height":8}}},"id":"8fb5fdb1-07cc-4afa-9a41-c95ff5890e4f","zIndex":0,"source":{"cell":"6dbcef15-c49f-4bbc-a7c7-7291af9d8549","port":"a51c8da2-fc20-4b82-8d60-42e26a0d0264"},"target":{"cell":"e61bde10-4f25-45f9-985e-880522b7c7e8","port":"a51c8da2-fc20-4b82-8d60-42e26a0d0264"},"vertices":[{"x":833,"y":110},{"x":473,"y":110}],"labels":[{"attrs":{"text":{"text":"3x"}}}]},{"position":{"x":440,"y":240},"size":{"width":120,"height":120},"view":"html-view","shape":"custom-section","ports":{"groups":{"top":{"position":"top","attrs":{"circle":{"r":4,"magnet":true,"stroke":"#5F95FF","strokeWidth":1,"fill":"#fff","style":{"visibility":"hidden"}}}},"right":{"position":"right","attrs":{"circle":{"r":4,"magnet":true,"stroke":"#5F95FF","strokeWidth":1,"fill":"#fff","style":{"visibility":"hidden"}}}},"bottom":{"position":"bottom","attrs":{"circle":{"r":4,"magnet":true,"stroke":"#5F95FF","strokeWidth":1,"fill":"#fff","style":{"visibility":"hidden"}}}},"left":{"position":"left","attrs":{"circle":{"r":4,"magnet":true,"stroke":"#5F95FF","strokeWidth":1,"fill":"#fff","style":{"visibility":"hidden"}}}}},"items":[{"group":"top","id":"a51c8da2-fc20-4b82-8d60-42e26a0d0264"},{"group":"right","id":"3f1c9274-b8b0-470f-8a2b-dc31cc0912a1"},{"group":"bottom","id":"7fbb44bd-a801-4f96-a6bf-e716e197c30a"},{"group":"left","id":"439d811c-445f-4fa3-b28a-b790a24aa9c6"}]},"id":"e61bde10-4f25-45f9-985e-880522b7c7e8","data":{"name":"工段","className":"section-node","defaultClassName":"section-node"},"zIndex":1},{"position":{"x":800,"y":240},"size":{"width":120,"height":120},"view":"html-view","shape":"custom-section","ports":{"groups":{"top":{"position":"top","attrs":{"circle":{"r":4,"magnet":true,"stroke":"#5F95FF","strokeWidth":1,"fill":"#fff","style":{"visibility":"hidden"}}}},"right":{"position":"right","attrs":{"circle":{"r":4,"magnet":true,"stroke":"#5F95FF","strokeWidth":1,"fill":"#fff","style":{"visibility":"hidden"}}}},"bottom":{"position":"bottom","attrs":{"circle":{"r":4,"magnet":true,"stroke":"#5F95FF","strokeWidth":1,"fill":"#fff","style":{"visibility":"hidden"}}}},"left":{"position":"left","attrs":{"circle":{"r":4,"magnet":true,"stroke":"#5F95FF","strokeWidth":1,"fill":"#fff","style":{"visibility":"hidden"}}}}},"items":[{"group":"top","id":"a51c8da2-fc20-4b82-8d60-42e26a0d0264"},{"group":"right","id":"3f1c9274-b8b0-470f-8a2b-dc31cc0912a1"},{"group":"bottom","id":"7fbb44bd-a801-4f96-a6bf-e716e197c30a"},{"group":"left","id":"439d811c-445f-4fa3-b28a-b790a24aa9c6"}]},"id":"6dbcef15-c49f-4bbc-a7c7-7291af9d8549","data":{"name":"工段","className":"section-node","defaultClassName":"section-node"},"zIndex":2},{"position":{"x":1080,"y":240},"size":{"width":120,"height":120},"view":"html-view","shape":"custom-section","ports":{"groups":{"top":{"position":"top","attrs":{"circle":{"r":4,"magnet":true,"stroke":"#5F95FF","strokeWidth":1,"fill":"#fff","style":{"visibility":"hidden"}}}},"right":{"position":"right","attrs":{"circle":{"r":4,"magnet":true,"stroke":"#5F95FF","strokeWidth":1,"fill":"#fff","style":{"visibility":"hidden"}}}},"bottom":{"position":"bottom","attrs":{"circle":{"r":4,"magnet":true,"stroke":"#5F95FF","strokeWidth":1,"fill":"#fff","style":{"visibility":"hidden"}}}},"left":{"position":"left","attrs":{"circle":{"r":4,"magnet":true,"stroke":"#5F95FF","strokeWidth":1,"fill":"#fff","style":{"visibility":"hidden"}}}}},"items":[{"group":"top","id":"a51c8da2-fc20-4b82-8d60-42e26a0d0264"},{"group":"right","id":"3f1c9274-b8b0-470f-8a2b-dc31cc0912a1"},{"group":"bottom","id":"7fbb44bd-a801-4f96-a6bf-e716e197c30a"},{"group":"left","id":"439d811c-445f-4fa3-b28a-b790a24aa9c6"}]},"id":"e95364fd-f4ce-4270-9b65-2538989408d0","data":{"name":"工段","className":"section-node","defaultClassName":"section-node"},"zIndex":3},{"position":{"x":-70,"y":240},"size":{"width":120,"height":120},"view":"html-view","shape":"custom-section","ports":{"groups":{"top":{"position":"top","attrs":{"circle":{"r":4,"magnet":true,"stroke":"#5F95FF","strokeWidth":1,"fill":"#fff","style":{"visibility":"hidden"}}}},"right":{"position":"right","attrs":{"circle":{"r":4,"magnet":true,"stroke":"#5F95FF","strokeWidth":1,"fill":"#fff","style":{"visibility":"hidden"}}}},"bottom":{"position":"bottom","attrs":{"circle":{"r":4,"magnet":true,"stroke":"#5F95FF","strokeWidth":1,"fill":"#fff","style":{"visibility":"hidden"}}}},"left":{"position":"left","attrs":{"circle":{"r":4,"magnet":true,"stroke":"#5F95FF","strokeWidth":1,"fill":"#fff","style":{"visibility":"hidden"}}}}},"items":[{"group":"top","id":"4ebf7d76-2d7f-44b0-9bc5-5f61e5ffff4e"},{"group":"right","id":"8cd1523a-f1c8-41fb-a343-91e6972cf7e7"},{"group":"bottom","id":"a93e3ad8-e211-4b04-b1e9-f795cb6032b7"},{"group":"left","id":"02781902-0f56-4877-923d-aa2924fbcf4f"}]},"id":"1701d80f-70b3-4663-beaa-d552367055ce","data":{"name":"工段","className":"section-node","defaultClassName":"section-node"},"zIndex":4}]}

let graph = new graphUI({
  container,
  node_info: [
    { node_name: 'processNode', group_name: 'group1',imgurl:'./images/create_bom.png','isEdit':true },
    { node_name: 'sectionNode', group_name: 'group2',isCheck:true },
  ],
  stencil_title: '测试标头',
  stencil_groups: [
    {
      title: '分组一',
      name: 'group1',
    },
    {
      title: '分组二',
      name: 'group2',
    },
  ],
});

container.graph = graph;
graph.load_data(data);