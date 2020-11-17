import qs from 'querystring';

export const tabPlugin = {
	install(Vue) {
		Vue.mixin({
			methods: {
				// 页面(页签)跳转
				$go(path, query) {
					this.$router.push({ path, query });
				},
				// 关闭当前页面(页签)
				$closeSelf() {
					const { query, path } = this.$route;
					// 查询字符串拼接
					const querystring =
						query && Object.keys(query).length ? `?${qs.stringify(query)}` : '';
					// 以完整 path 作为 页签 name, 便于唯一性识别
					const name = path + querystring;
					if(!name) return;
					this.$dispatch('CLOSE_TAB', name);
				}
			},
		});
	}
}
