// 顾客管理模块路由定义
export default [
  {
		path: 'customer_overview',
		component: () => import(
			/* webpackChunkName: 'Customer-customerOverview'*/
			'@/component/customerManagement/customerOverview.vue'
		),
		meta: {
			title: '顾客概览'
		}
  },
];
