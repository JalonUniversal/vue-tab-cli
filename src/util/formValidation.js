
// 用于存放搜索校验方法

// 手机验证
export function validatorMobile(rule, value, callback) {
	const reg = /^1(3|4|5|7|8)\d{9}$/;
	if (!reg.test(value)) {
		callback('请输入正确的手机号')
	} else {
		callback()
	}
}

//验证是否0-100之间
export function isOneToNinetyNine(rule, value, callback) {
	const re = /^100$|^(\d|[1-9]\d)(\.\d+)*$/;
	const rsCheck = re.test(value);
	if (!rsCheck) {
		callback(new Error('请输入值为【0,100】'));
	} else {
		callback();
	}
}

// 验证非负数
export function isNonnegativeNumber(rule, value, callback) {
	const reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
	if (!reg.test(value) && value !== '') {
		callback('请输入非负数!')
	} else {
		callback()
	}
}

// 验证只能输入0-23位数字(hour小时)
export function isHour(rule, value, callback) {
	const reg = /^(2[0-3]|[0-1]?\d|\*|-|\/)$/;
	if (!reg.test(value) && value !== '') {
		callback('请输入0~23的数字!')
	} else {
		callback()
	}
}

// 验证只能输入0-59位数字（分钟/秒钟）
export function isMinute(rule, value, callback) {
	const reg = /^(?:[1-5]?\d|\*|-|\/)$/;
	if (!reg.test(value) && value !== '') {
		callback('请输入0~59的数字!')
	} else {
		callback()
	}
}

// 验证模板名称限制在40字符以内
export function restrictionName(rule, value, callback) {
	const reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]{1,40}$/;
	if (!reg.test(value)) {
		callback('模板名称限制在40字符以内')
	} else {
		callback()
	}
}

// 验证起步件数,限制100件以内
export function restrictionStarters(rule, value, callback) {
	const reg = /^[1-9][0-9]?$/;
	if (!reg.test(value)) {
		callback('起步件数,限制100件以内')
	} else {
		callback()
	}
}

// 验证加价件数必须为正数，限制在100千克以内
export function restrictionMarkups(rule, value, callback) {
	const reg = /^[1-9][0-9]?$/;
	if (!reg.test(value)) {
		callback('加价件数必须为正数，限制在100千克以内')
	} else {
		callback()
	}
}

// 验证默认起步价不能为空，必须为非负数字，限制在1000万以内
export function restrictionDefaultStartingPrice(rule, value, callback) {
	const reg = /^[1-9][0-9]{0,7}$/;
	if (!reg.test(value)) {
		callback('默认起步价不能为空，必须为非负数字，限制在1000万以内')
	} else {
		callback()
	}
}

// 验证默认加价必须为非负数字，限制在1000万以内
export function restrictionIncreasePrice(rule, value, callback) {
	const reg = /^[1-9][0-9]{0,7}$/;
	if (!reg.test(value)) {
		callback('默认加价必须为非负数字，限制在1000万以内')
	} else {
		callback()
	}
}

// 验证只能输入2位数字
export function twoNumber(rule, value, callback) {
	const reg = /^(?:[1-9]?\d|99)$/;
	if (!reg.test(value)) {
		callback('请输入2位数字')
	} else {
		callback()
	}
}

// 验证只能输入数字，支持小数点后两位
export function numberAndDot(rule, value, callback) {
	const reg = /^(\d+(?:\.\d{0,2})?)$/;
	if (!reg.test(value)) {
		callback('请输入输入数字，支持小数点后2位')
	} else {
		callback()
	}
}
//
export function validatorTime(rule, value, callback) {
	if (value === '' || value === null) {
		callback('请输入请选择交易日期')
	} else {
		callback()
	}
}

//传入的分钟数  转换成天、时、分
export function minuteToDate(minute) {
	var day = parseInt(minute / 60 / 24);
	var hour = parseInt(minute / 60 % 24);
	var min = parseInt(minute % 60);
	minute = "";
	if (day > 0) {
		minute = day + "天";
	}
	if (hour > 0) {
		minute += hour + "小时";
	}
	if (min > 0) {
		minute += parseFloat(min) + "分钟";
	}
	//三元运算符 传入的分钟数不够一分钟 默认为0分钟，else return 运算后的minute
	return minute == "" ? "0分钟" : minute;
}

// 验证正整数
export function isPositiveIntegerNumber(rule, value, callback) {
	const reg = /(^[1-9]\d*$)/;
	if (!reg.test(value)) {
		callback('请输入正整数!')
	} else {
		callback()
	}
}

// 金额
export function isAmount(rule, value, callback) {
	const reg = /^(\d+(?:\.\d{0,2})?)$/;
	if (!reg.test(value)) {
		callback('请输入金额!')
	} else {
		callback()
	}
}

//时间戳转成YYYY-MM-DD hh:mm:ss格式
export function formatDate(date, type = 'default') {
	if (!date) {
		return ''
	}

	let d = new Date(+date);
	let YY = d.getFullYear() + '-';
	let MM = (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '-';
	let DD = (d.getDate() < 10 ? '0' + (d.getDate()) : d.getDate());
	let hh = (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()) + ':';
	let mm = (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()) + ':';
	let ss = (d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds());
	const typeArr = {
		default: YY + MM + DD + " " + hh + mm + ss,
		day: YY + MM + DD
	}
	return typeArr[type]
}

// 日期格式 Thu Oct 01 2020 00:00:00 GMT+0800 (中国标准时间)转成YYYY-MM-DD hh:mm:ss格式
export function formatDateStr(date, type) {
	let dateNum = new Date(date).getTime()
	return formatDate(dateNum, type)
}

// 时间戳转成YYYY-MM-DD格式
export function formatDateDefault(date) {
	if (!date) {
		return ''
	}
	let d = new Date(date);
	let YY = d.getFullYear() + '-';
	let MM = (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '-';
	let DD = (d.getDate() < 10 ? '0' + (d.getDate()) : d.getDate());
	return YY + MM + DD;
}

// 获取上n个月
export function getLastMonth(n=0) {
	const nowDate = new Date()
	const year = nowDate.getFullYear()
	let month = nowDate.getMonth() - n
	if (month < 10) {
		month = `0${month}`
	}
	console.log(`${year}-${month}`)
	return `${year}-${month}`
}

// 金额数字前添加 ￥
export function addPrefixForAmount(amount) {
	return amount || amount === 0 ? `￥ ${amount}` : amount
}

// 获取日期的星期数, 如 2020.09.10 为 周六
export function getWeekFromTime(time) {
	const map = {
		1: '周一',
		2: '周二',
		3: '周三',
		4: '周四',
		5: '周无',
		6: '周六',
		7: '周日',
	}

	return map[new Date(time).getDay()]
}