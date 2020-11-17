import { store } from '@/store';
import cityJson from 'config/city';
import qs from 'querystring';
import Vue from 'vue';
import CONFIG from '../config/index.js';
const { HOST_MAP, PROTOCOL } = CONFIG;

// 配置选项生成器
const optionGenerator = (optionMap, keyType = 'number') => Object.entries(optionMap).map(([value, label]) => ({ value: keyType === 'number' ? Number(value) : String(value), label }));
// 搜索配置生成器
const searchConfigGenerator = searchConfig => {
	const searchData = {};
	if (!searchConfig || !searchConfig.form || !searchConfig.form.length) return {};
	searchConfig.form.forEach(({ key, value }) => {
		// searchData[key] = value;
		searchData[key] = Array.isArray(value) ? value.join(',') : value;
	});
	return searchData;
}
// 指定日期区间生成方法 (datePicker pickerOptions.shortcuts 使用)
const dateRangePickerGenerator = (text, dayCount) => {
	return {
		text,
		onClick(picker) {
			const end = new Date();
			const start = new Date();
			start.setTime(start.getTime() - 3600 * 1000 * 24 * dayCount);
			picker.$emit('pick', [start, end]);
		}
	}
}
// 导出 Excel 文件
const exportExcel = (path, params) => {
	const CURRENT_ENV = localStorage.getItem('env') || 'prod';
	// 通过 localStorage 识别环境
	// 正式上线版本
	const { access_token: authtoken } = store

	const resolveUrl = `${PROTOCOL}://${HOST_MAP[CURRENT_ENV]}${path}?${qs.stringify(params ? { ...params, authtoken } : { authtoken })}`;
	window.open(resolveUrl, '_blank');
}

// 构造时间字符串 YYYY-MM-DD
const genDateStr = (date) => {
	if (!date) return '';
	const D = new Date(date);
	const year = D.getFullYear();
	const month = D.getMonth() + 1;
	const day = D.getDate();
	const padZero = (number) => String(number).padStart(2, '0');
	return `${year}-${padZero(month)}-${padZero(day)}`;
}

// 生成本月第一天和最后一天
const genCurrentMonthFirstAndLastDay = (type = 'timestamp') => {
	const date = new Date();
	const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
	const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
	const range = [firstDay, lastDay];
	if (type === 'timestamp') {
		return range.map(item => new Date(item).getTime())
	} else if (/iso|json/.test(type)) {
		return range.map(item => JSON.stringify(item))
	} else if (/str|string/.test(type)) {
		return range.map(item => genDateStr(item))
	}
	return range;
}

// 导出 Excel 文件（POST请求流文件）
const exportExcelPost = async (url, data, title = "Excel数据表") => {
	const { $fetch, $confirm } = Vue.prototype;
	const res = await $fetch({
		method: 'POST',
		url: url,
		data,
		responseType: 'blob',
	});
	if (res && res.data) {
		const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
		const objectUrl = URL.createObjectURL(blob);
		const a = document.createElement('a');
		document.body.appendChild(a);
		a.style.display = 'none';
		a.href = objectUrl;
		a.download = title;
		a.click();
		document.body.removeChild(a);
	} else {
		$confirm('操作失败', '提示');
	}
}

const getStringFromAddressCode = ({ province, city, district, town }) => {
	if (province) {
		const provinceObj = cityJson.filter(item => item.c === province).pop()
		const cityObj = provinceObj.r.filter(item => item.c === city).pop()
		const districtObj = cityObj.r.filter(item => item.c === district).pop()
		const townObj = districtObj.r.filter(item => item.c === town).pop()
		return `${provinceObj.n}${cityObj.n}${districtObj.n}${townObj.n}`
	} else {
		return ''
	}
}

// 生成随机字符串(随机字母)
function generateRandomCode(count = 6) {
	let ret = [];
	for (let i = 0; i < count; i++) {
		const randomNum = Math.ceil(Math.random() * 25);
		ret.push(String.fromCharCode(65 + randomNum));
	}
	return ret.join('');
}

// 选择器选项转为键值对映射
const selectOptionsToMap = (options) => {
	return options.reduce((pre, val) => {
		const { value, label } = val
		if (value === null) {
			return pre
		} else {
			const key = typeof value === 'number' ? Number(value) : value
			return { ...pre, [key]: label }
		}
	}, {})
}

export {
	optionGenerator,
	searchConfigGenerator,
	dateRangePickerGenerator,
	exportExcel,
	genCurrentMonthFirstAndLastDay,
	exportExcelPost,
	getStringFromAddressCode,
	generateRandomCode,
	selectOptionsToMap,
};

