import Vue from 'vue';

// 数据仓库
const store = Vue.observable({
	token: '',
	userInfo: {
		id: '',
		name: '',
	},
	activeTab: '',
	tabList: [],
	// 产品价格配置参数
	priceParams: {
		productParam: 1,
		orderParam: 1,
		groupParam: 1,
	}
});

// 更新 state
const mutations = {
	// 更新 自定义字段 (谨慎使用)
	updateCustomerField(key, val) {
		store[key] = val;
	},
	// 更新 token
	updateToken(token) {
		store.token = token;
	},
	// 更新用户信息
	updateUserInfo(userInfo) {
		store.userInfo = {
			...userInfo,
			...store.userInfo,
		};
	},
}

// 全局挂载属性值
const storePlugin = {
	install(vue) {
		vue.prototype.$store = store;
	}
}

export {
	store,
	mutations,
	storePlugin,
}
