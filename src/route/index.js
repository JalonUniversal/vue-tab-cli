import VueRouter from 'vue-router';

import LoginManage from '../util/login';
import App from '../app.vue';
import LoginRoute from './login';	// 登录模块

// 路由自动导入
const contexts = require.context('./modules', false, /\.js$/);
let autoImportRoute = [];
contexts.keys().forEach(path => {
	if (path.indexOf('index.js') > 0) return;
	autoImportRoute = autoImportRoute.concat(contexts(path).default);
});

// 基础路由
const routes = [
	...LoginRoute,
	{
		path: '/',
		component: App,
		meta: {
			title: '主页'
		},
		children: autoImportRoute
	}
];

const router = new VueRouter({ routes });
router.beforeEach((to, from, next) => {
	if (to.path !== '/login' && !LoginManage.isLogined()) {
		next('/login');
	} else {
		next();
	}
});

export { router }
