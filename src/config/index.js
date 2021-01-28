import { MENU } from './menu';

// 后端开发域名 在这儿添加对接的域名, 例如 钟军生（junsheng）: 192.168.0.45:8905
const BACKEND_DEVELOPER_HOST = {
	wenqiang: '192.168.0.110:8901',
	huangzexin: '192.168.0.106:8908',
	// lingfeng:'192.168.0.104:8909',//分公司接口ip和端口
	guodong: '192.168.0.236:8901',
	jiagou: '192.168.0.107',
	yuwenbo: '192.168.0.94:8901',
	zhangheng: '192.168.0.106:8909',
	tanjianlang: '192.168.0.99:8915',
	tanjianlang2: '42.194.215.85:8915',
	junsheng: '192.168.0.45:8905',
	huxun: '192.168.0.118:8905',
	lishan: '192.168.0.104:8902',
	txt: '106.52.140.234:8904',
	hsk: '17c36i9201.51mypc.cn',
	// jianlang:'http://42.194.215.85:8905'
	wangshuanghu: '106.55.56.79:8915',
};

// 上传服务使用的 各中心(后端) client key
const CLIENT_KEY = {
	'crm': "mall-center-member", 		      // 会员中心
	'goods': "mall-center-product",       // 商品中心
	'order': "mall-center-order",         // 订单中心
	'service': "mall-center-store",       // 服务中心
	'stock': "mall-center-inventory",     // 库存中心
	'pay': "mall-center-pay",  		        // 支付中心
	'finance': "mall-center-finance",     // 财务中心
	'cms': "mall-center-cms",  	 			    // 内容中心
	'sys': "mall-center-sys",             // 基础资料中心
	'promotion': "mall-center-promotion",  // 营销中心
	'msgnotice': "mall-center-msg"  // 消息公告中心
}

// 上传路径
const UPLOAD_URL = {
	dev: "http://192.168.0.104:8090/storage/upload",
	test: "http://42.194.210.148:8090/storage/upload",
	prod: ""
}

// 上传使用的环境 dwv|test|prod
const UPLOAD_ENV = 'test';

// 各环境域名
const HOST_MAP = {
	...BACKEND_DEVELOPER_HOST,
	dev: '42.194.223.11',				   // 开发环境
	test: '47.115.118.63:10058',   // 测试环境
	uat: 'uc2-uat.perfect99.com',	 // uat环境
	prod: '',										   // 生产环境
};

// 接口超时设定
const TIMEOUT = 5000;
// 协议
const PROTOCOL = 'http';
// 当前环境  可写开发人员名字 或是环境名 dev|test|prod|netmaxk
const CURRENT_ENV = 'test'; // 此变量在本地开发环境 改后不要提交到 git上
const IMAGE_PREFIX = 'http://106.53.110.68:8080/';

// 登录默认使用的 Token
const DEFAULT_LOGIN_TOKEN = 'Basic b3BfYXBwOnBlcmZlY3RfcG9ydGFs';
// app name
const APP_NAME = 'vue-tab-cli';

export default {
	MENU,
	HOST_MAP,
	TIMEOUT,
	PROTOCOL,
	CURRENT_ENV,
	IMAGE_PREFIX,
	CLIENT_KEY,
	UPLOAD_URL,
	UPLOAD_ENV,
	DEFAULT_LOGIN_TOKEN,
	APP_NAME,
}
