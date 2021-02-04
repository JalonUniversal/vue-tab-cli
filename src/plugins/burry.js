
import { loadScript } from 'util';
// import qs from 'querystring';

export const burryPlugin = {
  install(vue) {
		// 获取ip 的方法
		vue.prototype.$getIP = function () {
			loadScript('//pv.sohu.com/cityjson', () => {
				if(window.returnCitySN && window.returnCitySN.cip) {
					vue.prototype.ip = window.returnCitySN.cip;
					console.log('ip: ', window.returnCitySN.cip);
          // store.commit('UPDATE_IP', window.returnCitySN.cip);
				} else {
					console.warn('获取本机ip失败, 请登录重试');
				}
			});
		}
		/**
		 * 日志打点记录
		 * @param {*} module 打点的模块 (最好填上)
		 * @param {*} content 打点的内容 (最好填上)
		 */
    // vue.prototype.$log = function ({ module = '', content = '' }){
		// 	const { ip, $route: { path }} = this;
		// 	const time = Date.now();
		// 	const username = store.getters.getUsername || 'system';
		// 	const authtoken = store.getters.getToken || '';
		// 	const querystring = qs.stringify({ ip, time, path, module, content, username, authtoken });
		// 	// log instance
    //   const img = new Image();
    //   const id = Math.random().toString(36).slice(2);
    //   window[id] = img;
    //   img.onload = img.onerror = function() {
    //     window[id] = null;
		// 	}
		// 	img.src = `${location.origin}/common/mall/log/save` + (querystring ? '?' + querystring : '');
		// };

		// if(location.host.indexOf('localhost') !== -1) {
		// 	console.info('开发环境暂不开启操作日志打点')
		// 	vue.prototype.$log = function() {}
		// }
  }
}
