// import {validatorMobile}  from 'util/formValidation.js' // 表单验证工具函数
// 顾客管理
export const CUSTORM_SEARCH_CONFIG = {
    form: [
        {
            label: '顾客编号',
            key: 'customerNum',
            type: 'input',
            value: '',
            placeholder: '请输入顾客编号',
        },
        {
            label: '注册手机号',
            key: 'phone',
            type: 'input',
            value: '',
            placeholder: '请输入手机号',
            // rules: {
            //     required: false,
            //     trigger: "blur",
            //     validator: validatorMobile
            // }
        },
        {
            label: '状态',
            key: 'status',
            type: 'select',
            value: '',
            options: [
                {
                    value: '1',
                    label: '启用'
                },
                {
                    value: '2',
                    label: '禁用'
                }
            ],
            placeholder: '请选择状态'
        },
        {
            label: '开通渠道',
            key: 'channelCode',
            type: 'select',
            value: '',
            options: [
                {
                    value: '1',
                    label: 'H5',
                },
                {
                    value: '2',
                    label: 'APP',
                },
                {
                    value: '3',
                    label: '小程序',
                },
                {
                    value: '4',
                    label: 'PC',
                },
            ],
            placeholder: '请选择开通渠道'
        },
        {
            label: '注册时间',
            key: 'registerTime',
            type: 'datePicker',
            value: [],
            config: {
                type: 'daterange',
                rangeSeparator: '~',
                startPlaceholder: '开始日期',
                endPlaceholder: '结束日期'
            }
        },
        // {
        //     label: '月份',
        //     key: 'backDate',
        //     type: 'datePicker',
        //     value: '',
        //     config: {
        //         type: 'month',
        //         placeholder: '请选择月份'
        //     },
        // },
    ],
    // col:4 // 每行排列3个
    btns: [
        {
            type: '',
            isShow: true,
            title: '重置',
            key: 'reset'
        },
        {
            type: 'primary',
            isShow: true,
            title: '搜索',
            key: 'search'
        }
    ]
}



// 服务中心
// 服务中心资料管理
export const SERVICE_CENTER_DATA_CONFIG = {
    form: [
        {
            label: '服务中心编号',
            key: 'No',
            type: 'input',
            value: '',
            placeholder: '请输入服务中心编号',
            rules: {
                required: false,
                trigger: 'blur',
                validator: () => { },
            },
        },
        {
            label: '服务中心名称',
            key: 'centerName',
            type: 'input',
            value: '',
            placeholder: '请输入服务中心名称',
            rules: {
                required: false,
                trigger: 'blur',
                validator: () => { },
            },
        },
        {
            label: '负责人卡号',
            key: 'cardNum',
            type: 'input',
            value: '',
            placeholder: '请输入负责人卡号',
            rules: {
                required: false,
                trigger: 'blur',
                validator: () => { },
            },
        },
        {
            label: '负责人姓名',
            key: 'name',
            type: 'input',
            value: '',
            placeholder: '请输入负责人姓名',
            rules: {
                required: false,
                trigger: 'blur',
                validator: () => { },
            },
        },
        {
            label: '分公司',
            key: '',
            type: 'select',
            value: '',
            options: [
                {
                    value: '0',
                    label: '公司1',
                },
                {
                    value: '1',
                    label: '公司2',
                },
            ],
            placeholder: '',
        },
        {
            label: '总分店',
            key: '',
            type: 'select',
            value: '',
            options: [
                {
                    value: '0',
                    label: '启用',
                },
                {
                    value: '1',
                    label: '禁用',
                },
            ],
            placeholder: '',
        },
        {
            label: '网点类型',
            key: '',
            type: 'select',
            value: '',
            options: [
                {
                    value: '0',
                    label: '启用',
                },
                {
                    value: '1',
                    label: '禁用',
                },
            ],
            placeholder: '',
        },
        {
            label: '省份',
            key: '',
            type: 'select',
            value: '',
            options: [
                {
                    value: '0',
                    label: '启用',
                },
                {
                    value: '1',
                    label: '禁用',
                },
            ],
            placeholder: '',
        },
        {
            label: '签署合同',
            key: '',
            type: 'select',
            value: '',
            options: [
                {
                    value: '0',
                    label: '启用',
                },
                {
                    value: '1',
                    label: '禁用',
                },
            ],
            placeholder: '',
        },
        {
            label: '批准时间',
            key: '',
            type: 'datePicker',
            value: [],
            config: {
                type: 'daterange', //daterange 日期范围类型
                rangeSeparator: '~',
                startPlaceholder: '开始日期',
                endPlaceholder: '结束日期',
            },
        },
        {
            label: '网点等级',
            key: '',
            type: 'select',
            value: '',
            options: [
                {
                    value: '0',
                    label: '启用',
                },
                {
                    value: '1',
                    label: '禁用',
                },
            ],
            placeholder: '',
        },
    ],
    col: 3, // 每行排列的个数，默认排列三个（此字段可以省略）
    buttonGroup: [
        {
            type: '', // 按钮类型
            isShow: true, // 按钮显示隐藏
            title: '重置', // 按钮文案
            key: 'reset', // 按钮标识（标识触发对应事件）
        },
        {
            type: 'primary', // 按钮类型
            isShow: true, // 按钮显示隐藏
            title: '搜索', // 按钮文案
            key: 'search', // 按钮标识（标识触发对应事件）
        },
    ],
}
// 服务中心银行账号
export const SERVICE_CENTER_BANK_CONFIG = {
    form: [
        {
            label: '服务中心编号',
            key: 'No',
            type: 'input',
            value: '',
            placeholder: '请输入服务中心编号',
            rules: {
                required: false,
                trigger: 'blur',
                validator: () => { },
            },
        },
        {
            label: '服务中心名称',
            key: 'centerName',
            type: 'input',
            value: '',
            placeholder: '请输入服务中心名称',
            rules: {
                required: false,
                trigger: 'blur',
                validator: () => { },
            },
        },
        {
            label: '分公司',
            key: '',
            type: 'select',
            value: '',
            options: [
                {
                    value: '0',
                    label: '公司1',
                },
                {
                    value: '1',
                    label: '公司2',
                },
            ],
            placeholder: '',
        },
        {
            label: '负责人卡号',
            key: 'cardNum',
            type: 'input',
            value: '',
            placeholder: '请输入负责人卡号',
            rules: {
                required: false,
                trigger: 'blur',
                validator: () => { },
            },
        },
        {
            label: '负责人姓名',
            key: 'name',
            type: 'input',
            value: '',
            placeholder: '请输入负责人姓名',
            rules: {
                required: false,
                trigger: 'blur',
                validator: () => { },
            },
        },
    ],
    col: 3, // 每行排列的个数，默认排列三个（此字段可以省略）
    buttonGroup: [
        {
            type: '', // 按钮类型
            isShow: true, // 按钮显示隐藏
            title: '搜索', // 按钮文案
            key: 'search', // 按钮标识（标识触发对应事件）
        },
        {
            type: '', // 按钮类型
            isShow: true, // 按钮显示隐藏
            title: '重置', // 按钮文案
            key: 'reset', // 按钮标识（标识触发对应事件）
        },
    ],
}

// 服务中心协议管理
export const SERVICE_CENTER_CONTRACT_CONFIG = {
    form: [
        {
            label: '服务中心/公司编号',
            key: 'No',
            type: 'input',
            value: '',
            placeholder: '请输入服务中心/公司编号',
            rules: {
                required: false,
                trigger: 'blur',
                validator: () => { },
            },
        },
        {
            label: '协议类型',
            key: '',
            type: 'select',
            value: '',
            options: [
                {
                    value: '0',
                    label: '公司1',
                },
                {
                    value: '1',
                    label: '公司2',
                },
            ],
            placeholder: '',
        },
        {
            label: '状态',
            key: '',
            type: 'select',
            value: '',
            options: [
                {
                    value: '0',
                    label: '公司1',
                },
                {
                    value: '1',
                    label: '公司2',
                },
            ],
            placeholder: '',
        },
        {
            label: '甲方公司',
            key: '',
            type: 'select',
            value: '',
            options: [
                {
                    value: '0',
                    label: '公司1',
                },
                {
                    value: '1',
                    label: '公司2',
                },
            ],
            placeholder: '',
        },
        {
            label: '乙方单位名称',
            key: 'name',
            type: 'input',
            value: '',
            placeholder: '请输入乙方单位名称',
            rules: {
                required: false,
                trigger: 'blur',
                validator: () => { },
            },
        },
    ],
    col: 3, // 每行排列的个数，默认排列三个（此字段可以省略）
    buttonGroup: [
        {
            type: '', // 按钮类型
            isShow: true, // 按钮显示隐藏
            title: '重置', // 按钮文案
            key: 'reset', // 按钮标识（标识触发对应事件）
        },
        {
            type: 'primary', // 按钮类型
            isShow: true, // 按钮显示隐藏
            title: '搜索', // 按钮文案
            key: 'search', // 按钮标识（标识触发对应事件）
        },
    ],
}

// 服务中心分配量
export const SERVICE_CENTER_DISTRIBUTION_CONFIG = {
    form: [
        {
            label: '服务中心编号',
            key: 'orgCode',
            type: 'input',
            value: '',
            placeholder: '请输入服务中心编号'
        },
        {
            label: '服务中心名称',
            key: 'legalName',
            type: 'input',
            value: '',
            placeholder: '请输入服务中心名称',
        },
        {
            label: '负责人卡号',
            key: 'legalName',
            type: 'input',
            value: '',
            placeholder: '请输入负责人卡号',
        },
        {
            label: '负责人姓名',
            key: 'legalName',
            type: 'input',
            value: '',
            placeholder: '请输入负责人姓名',
        },
        {
            label: '分公司',
            key: '',
            type: 'select',
            value: '',
            options: [
                {
                    value: '0',
                    label: '启用',
                },
                {
                    value: '1',
                    label: '禁用',
                },
            ],
            placeholder: '',
        },
    ],
    col: 3, // 每行排列的个数，默认排列三个（此字段可以省略）
    buttonGroup: [
        {
            type: '',
            title: '重置',
            key: 'reset'
        },
        {
            type: 'primary',
            title: '搜索',
            key: 'search'
        }
    ],
}

// 服务中心退货额度
export const SERVICE_CENTER_RETURN_CONFIG = {
    form: [
        {
            label: '服务中心编号',
            key: 'orgCode',
            type: 'input',
            value: '',
            placeholder: '请输入服务中心编号'
        },
        {
            label: '服务中心名称',
            key: 'legalName',
            type: 'input',
            value: '',
            placeholder: '请输入服务中心名称',
        },
        {
            label: '负责人卡号',
            key: 'legalName',
            type: 'input',
            value: '',
            placeholder: '请输入负责人卡号',
        },
        {
            label: '负责人姓名',
            key: 'legalName',
            type: 'input',
            value: '',
            placeholder: '请输入负责人姓名',
        },
        {
            label: '分公司',
            key: '',
            type: 'select',
            value: '',
            options: [
                {
                    value: '0',
                    label: '启用',
                },
                {
                    value: '1',
                    label: '禁用',
                },
            ],
            placeholder: '',
        },
    ],
    col: 3, // 每行排列的个数，默认排列三个（此字段可以省略）
    buttonGroup: [
        {
            type: '',
            title: '重置',
            key: 'reset'
        },
        {
            type: 'primary',
            title: '搜索',
            key: 'search'
        }
    ],
}

// 服务中心等级管理
export const SERVICE_CENTER_GRADE_CONFIG = {
    form: [
        {
            label: '服务中心编号',
            key: 'orgCode',
            type: 'input',
            value: '',
            placeholder: '请输入服务中心编号'
        },
        {
            label: '服务中心名称',
            key: 'legalName',
            type: 'input',
            value: '',
            placeholder: '请输入服务中心名称',
        },
        {
            label: '负责人卡号',
            key: 'legalName',
            type: 'input',
            value: '',
            placeholder: '请输入负责人卡号',
        },
        {
            label: '负责人姓名',
            key: 'legalName',
            type: 'input',
            value: '',
            placeholder: '请输入负责人姓名',
        },
        {
            label: '分公司',
            key: '',
            type: 'select',
            value: '',
            options: [
                {
                    value: '0',
                    label: '启用',
                },
                {
                    value: '1',
                    label: '禁用',
                },
            ],
            placeholder: '',
        },
    ],
    col: 3, // 每行排列的个数，默认排列三个（此字段可以省略）
    buttonGroup: [
        {
            type: '',
            title: '重置',
            key: 'reset'
        },
        {
            type: 'primary',
            title: '搜索',
            key: 'search'
        }
    ],
}

// 基础信息管理-分公司列表
export const BRANCH_LIST_MANAGEMENT_CONFIG = {
    form: [
        {
            label: '公司编号',
            key: 'orgCode',
            type: 'input',
            value: '',
            placeholder: '请输入公司编号'
        },
        {
            label: '负责人',
            key: 'legalName',
            type: 'input',
            value: '',
            placeholder: '请输入负责人',
        },

    ],
    col: 3, // 每行排列的个数，默认排列三个（此字段可以省略）
    buttonGroup: [
        {
            type: '',
            title: '重置',
            key: 'reset'
        },
        {
            type: 'primary',
            title: '搜索',
            key: 'search'
        }
    ],
}

// 基础信息管理-运费模板设置
export const SHIPPING_LIST_TEMPLATE_CONFIG = {
    form: [
        {
            label: '运费模板名称',
            key: 'name',
            type: 'input',
            value: '',
            placeholder: '请输入运费模板名称'
        },
        {
            label: '状态',
            key: 'status',
            type: 'select',
            value: '',
            options: [
                {
                    value: '1',
                    label: '启用',
                },
                {
                    value: '2',
                    label: '禁用',
                },
            ],
            placeholder: '请选择状态',
        },
    ],
    buttonGroup: [
        {
            type: '',
            title: '重置',
            key: 'reset',
        },
        {
            type: 'primary',
            title: '搜索',
            key: 'search',
        },
    ],
}

// 基础信息管理-地区信息管理列表
export const AREAMANAGE_LIST_CONFIG = {
    form: [
        {
            label: '省份',
            key: 'province',
            type: 'select',
            value: '',
            options: [
                {
                    value: '1',
                    label: '江西',
                },
                {
                    value: '2',
                    label: '广东',
                },
            ],
            placeholder: '请选择省份',
        },
        {
            label: '城市',
            key: 'city',
            type: 'select',
            value: '',
            options: [
                {
                    value: '1',
                    label: '北京',
                },
                {
                    value: '2',
                    label: '广州',
                },
            ],
            placeholder: '请选择省份',
        },
        {
            label: '区县',
            key: 'area',
            type: 'select',
            value: '',
            options: [
                {
                    value: '1',
                    label: '天河区',
                },
                {
                    value: '2',
                    label: '白云区',
                },
            ],
            placeholder: '请选择区县',
        },
        {
            label: '乡镇街道',
            key: 'street',
            type: 'input',
            value: '',
            placeholder: '请输入乡镇街道'
        },

    ],
    buttonGroup: [
        {
            type: '',
            title: '重置',
            key: 'reset',
        },
        {
            type: 'primary',
            title: '搜索',
            key: 'search',
        },
    ],
}

// 基础信息管理-仓库管理列表
export const STOREMANAGE_LIST_CONFIG = {
    form: [
        {
            label: '仓库编码',
            key: 'code',
            type: 'input',
            value: '',
            placeholder: '请输入仓库编码'
        },
        {
            label: '业务范围',
            key: 'businessRange',
            type: 'select',
            value: '',
            options: [
                {
                    value: '1',
                    label: 'B',
                },
                {
                    value: '2',
                    label: 'C',
                },
            ],
            placeholder: '请选择业务范围',
        },
    ],
    buttonGroup: [
        {
            type: '',
            title: '重置',
            key: 'reset',
        },
        {
            type: 'primary',
            title: '搜索',
            key: 'search',
        },
    ],
}

// 消息中心-系统消息管理列表
export const SYSTEM_MESSGE_MAANGEMENT_CONFIG = {
    form: [
        {
            label: '场景大类',
            key: 'name',
            type: 'input',
            value: '',
            placeholder: '搜索场景大类'
        },
    ],
    buttonGroup: [
        {
            type: '',
            title: '重置',
            key: 'reset',
        },
        {
            type: 'primary',
            title: '搜索',
            key: 'search',
        },
    ],
}


