//  组件展示
export default [
  {
		path: 'display_searchPanel',
		component: () => import(
			/* webpackChunkName: 'Component-displaySearchPanel'*/
			'@/component/component/displaySearchPanel.vue'
		),
		meta: {
			title: '搜索面板'
		}
  },
];
