import Vue from 'vue';
import { mutations } from '@/store';
const { $fetch, $message } = Vue.prototype;
// 获取菜单类型
// 产品配置 -- 菜单类型名字
// [show: 前端展示 catalog: 产品类型 company: 销售主体 brand: 产品品牌 tag: 产品标签]
export const loadConfigByType = async type => {
	if (!type) return;

	const res = await $fetch(`/mgmt/product/cfg/menu/${type}`);
	if (res && res.data) {
		return res.data;
	} else {
		return [];
	}
}
// // 获取子级菜单
// // 启用配置检测
const configValidateCheck = ({ cfgStatus }) => cfgStatus === 1;
// // 配置格式转换
const optionGenerator = ({ title: label, id: value }) => ({ label, value });

// 集中获取配置
export const loadProductsConfig = async () => {
	try {
		const CONFIG_TYPE = ['show', 'catalog', 'brand', 'company', 'tag'];
		const configs = await Promise.all(CONFIG_TYPE.map(loadConfigByType));
		const CONFIG_OPTIONS = configs.map(({ childList }) => childList.filter(configValidateCheck).map(optionGenerator));
		CONFIG_TYPE.forEach((type, index) => {
			const storeKey = `${type}Options`;
			mutations.updateCustomerField(storeKey, CONFIG_OPTIONS[index]);
		});
	} catch {
		$message('获取菜单配置信息失败');
	}
}

// 获取服务公司列表
export const loadServiceCompany = async () => {
	const res = await $fetch('/mgmt/sys/getBranComByType');
	if (res && res.data) {
		mutations.updateCustomerField('serviceCompanyOptions', res.data.map(({ name: label, code: value }) => ({ label, value })) || []);
	} else {
		return [];
	}
}
