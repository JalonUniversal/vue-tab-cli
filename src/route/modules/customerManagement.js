// 顾客管理模块路由定义
export default [
  {
		path: 'customer_overview',
		component: () => import(
			/* webpackChunkName: 'Customer-customerOverview'*/
			'@/component/customerManagement/customerOverview.vue'
		),
		meta: {
			title: '图表统计'
		}
  },
  {
		path: 'storage',
		component: () => import(
			/* webpackChunkName: 'Customer-storage'*/
			'@/component/storage/storage.vue'
		),
		meta: {
			title: '缓存读写'
		}
	},
	{
		path: 'locate',
		component: () => import(
			/* webpackChunkName: 'Customer-locate'*/
			'@/component/locate/locate.vue'
		),
		meta: {
			title: '地理定位'
		}
  },
];
