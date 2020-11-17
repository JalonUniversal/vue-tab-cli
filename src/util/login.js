import axios from 'axios';
import CONFIG from 'config/index.js';
const { HOST_MAP, PROTOCOL } = CONFIG;
/**
 * 登录管理器
 */
export default class LoginManager {
	static ENV_MAP = {
		'dev':  { name: '开发', disabled: false },
		'test': { name: '测试', disabled: false },
		'uat':  { name: 'UAT', disabled: true },
		'prod': { name: '生产', disabled: true },
	}
	static DEFAULT_ACCOUNT = {
		username: '',
		password: '',
		save: false,
	}
	// 登录
	static handleLogin = () => {
		localStorage.setItem('OP_isLogined', Number(true));
	}
	// 下次自动登录存储帐号信息
	static saveAccount(account) {
		console.log('saveAccount: ', account);
		const originAccount = JSON.parse(JSON.stringify(account));
		if(account) {
			if(account.save) {
				const accountInfo = JSON.stringify(originAccount);
				localStorage.setItem('OP_cacheAccount', btoa(accountInfo));
			} else {
				localStorage.removeItem('OP_cacheAccount');
			}
		}
	}
	// 读取存储的帐号信息
	static getCachedAccount() {
		try {
			let accountInfo = localStorage.getItem('OP_cacheAccount');
			accountInfo = accountInfo ? JSON.parse(atob(accountInfo)) : { ... this.DEFAULT_ACCOUNT };
			return accountInfo;
		} catch(err) {
			console.warn('[WARN]读取帐号信息失败');
			return { ... this.DEFAULT_ACCOUNT };
		}
	}
	// 检测是否登录
	static isLogined = () => {
		return Boolean(Number(localStorage.getItem('OP_isLogined') || 0));
	}
	// 注销
	static handleLogout = () => {
		localStorage.setItem('OP_isLogined', Number(false));
	}
	// 切换域名
	static changeHost(currentEnv) {
		axios.defaults.baseURL = `${PROTOCOL}://${HOST_MAP[currentEnv]}`;
		if(currentEnv === 'prod') return;
		return `使用 [${this.ENV_MAP[currentEnv].name}] 环境登录, 域名: ${axios.defaults.baseURL}`;
	}
}
