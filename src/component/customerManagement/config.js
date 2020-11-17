import { optionGenerator, genCurrentMonthFirstAndLastDay } from 'util';
import { filters } from 'plugins/filters';

// 性别
export const SEX_TYPE = {
	'1': '男',
	'2': '女'
}

// 顾客类型
export const CUSTOMER_PURCHASE_TYPE = {
	all: {},
	newCustomer: { "nowAdd": 1 },
	notPurchase: { "haveOrder": 1 },
};

// 优惠顾客类型
export const DISCOUNT_COUSTOMER_TYPE = {
	"all": 1,
	"newCustomer": 2,
	"notPurchase": 3
}

// 帐户状态 @todo 增加冻结状态
export const ACCOUT_STATUS = {
	'-1': '已注销',
	'0': '启用',
	'1': '禁用',
	'2': '冻结'
};

// 帐户管理 -- 修改注册手机号校验规则
export const CHANGE_REG_PHONE_RULES = {
	new: [
		{ required: true, message: '请输入新手机号', trigger: 'blur' },
		{ pattern: /^\d{11}$/, message: '手机号码格式有误!', trigger: 'change' },
	],
}
// 帐户管理 -- 添加绑定手机号校验规则
export const ADD_BIND_PHONE_RULES = {
	phone: [
		{ required: true, message: '请输入新手机号', trigger: 'blur' },
		{ pattern: /^\d{11}$/, message: '手机号码格式有误!', trigger: 'change' },
	],
}

// 服务中心列表
export const SERVICE_LIST = [
	{ label: '服务中心名称', prop: 'name', align: 'center' },
	{ label: '编号', prop: 'code', align: 'center' },
	{ label: '地址', prop: '', align: 'center' },
	{
		label: '星级',
		prop: 'level',
		align: 'center',
		formatter: ({level}) => {
			let value = '';
			LEVEL_TYPE.map((v) => {
				v.value == level && (value = v.label);
			})
			return value;
		}
	},
];


// 开通方式
export const CHANNEL = {
	'1': 'H5',
	'2': 'APP',
	'3': '小程序',
	'4': 'PC',
	'5': '填表',
};

// 证件类型
export const CERTIFICATES_TYPE = {
	'1': '身份证',
	'2': '其他'
};

// 是否购货
export const BUY_STATUS = {
	'0': '否',
	'1': '是'
};

// 顾客类型
export const CUSTOMER_TYPE = {
	'1': '普通顾客',
	'2': '优惠顾客',
	'3': '云商',
	'4': '微店',
	'5': '',
	'6': '子帐号'
}

// 允许转换的类型
export const ALLOW_TRANSFORM_LIST = [ '1.2', '2.1', '2.3', '3.2', '3.4', '4.3' ];

// 普通顾客 选项卡数组
export const NORMAL_CUSTOMER_TABS_LIST = [
	['全部', 'all'],
	['当月新增普通顾客', 'newCustomer'],
	['当月未购货普通顾客', 'notPurchase'],
];
// 普通顾客-tab全部-字段说明
export const NORMAL_CUSTOMER_TEXT = [
	{
		"title": '当月新增顾客:',
		"content": '当月已经购货的普通顾客'
	},
	{
		"title": '未购货顾客:',
		"content": '截止目前未购货的普通顾客'
	},
	{
		"title": '普通顾客:',
		"content": '仅注册,但未开卡的顾客'
	},
]

// 普通顾客分配转化情况
export const TRANSFORM_STATUS = {
	'0': '未分配',
	'1': '已分配',
	'2': '已转换',
}

// 分配类型
export const ALLOCATION_TYPE = {
	'null': "全部",
	'1': "系统分配",
	'2': "手工分配"
}

// 婚姻状况
export const MARITAL_TYPE = {
	'1': "未婚",
	'2': "已婚",
	'3': "离异"
}
//1普通服务中心 2五星服务中心 3五星旗舰服务中心
export const  LEVEL_TYPE = [
	{ label: '全部', value: '0' },
	{ label: '普通服务中心', value: '1' },
	{ label: '五星服务中心', value: '2' },
	{ label: '五星旗舰服务中心', value: '3' },
]

export const CHECK_MOBLIE_RULE = (rule, value, callback) => {
	let isReg=/^[1][2,3,4,5,6,7,8,9][0-9]{9}$/;
	if (value && !isReg.test(value)) {
		return callback(new Error('请输入11位数有效手机号'));
	}
	return callback()
};
// 普通顾客搜索
export const NORMAL_CUSTOMER_SEARCH = {
	form: [
		{
			label: '顾客编号',
			key: 'memberNo',
			type: 'input',
			value: '',
			placeholder: '请填写顾客编号',
			maxlength: 20
		},
		{
			label: '会员卡号',
			key: 'cardNo',
			type: 'input',
			value: '',
			placeholder: '请填写优惠卡号',
		},
		{
			label: '顾客姓名',
			key: 'realname',
			type: 'input',
			value: '',
			placeholder: '请填写顾客姓名',
		},
		{
			label: '开通渠道',
			key: 'channel',
			type: 'select',
			value: '',
			options: optionGenerator(CHANNEL),
			placeholder: '请选择开通渠道',
		},
		{
			label: '注册手机号',
			key: 'mobile',
			type: 'input',
			value: '',
			placeholder: '请填写注册手机号',
			maxlength: 11
		},
		{
			label: '状态',
			key: 'memberStatus',
			type: 'select',
			value: '',
			options: optionGenerator(ACCOUT_STATUS),
			placeholder: '请选择状态',
		},
		{
			label: '分配转化情况',
			key: 'changeType',
			type: 'select',
			value: '',
			options: optionGenerator(TRANSFORM_STATUS),
			placeholder: '请选择转化情况',
		},
		{
			label: '分享人卡号',
			key: 'sharerCardNo',
			type: 'input',
			value: '',
			placeholder: '请填写分享人卡号',
		},
		{
			label: '注册时间',
			key: 'registrationTime',
			type: 'datePicker',
			value: genCurrentMonthFirstAndLastDay(),
			config: {
				type: 'daterange',
			},
		},
	],
	rules: {
		memberNo: [
			{ max: 20, message: '请输入 1 ~ 20 位字符', trigger: 'change' }
		],
		realname: [
			{ max: 20, message: '请输入 1 ~ 20 位字符', trigger: 'change' }
		],
		cardNo: [
			{ max: 20, message: '请输入 1 ~ 20 位字符', trigger: 'change' }
		],
		sharerCardNo: [
			{ max: 20, message: '请输入 1 ~ 20 位字符', trigger: 'change' }
		],
		mobile: [
			{ required: false, validator: CHECK_MOBLIE_RULE, trigger: 'blur' },
			{ max: 11, message: '请输入11位数有效手机号', trigger: 'change' }
		],
	},
}

// 普通顾客列定义
export const NORMAL_CUSTOMER_COLUMNS = [
	{ label: '顾客编号', prop: 'memberNo', align: 'center' },
	{ label: '会员卡号', prop: 'cardNo', align: 'center', width: 200 },
	{ label: '顾客姓名', prop: 'realname', align: 'center' },
	{
		label: '注册手机号',
		align: 'center',
		prop: 'mobile',
		width: 150
	},
	{
		label: '注册时间',
		align: 'center',
		width: 200,
		prop: 'createTime',
		formatter: ({ createTime }) => filters.timestampFormat(createTime)
	},
	{ label: '开通渠道', prop: 'channelDes', align: 'center' },
	{ label: '常驻地区', prop: 'usualLocation', align: 'center' },
	{ label: '分配转化情况', prop: 'changeTypeDes', align: 'center', width: 120 },
	{ label: '分享人卡号', prop: 'sharerCardNo', align: 'center' },
	{ label: '微信', prop: 'wechatNickname', align: 'center' },
	{ label: 'QQ', prop: 'qqNickname', align: 'center' },
	{ label: '状态', prop: 'memberStatusDes', align: 'center' },
];

// 优惠顾客 选项卡数组
export const DISCOUNT_CUSTOMER_TABS_LIST = [
	['全部', 'all'],
	['当月新增优惠顾客', 'newCustomer'],
	['当月未购货优惠顾客', 'notPurchase'],
];

// 优惠顾客-tab全部-字段说明
export const DISCOUNT_CUSTOMER_TEXT = [
	{
		'title': '当月新增顾客:',
		'content': '当月已经购货的优惠顾客'
	},
	{
		'title': '未购货顾客:',
		'content': '当月未购货的优惠顾客'
	},
	{
		'title': '优惠顾客:',
		'content': '已经开卡的顾客,包含已购货、未购货、已失效的顾客'
	},
	{
		'title': '已失效顾客:',
		'content': '已经失效的优惠顾客,PV和顾客群体归零'
	},
]

// 优惠顾客搜索
export const DISCOUNT_CUSTOMER_SEARCH = {
	form: [
		{
			label: '顾客编号',
			key: 'memberId',
			type: 'input',
			value: '',
			placeholder: '请填写顾客编号',
		},
		{
			label: '会员卡号',
			key: 'cardNo',
			type: 'input',
			value: '',
			placeholder: '请输入会员卡号',
		},
		{
			label: '注册手机号',
			key: 'mobile',
			type: 'input',
			value: '',
			placeholder: '请填写注册手机号',
			maxlength: 11
		},
		{
			label: '顾客姓名',
			key: 'realname',
			type: 'input',
			value: '',
			placeholder: '请填写顾客姓名',
		},
		{
			label: '证件号码',
			key: 'certificatesNo',
			type: 'input',
			value: '',
			placeholder: '请填写证件号码',
		},
		{
			label: '状态',
			key: 'status',
			type: 'select',
			value: '',
			options: optionGenerator(ACCOUT_STATUS),
			placeholder: '请选择状态',
		},
		{
			label: '开通渠道',
			key: 'channel',
			type: 'select',
			value: '',
			options: optionGenerator(CHANNEL),
			placeholder: '请选择开通渠道',
		},
		{
			label: '注册时间',
			key: 'registrationTime',
			type: 'datePicker',
			value: genCurrentMonthFirstAndLastDay(),
			config: {
				type: 'daterange',
			},
		},
	],
	rules: {
		memberId: [
			{ max: 20, message: '请输入 1 ~ 20 位字符', trigger: 'change' }
		],
		realname: [
			{ max: 20, message: '请输入 1 ~ 20 位字符', trigger: 'change' }
		],
		cardNo: [
			{ max: 20, message: '请输入 1 ~ 20 位字符', trigger: 'change' }
		],
		certificatesNo: [
			{ max: 20, message: '请输入 1 ~ 20 位字符', trigger: 'change' }
		],
		mobile: [
			{ required: false, validator: CHECK_MOBLIE_RULE, trigger: 'blur' },
			{ max: 11, message: '请输入11位数有效手机号', trigger: 'change' }
		]
	},
}

// 优惠顾客列定义
export const DISCOUNT_CUSTOMER_COLUMNS = [
	{
		label: '顾客编号',
		align: 'center',
		prop: 'memberNo',
	},
	{
		label: '会员卡号',
		align: 'center',
		width: 150,
		prop: 'cardNo',
	},
	{
		label: '顾客姓名',
		align: 'center',
		prop: 'realname',
	},
	{
		label: '注册手机号',
		align: 'center',
		prop: 'mobile',
		width: 150
	},
	{
		label: '证件类型',
		align: 'center',
		prop: 'certificatesType',
		formatter: ({ certificatesType }) => {
			return certificatesType in CERTIFICATES_TYPE ? CERTIFICATES_TYPE[certificatesType] : '';
		}
	},
	{
		label: '证件号码',
		align: 'center',
		width: 220,
		prop: 'certificatesNo',
	},
	{
		label: '开通渠道',
		align: 'center',
		prop: 'channel',
		formatter: ({ channel }) => {
			return channel in CHANNEL ? CHANNEL[channel] : '';
		}
	},
	{
		label: '注册时间',
		align: 'center',
		width: 180,
		prop: 'registrationTime',
		formatter: ({ registrationTime }) => filters.timestampFormat(registrationTime)
	},
	{
		label: '开卡时间',
		align: 'center',
		width: 180,
		prop: 'openCardTime',
		formatter: ({ openCardTime }) => filters.timestampFormat(openCardTime)
	},
	{
		label: '是否购货',
		align: 'center',
		prop: 'isBuy',
		formatter: ({ isBuy }) => {
			return isBuy in BUY_STATUS ? BUY_STATUS[isBuy] : '';
		}
	},
	{
		label: '状态',
		align: 'center',
		prop: 'status',
		formatter: ({ status }) => {
			return status in ACCOUT_STATUS ? ACCOUT_STATUS[status] : '';
		}
	},
];

const TRANSFORM_TYPE = {
	',': '全部',
	'3,4': '云商转微店',
	'3,2': '云商转优惠顾客',
	'4,2': '微店转优惠顾客',
	'4,3': '微店转云商',
	'2,3': '优惠顾客转云商',
	'2,4': '优惠顾客转微店',
	'1,2': '普通顾客转优惠顾客',
	'2,1': '优惠顾客转普通顾客',
	'3,1': '云商转普通顾客',
	'4,1': '微店转普通顾客',
}

// 身份转换日志 搜索
export const IDENTITY_TRANSFORM_SEARCH = {
	form: [
		{
			label: '顾客编号',
			key: 'memberId',
			type: 'input',
			value: '',
			placeholder: '请填写顾客编号',
		},
		{
			label: '会员卡号',
			key: 'cardNo',
			type: 'input',
			value: '',
			placeholder: '请输入会员卡号',
		},
		{
			label: '注册手机号',
			key: 'mobile',
			type: 'input',
			value: '',
			placeholder: '请填写注册手机号',
			maxlength: 11
		},
		{
			label: '转化类型',
			key: 'transformType',
			type: 'select',
			value: ',',
			options: optionGenerator(TRANSFORM_TYPE, 'string'),
			placeholder: '请选择转化类型',
		},
		// {
		// 	label: '转化前类型',
		// 	key: 'fromCardType',
		// 	type: 'select',
		// 	value: '',
		// 	options: optionGenerator(TRANSFORM_CUSTOMER_TYPE),
		// 	placeholder: '请填写转化前类型',
		// },
		// {
		// 	label: '转化后类型',
		// 	key: 'toCardType',
		// 	type: 'select',
		// 	value: '',
		// 	options: optionGenerator(TRANSFORM_CUSTOMER_TYPE),
		// 	placeholder: '请填写转化后类型',
		// },
		{
			label: '转化时间',
			key: 'conversionTime',
			type: 'datePicker',
			value: genCurrentMonthFirstAndLastDay(),
			config: {
				type: 'daterange',
			},
		},
	],
	rules: {
		memberId: [
			{ max: 20, message: '请输入 1 ~ 20 位字符', trigger: 'change' }
		],
		cardNo: [
			{ max: 20, message: '请输入 1 ~ 20 位字符', trigger: 'change' }
		],
		mobile: [
			{ required: false, validator: CHECK_MOBLIE_RULE, trigger: 'blur' },
			{ max: 11, message: '请输入11位数有效手机号', trigger: 'change' }
		]
	},
};

// 身份转换日志 表格列定义
export const IDENTITY_TRANSFORM_COLUMNS = [
	{
		label: '转化时间',
		align: 'center',
		prop: 'createTime',
		formatter: ({ createTime }) => filters.timestampFormat(createTime)
	},
	{
		label: '转化类型',
		align: 'center',
		prop: '',
		formatter: ({ fromMemberType, toMemberType }) => {
			const beforeType = fromMemberType in CUSTOMER_TYPE ? CUSTOMER_TYPE[fromMemberType] : '未知类型';
			const afterType = toMemberType in CUSTOMER_TYPE ? CUSTOMER_TYPE[toMemberType] : '未知类型';
			return `${beforeType} 转为 ${afterType}`;
		}
	},
	// {
	// 	label: '转化前类型',
	// 	align: 'center',
	// 	prop: 'fromMemberType',
	// 	formatter: ({ fromMemberType }) => {
	// 		return fromMemberType in CUSTOMER_TYPE ? CUSTOMER_TYPE[fromMemberType] : '';
	// 	}
	// },
	// {
	// 	label: '转化后类型',
	// 	align: 'center',
	// 	prop: 'toMemberType',
	// 	formatter: ({ toMemberType }) => {
	// 		return toMemberType in CUSTOMER_TYPE ? CUSTOMER_TYPE[toMemberType] : '';
	// 	}
	// },
	{
		label: '顾客编号',
		align: 'center',
		prop: 'memberNo',
	},
	{
		label: '会员卡号',
		align: 'center',
		prop: 'cardNo',
	},
	{
		label: '顾客姓名',
		align: 'center',
		prop: 'realname',
	},
	{
		label: '注册手机号',
		align: 'center',
		prop: 'mobile'
	},
	{
		label: '操作人',
		align: 'center',
		prop: 'operatorMemberId',
		formatter: ({ operatorMemberId }) => {
			return operatorMemberId == 0 ? 'system' : operatorMemberId
		}
	},
];

// 云商 油葱微店 类型
export const CLOUD_CUSTOMER_TYPE = {
	'1': '云商',
	'2': '油葱微店'
}

export const DELIVERY_TYPE = [
	{ label: '服务中心', value: '1' },
	{ label: '分公司', value: '2' },
]

// 云商 油葱微店 管理搜索
export const CLOUD_MANAGEMENT_SEARCH = {
	form: [
		{
			label: '分公司编号',
			key: 'companyNo',
			type: 'input',
			value: '',
			placeholder: '请填写分公司编号',
		},
		{
			label: '会员卡号',
			key: 'cardNo',
			type: 'input',
			value: '',
			placeholder: '请输入会员卡号',
		},
		{
			label: '顾客类型',
			key: 'businessType',
			type: 'select',
			value: '',
			options: optionGenerator(CLOUD_CUSTOMER_TYPE),
			placeholder: '请选择顾客类型',
		},
		{
			label: '帐号状态',
			key: 'status',
			type: 'select',
			value: '',
			options: optionGenerator(ACCOUT_STATUS),
			placeholder: '请选择帐号状态',
		},
		{
			label: '创建时间',
			key: 'registrationTime',
			type: 'datePicker',
			// value: [undefined, undefined],
			value: genCurrentMonthFirstAndLastDay(),
			config: {
				type: 'daterange',
			},
		},
		{
			label: '开卡时间',
			key: 'openCardTime',
			type: 'datePicker',
			value: genCurrentMonthFirstAndLastDay(),
			config: {
				type: 'daterange',
			},
		},
	],
	rules: {
		companyNo: [
			{ max: 20, message: '请输入 1 ~ 20 位字符', trigger: 'change' }
		],
		cardNo: [
			{ max: 20, message: '请输入 1 ~ 20 位字符', trigger: 'change' }
		],
	},
};

// 云商 油葱微店 管理 列定义
export const CLOUD_MANAGEMENT_COLUMNS = [
	{
		label: '会员卡号',
		align: 'center',
		prop: 'cardNo',
		width: 250,
	},
	{
		label: '顾客姓名',
		align: 'center',
		prop: 'realname',
	},
	{
		label: '注册手机号',
		align: 'center',
		prop: 'mobile',
		width: 200
	},
	{
		label: '证件类型',
		align: 'center',
		prop: 'certificatesType',
		formatter: ({ certificatesType }) => {
			return certificatesType in CERTIFICATES_TYPE ? CERTIFICATES_TYPE[certificatesType] : '';
		}
	},
	{
		label: '证件号码',
		align: 'center',
		width: 200,
		prop: 'certificatesNo',
	},
	{
		label: '注册时间',
		align: 'center',
		width: 150,
		prop: 'registrationTime',
		formatter: ({ registrationTime }) => filters.timestampFormat(registrationTime)
	},
	{
		label: '开卡时间',
		align: 'center',
		width: 150,
		prop: 'openCardTime',
		formatter: ({ openCardTime }) => filters.timestampFormat(openCardTime)
	},
	{
		label: '创建时间',
		align: 'center',
		width: 150,
		prop: 'lastUpgradeTime',
		formatter: ({ lastUpgradeTime }) => filters.timestampFormat(lastUpgradeTime)
	},
	{
		label: '类型',
		align: 'center',
		prop: 'businessType',
		formatter: ({ businessType }) => {
			return businessType in CLOUD_CUSTOMER_TYPE ? CLOUD_CUSTOMER_TYPE[businessType] : '';
		}
	},
	{
		label: '配送单位',
		align: 'center',
		prop: 'rdcType',
		formatter: ({rdcType}) => {
			let value = '';
			DELIVERY_TYPE.map((v) => {
				v.value == rdcType && (value = v.label);
			})
			return value;
		}
	},
	{
		label: '分公司编号',
		align: 'center',
		prop: 'rdcCompanyNo',
	},
	{
		label: '对应分公司',
		align: 'center',
		prop: 'rdcCompanyName',
	},
	{
		label: '签约银行',
		align: 'center',
		prop: 'signBank',
	},
	{
		label: '签约银行帐号',
		align: 'center',
		width: 200,
		prop: 'signBankAccount',
	},
	{
		label: '极速退款额度',
		align: 'center',
		width: 120,
		prop: 'refundAmount',
	},
];

// 帐户管理字段定义
export const ACCOUNT_MANGE = [
	{ label: '顾客编号', key: 'memberNo' },
	{ label: '会员卡号', key: 'cardNo',type:'customer' },
	{
		label: '顾客身份',
		key: 'memberType',
		buttons: [
			{ name: '身份转换', cb: 'indentityTransform', disabled: val => {
					const ret = val == 1;
					return ret;
				} }
		]
	},
	{ label: '顾客姓名', key: 'realname',type:'customer' },
	{ label: '配偶姓名', key: 'spouseRealname',type:'customer' },
	{
		label: '注册手机号',
		key: 'mobile',
		buttons: [
			{ name: '修改注册手机号', cb: 'editPhone', disabled: () => false },
		]
	},
	{
		label: '关联手机号',
		key: 'mobiles',
		buttons: [
			{ name: '添加关联手机号', cb: 'addBindPhone', disabled: () => false },
			{ name: '删除关联手机号', cb: 'openDeleteSubAccountModal', disabled: () => false },
		],
		type:'customer'
	},
	{ label: '邮箱', key: 'email',type:'customer' },
	{
		label: '密码',
		key: 'password',
		buttons: [
			{ name: '初始化密码', cb: 'initialPassword', disabled: val => val === 1 },
			{ name: '初始化子帐号密码', cb: 'openInitialSubAccountModal', disabled: val => val === 1,type:'customer' },
		]
	},
	{ label: '微信', key: 'wechatNickname',type:'customer' },
	{ label: 'QQ', key: 'qqNickname',type:'customer' },
	{
		label: '默认配送服务中心',
		key: 'defaultDistributionStoreName',
		buttons: [
			{ name: '更换', cb: 'changeDetaulServiceCentre', disabled: () => false }
		],
		type:'customer' | 'business'
	},
	{
		label: '帐号状态',
		key: 'memberStatus',
		buttons: [
			{ name: '修改', cb: 'changeAccountStatus', disabled: () => false }
		]
	},
	{ label: '最近一次变更状态时间', key: 'lastUpgradeTime' },
	{ label: '操作人', key: 'updaterId' },
];
// 开单类型
export const ORDER_TYPR = [
	{ value: 1, label: '顾客申请', },
	{ value: 2, label: '公司申请', },
];
// 订单状态 1->待支付 2->待发货 3->待收货 4->已取消 5->已退货 99->已完成
export const ORDER_STATUS = [
	{ value: 1, label: '待支付', },
	{ value: 2, label: '待发货', },
	{ value: 3, label: '待收货', },
	{ value: 4, label: '已取消', },
	{ value: 5, label: '已退货', },
	{ value: 99, label: '已完成', }
];
export const ORDER_COLUMNS = [
	{ label: '订单号', prop: 'orderNo', align: 'center' },
	{
		label: '订单总金额',
		prop: 'orderAmount',
		align: 'center',
		formatter: ({orderAmount}) => {
			return '¥'+filters.toThousandslsFilter(orderAmount);
		}
	},
	{
		label: '优惠金额',
		prop: 'couponAmount',
		align: 'center',
		formatter: ({couponAmount}) => {
			return '¥'+filters.toThousandslsFilter(couponAmount);
		}
	},
	{ label: '电子礼券', prop: 'giftCouponAmount', align: 'center' },
	{
		label: '实付金额',
		prop: 'actuallyAmount',
		align: 'center',
		formatter: ({actuallyAmount}) => {
			return '¥'+filters.toThousandslsFilter(actuallyAmount);
		}
	},
	{ label: '积分(PV)', prop: 'pv', align: 'center' },
	{
		label: '开单类型',
		prop: 'orderType',
		align: 'center',
		formatter: ({orderType}) => {
			let value = '';
			ORDER_TYPR.map((v) => {
				v.value == orderType && (value = v.label);
			})
			return value;
		}
	},
	{ label: '开单人', prop: 'creatorName', align: 'center' },
	{
		label: '开单日期',
		prop: 'commitTime',
		align: 'center',
		formatter: ({commitTime}) => {
			return filters.timestampFormat(commitTime);
		}
	},
	{
		label: '付款日期',
		prop: 'payTime',
		align: 'center',
		formatter: ({payTime}) => {
			return filters.timestampFormat(payTime);
		}
	},
	{
		label: '发货日期',
		prop: 'deliverTime',
		align: 'center',
		formatter: ({deliverTime}) => {
			return filters.timestampFormat(deliverTime);
		}
	},
	{
		label: '订单状态',
		prop: 'orderStatus',
		align: 'center',
		formatter: ({orderStatus}) => {
			let value = '';
			ORDER_STATUS.map((v) => {
				v.value == orderStatus && (value = v.label);
			})
			return value;
		}
	},
];

// 退货-来源类型
export const APPLY_SOURCE = [
	{ value: 1, label: '顾客申请', },
	{ value: 2, label: '公司申请', },
];
// 退货-处理状态
export const RETURN_STATUS = [
	{ value: 1, label: '待审核', },
	{ value: 2, label: '待退回', },
	{ value: 3, label: '待验货', },
	{ value: 98, label: '已取消', },
	{ value: 99, label: '已完成', }
];
// 退货-退货类型
export const RETURN_TYPE = [
	{ value: 1, label: '当月退货', },
	{ value: 2, label: '隔月退货', },
];
// 退款状态
export const REFUND_STATUS = [
	{ value: 0, label: '未退款', },
	{ value: 1, label: '已退款', },
	{ value: 2, label: '退款失败' },
];
// 配送方式
export const EXPRESSTYPE = [
	{ value: 1, label: '服务中心自提', },
	{ value: 2, label: '公司配送', }
]
// 退货
export const AFTERSELL_COLUMNS = [
	{
		label: '申请日期',
		prop: 'applyTime',
		align: 'center',
		formatter: ({applyTime}) => {
			return filters.timestampFormat(applyTime);
		}
	},
	{ label: '来源',
		prop: 'applySource',
		align: 'center',
		formatter: ({applySource}) => {
			let value = '';
			APPLY_SOURCE.map((v) => {
				v.value == applySource && (value = v.label);
			})
			return value;
		}
	},
	{
		label: '退货类型',
		prop: 'returnType',
		align: 'center',
		formatter: ({returnType}) => {
			let value = '';
			RETURN_TYPE.map((v) => {
				v.value == returnType && (value = v.label);
			})
			return value;
		}
	},
	{
		label: '订单发货状态',
		prop: 'orderDeliverStatus',
		align: 'center',
		formatter: ({orderDeliverStatus}) => {
			let value = '';
			ORDER_DELIVER_STATUS.map((v) => {
				v.value == orderDeliverStatus && (value = v.label);
			})
			return value;
		}
	},
	{
		label: '发货方式',
		prop: 'expressType',
		align: 'center',
		formatter: ({expressType}) => {
			let value = '';
			EXPRESSTYPE.map((v) => {
				v.value == expressType && (value = v.label);
			})
			return value;
		}
	},
	{
		label: '处理状态',
		prop: 'returnStatus',
		align: 'center',
		formatter: ({returnStatus}) => {
			let value = '';
			RETURN_STATUS.map((v) => {
				v.value == returnStatus && (value = v.label);
			})
			return value;
		}
	},
	{
		label: '退货金额',
		prop: 'refundAmount',
		align: 'center',
		formatter: ({refundAmount}) => {
			return '¥'+filters.toThousandslsFilter(refundAmount);
		}
	},
	{
		label: '退款状态',
		prop: 'refundStatus',
		align: 'center',
		formatter: ({refundStatus}) => {
			let value = '';
			REFUND_STATUS.map((v) => {
				v.value == refundStatus && (value = v.label);
			})
			return value;
		}
	},
	{ label: '售后单号', prop: 'returnNo', align: 'center' },
	{ label: '对应订单号', prop: 'orderNo', align: 'center' }
];
// 换货单状态
export const EXCHANGE_STATUS = [
	{ value: 1, label: '待审核', },
	{ value: 2, label: '待退回', },
	{ value: 3, label: '待验货', },
	{ value: 4, label: '待回寄', },
	{ value: 5, label: '待确认', },
	{ value: 98, label: '已取消', },
	{ value: 99, label: '已完成', }
];
// 订单发货状态
export const ORDER_DELIVER_STATUS = [
	{ value: 0, label: '待发货', },
	{ value: 1, label: '已发货', }
];
// 换货
export const CHANGESELL_COLUMNS = [
	{
		label: '申请日期',
		prop: 'applyTime',
		align: 'center',
		formatter: ({applyTime}) => {
			return filters.timestampFormat(applyTime);
		}
	},
	{ label: '服务中心名称',
		prop: 'storeName',
		align: 'center',
	},
	{
		label: '来源',
		prop: 'applySource',
		align: 'center',
		formatter: ({applySource}) => {
			let value = '';
			APPLY_SOURCE.map((v) => {
				v.value == applySource && (value = v.label);
			})
			return value;
		}
	},
	{
		label: '发货方式',
		prop: 'expressType',
		align: 'center',
		formatter: ({expressType}) => {
			let value = '';
			EXPRESSTYPE.map((v) => {
				v.value == expressType && (value = v.label);
			})
			return value;
		}
	},
	{
		label: '订单发货状态',
		prop: 'orderDeliverStatus',
		align: 'center',
		formatter: ({orderDeliverStatus}) => {
			let value = '';
			ORDER_DELIVER_STATUS.map((v) => {
				v.value == orderDeliverStatus && (value = v.label);
			})
			return value;
		}
	},
	{
		label: '处理状态',
		prop: 'exchangeStatus',
		align: 'center',
		formatter: ({exchangeStatus}) => {
			let value = '';
			EXCHANGE_STATUS.map((v) => {
				v.value == exchangeStatus && (value = v.label);
			})
			return value;
		}
	},
	{ label: '售后单号', prop: 'exchangeNo', align: 'center' },
	{ label: '对应订单号', prop: 'orderNo', align: 'center' },
	{
		label: '订单金额',
		prop: 'orderAmount',
		align: 'center',
		formatter: ({orderAmount}) => {
			return '¥'+filters.toThousandslsFilter(orderAmount);
		}
	}
]

// 优惠券-使用范围
export const USE_RANGA = [
	{ value: 1, label: '所有产品', },
	{ value: 2, label: '指定产品', },
	{ value: 3, label: '指定不适用产品', },
	{ value: 4, label: '指定产品分类', },
	{ value: 5, label: '指定活动', }
];
// 优惠券-使用状态
export const DISCOUNT_STATE = {
	1: '未使用',
	2: '已使用',
	3: '已作废',
	4: '已失效',
}
export const DISCOUNT_COLUMNS = [
	{ label: '优惠券编码', prop: 'couponNumber', align: 'center' },
	{ label: '优惠券名称', prop: 'couponName', align: 'center' },
	{
		label: '使用范围',
		prop: 'useRange',
		align: 'center',
		formatter: ({useRange}) => {
			let value = '';
			USE_RANGA.map((v) => {
				v.value == useRange && (value = v.label);
			})
			return value;
		}
	},
	{ label: '面值', prop: 'faceValue', align: 'center' },
	{
		label: '订单满足金额',
		prop: 'minAmount',
		align: 'center',
		formatter: ({minAmount}) => {
			return '¥'+filters.toThousandslsFilter(minAmount);
		}
	},
	{
		label: '有效时间',
		prop: 'startTime',
		align: 'center',
		formatter: (row) => {
			return filters.timestampFormat(row.startTime) +'-'+ filters.timestampFormat(row.endTime)
		}
	},
	{
		label: '优惠券使用时间',
		prop: 'useTime',
		align: 'center',
		formatter: ({useTime}) => {
			return filters.timestampFormat(useTime);
		}
	},
	{
		label: '使用状态',
		prop: 'state',
		align: 'center',
		formatter: ({state}) => {
			return DISCOUNT_STATE[state];
		}
	},
];

// 优惠券-产品状态
export const PRODUCT_STATUS = {
	1: "草稿",
	2: "待产品审核",
	3: "产品审核不通过",
	4: "待财务审核",
	5: "财务审核不通过",
	6: "审核通过",
	7: "已上架",
	8: "已下架"
}
export const FAVOURITE_COLUMNS = [
	{ label: '产品名称', prop: 'title', align: 'center' },
	{ label: '产品编码', prop: 'serialNo', align: 'center' },
	{
		label: '产品价格',
		prop: 'retailPrice',
		align: 'center',
		formatter: ({retailPrice}) => {
			return '¥'+filters.toThousandslsFilter(retailPrice);
		}
	},
	{ label: '产品PV', prop: 'pv', align: 'center' },
	{
		label: '产品状态',
		prop: 'productStatus',
		align: 'center',
		formatter: ({productStatus}) => {
			return PRODUCT_STATUS[productStatus];
		}
	},
	{
		label: '收藏时间',
		prop: 'createTime',
		align: 'center',
		formatter: ({createTime}) => {
			return filters.timestampFormat(createTime);
		}
	},
];

export const SHARE_COLUMNS = [
	{ label: '会员卡号', prop: 'cardNo', align: 'center' },
	{ label: '顾客姓名', prop: 'realname', align: 'center' },
	{ label: '顾客手机号', prop: 'mobile', align: 'center' },
	{ label: '证件类型', prop: 'certificatesType', align: 'center' },
	{ label: '证件号', prop: 'certificatesNo', align: 'center' },
	{ label: '注册时间', prop: 'registerTime', align: 'center' },
	{ label: '是否购货', prop: 'isShopping', align: 'center' },
];

// 分享人日志查询 搜索
export const SHARAER_LOG_SEARCH = {
	form: [
		{
			label: '顾客编号',
			key: 'memberNo',
			type: 'input',
			value: '',
			placeholder: '请填写顾客编号',
		},
		{
			label: '会员卡号',
			key: 'cardNo',
			type: 'input',
			value: '',
			placeholder: '请输入会员卡号',
		},
		{
			label: '顾客姓名',
			key: 'realname',
			type: 'input',
			value: '',
			placeholder: '请输入顾客姓名',
		},
		{
			label: '注册手机号',
			key: 'mobile',
			type: 'input',
			value: '',
			placeholder: '请填写注册手机号码',
			maxlength: 11
		},
		{
			label: '分享人卡号',
			key: 'shareCardNo',
			type: 'input',
			value: '',
			placeholder: '请输入分享人卡号',
		},
		{
			label: '分享人姓名',
			key: 'shareRealname',
			type: 'input',
			value: '',
			placeholder: '请输入分享人姓名',
		},
		{
			label: '分配类型',
			key: 'allotType',
			type: 'select',
			value: '',
			options: optionGenerator(ALLOCATION_TYPE,String),
			placeholder: '请选择类型',
		},
		{
			label: '分享/分配时间',
			key: 'allotTimeRange',
			type: 'datePicker',
			value: genCurrentMonthFirstAndLastDay(),
			config: {
				type: 'daterange',
			},
		},
	],
	rules: {
		memberNo: [
			{ max: 20, message: '请输入 1 ~ 20 位字符', trigger: 'change' }
		],
		realname: [
			{ max: 20, message: '请输入 1 ~ 20 位字符', trigger: 'change' }
		],
		cardNo: [
			{ max: 20, message: '请输入 1 ~ 20 位字符', trigger: 'change' }
		],
		shareCardNo: [
			{ max: 20, message: '请输入 1 ~ 20 位字符', trigger: 'change' }
		],
		shareRealname: [
			{ max: 20, message: '请输入 1 ~ 20 位字符', trigger: 'change' }
		],
		mobile: [
			{ required: false, validator: CHECK_MOBLIE_RULE, trigger: 'blur' },
			{ max: 11, message: '请输入11位数有效手机号', trigger: 'change' }
		]
	},
};

// 分享人日志查询 列定义
export const SHARAER_LOG_COLUMN = [
	{
		label: '分享分配时间',
		prop: 'allotTime',
		align: 'center',
		width: 200,
		formatter: ({ allotTime }) => filters.timestampFormat(allotTime)
	},
	{
		label: '分配类型',
		prop: 'allotType',
		align: 'center',
		formatter: ({ allotType }) => {
			return allotType in ALLOCATION_TYPE ? ALLOCATION_TYPE[allotType] : '';
		}
	},
	{ label: '顾客编号', prop: 'memberNo', align: 'center' },
	{ label: '会员卡号', prop: 'cardNo', align: 'center' },
	{ label: '顾客姓名', prop: 'realname', align: 'center' },
	{
		label: '注册手机号',
		prop: 'mobile',
		align: 'center',
	},
	{ label: '分享人卡号', prop: 'shareCardNo', align: 'center' },
	{ label: '分享人姓名', prop: 'shareRealname', align: 'center' },
	{ label: '操作人', prop: 'createName', align: 'center' },
];

