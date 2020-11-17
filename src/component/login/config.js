export const LOGIN_RULES = {
	username: [
		{ required: true,	message: '请输入账号', 	trigger: 'blur' },
	],
	password: [
		{ required: true, message: '请输入密码', trigger: 'blur' },
		{ min: 6, message: '密码不能少于6位', trigger: 'blur' },
	],
}

// 登录时可用环境选项列表
export const ENV_OPTIONS = [
	{ label: '开发环境', value: 'dev', disabled: false },
	{ label: '测试环境', value: 'test', disabled: false },
	{ label: 'UAT环境', value: 'uat', disabled: true },
	{ label: '生产环境', value: 'prod', disabled: true },
];
