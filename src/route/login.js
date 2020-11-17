export default [
  {
    path: '/login',
    component: () => import(
			/* webpackChunkName: 'Product-login'*/
			'@/component/login/login.vue'
		),
    meta: { title: '登录' }
	}
];
