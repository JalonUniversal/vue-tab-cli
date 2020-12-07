import axios from 'axios';
import { store, mutations } from '@/store';
import { router } from '@/route';
import { Notification } from 'element-ui';

export const httpPlugin = {
	install(vue) {
		const { HOST_MAP, PROTOCOL, CURRENT_ENV, TIMEOUT } = vue.prototype.$config;
		// baseURL config
		axios.defaults.baseURL = `${PROTOCOL}://${HOST_MAP[CURRENT_ENV]}`;
		// timeout config
		axios.defaults.timeout = TIMEOUT;

		// request interceptor
		axios.interceptors.request.use(config => {
			if (config.url === 'login/oauth/token') return config;
			// 从 store 中取 access_token;
			if (!store.access_token) {
				let token = localStorage.getItem('OP_accessKey');
				if (token) {
					token = atob(token);
					// 刷新内存中 token
					mutations.updateCustomerField('access_token', token);
				}
			}
			const token = `bearer ${store.access_token}`;
			config.headers = {
				...config.headers,
				Authorization: token,
				channel: 'pc',
				client: 'op'
			}

			if (/GET/i.test(config.method)) {
				config.url += (
					(config.url.indexOf('?') === -1 ? '?' : '&') + `rnd=${Date.now()}`
				);
			}

			return config;
		});

		async function fetch(config) {
			try {
				window.NProgress.start();

				const res = await axios.request(config);
				// error response handler
				if (!res || !res.data) throw new Error(res);
				// stardand response handler
				const { data: { code, message } } = res;
				if (code === 200) return res.data;
				if (code === 401) {
					Notification.warning({
						title: 'Token 无效',
						message: '当前系统 Token 不存在 或 失效, 请重新登录, 3秒后会自动跳转到登录界面',
						duration: 3000,
						onClose: () => {
							mutations.updateCustomerField('access_token', null);
							mutations.updateCustomerField('refresh_token', null);
							router.app.$go('/login');
						}
					});
					return false;
				}
				if (code === 500 || code === 404) {
					Notification.error(message || '请求失败');
					return res;
				}

				return res;
			} catch (error) {
				if (error.response.status === 401) {
					Notification.warning({
						title: 'Token 无效',
						message: error.response.data.message || '当前系统 Token 不存在 或 失效, 请重新登录, 3秒后会自动跳转到登录界面',
						duration: 3000,
						onClose: () => {
							mutations.updateCustomerField('access_token', null);
							mutations.updateCustomerField('refresh_token', null);
							router.app.$go('/login');
						}
					});
				} else if (/^50\d$/.test(error.response.status)) {
					Notification.warning({
						title: '服务器出现问题',
						message: error.response.data.message || '请求失败,服务器可能暂时不可用',
						duration: 2000,
					});
				}
				config.failed && config.failed(error);
			}
			finally {
				config.callback && config.callback();
				window.NProgress.done();
			}
		}

		vue.prototype.$fetch = fetch;
	}
}
