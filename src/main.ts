import { graphUI } from './graphUI';

// init graph
let graph = new graphUI({
  container: document.getElementById('container')!,
  node_info: [
    { node_name: 'processNode', group_name: 'group1' },
    { node_name: 'sectionNode', group_name: 'group2' },
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
