import Vue from 'vue';
import './plugins/element.js';
import './theme/index.css';
import './global.css';
import './reset.css';

import VueRouter from 'vue-router';
import { router } from './route';
import { plugins } from './plugins';
import { layouts } from './layout';
import registerPage from './component';
import { directives } from './directives';
import components from './component/common';
import { storePlugin } from './store';
import entry from './entry';
import clipboard from 'vue-clipboard2';

Vue.config.productionTip = false;

// 注册页面组件
registerPage(Vue);

plugins.unshift(VueRouter);
plugins.push(storePlugin, clipboard);
// 注册插件
plugins.forEach(plugin => Vue.use(plugin));
// 注册布局组件
layouts.forEach(layout => Vue.component(layout.name, layout));

// 注册指令
directives.forEach(directive => Vue.directive(directive.name, directive.define));
// 注册公共组件
components.forEach(component => Vue.component(component.name, component));

new Vue({
  router,
  render: h => h(entry)
}).$mount('#app');
