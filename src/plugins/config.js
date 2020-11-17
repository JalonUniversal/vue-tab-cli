import config from '../config/index';

export const configPlugin = {
  install(vue) {
		// 360(兼容模式) 不支持 Proxy, 先屏蔽掉运行时配置器
    // const warn = console.warn;
    // vue.prototype.$config = new Proxy(config, {
    //   get(target, key) {
    //     if(!(key in config)) {
    //       warn(`[WARNING] ${key} is not exists in config`);
    //       return '';
    //     }
    //     return target[key];
    //   },
    //   set(target, key, val) {
    //     if(val === (void 0) || val === null ) {
    //       warn(`[WARNING] ${val} is invalid value`);
    //       val = '';
    //     }
    //     target[key] = val;
    //     return true;
    //   }
		// });
		vue.prototype.$config = config;
  }
}
