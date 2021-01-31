import * as CONFIG from '../config/index';

export const configPlugin = {
  install(vue) {
		vue.prototype.$config = CONFIG;
  }
}
