import { MENU } from './menu';

// 后端服务域名 在这儿添加对接的域名,
const BACKEND_DEVELOPER_HOST = {
	backDeveloper: '192.168.0.110:8090',
};

// 各环境域名
const HOST_MAP = {
	...BACKEND_DEVELOPER_HOST,
	dev: '',	  // 开发环境
	test: '',   // 测试环境
	uat: '',	  // uat环境
	prod: '',	  // 生产环境
};

// 接口超时设定
const TIMEOUT = 5000;
// 协议
const PROTOCOL = 'http';
// 当前环境  可写开发人员名字 或是环境名 dev|test|prod|netmaxk
const CURRENT_ENV = 'test'; // 此变量在本地开发环境 改后不要提交到 git上
// app name
const APP_NAME = 'vue-tab-cli';

export {
	MENU,
	HOST_MAP,
	TIMEOUT,
	PROTOCOL,
	CURRENT_ENV,
	APP_NAME,
}