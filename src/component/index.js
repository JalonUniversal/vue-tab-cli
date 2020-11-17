// 全局注册异步组件 [新版异步引入方法]
export default Vue => {
	// 自动发现和引入
	const context = require.context('.', true, /\.vue$/, 'lazy');
	// 遍历获取组件对象，注册组件
	context.keys().forEach(path => {
		if(path) {
			const name = path.split('/').pop().replace(".vue", '');
			Vue.component(name, () => context(path));
		}
	});
}

