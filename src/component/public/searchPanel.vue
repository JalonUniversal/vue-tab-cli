<template>
	<div class="search-header">
		<el-form
			:inline="true"
			:model="formData"
			:rules="formRules"
			ref="formRef"
			label-width="160px"
			label-suffix=":"
			@submit.native.prevent
		>
			<el-row :gutter="24">
				<el-col :span="8" v-for="(item, idx) in config" :key="idx" v-show="expand ? true : item.showForever">
					<el-form-item :label="item.label" class="search-header-item" :prop="item.key">
						<!-- 输入框 -->
						<template v-if="item.type === 'input'">
							<el-input
								v-model="formData[item.key]"
								:placeholder="item.placeholder"
								:maxlength="item.maxlength"
								size="medium"
								:disabled="item.disabled || false"
								clearable
							/>
						</template>
						<!-- 下拉框 -->
						<template v-else-if="item.type === 'select'">
							<el-select v-model="formData[item.key]" :placeholder="item.placeholder" size="medium" clearable>
								<el-option
									v-for="(option, idx) in item.options"
									:key="idx"
									:value="option.value"
									:label="option.label"
								/>
							</el-select>
						</template>
						<!-- 日期选择器 -->
						<template v-else-if="item.type === 'datePicker'">
							<el-date-picker
								:type="item.config.type"
								v-model="formData[item.key]"
								:placeholder="item.config.placeholder"
								:range-separator="'~' || item.config.rangeSeparator"
								:start-placeholder="'开始日期' || item.config.startPlaceholder"
								:end-placeholder="'结束日期' || item.config.endPlaceholder"
								:picker-options="item.config.pickerOptions || defaultPickerOptions"
								size="medium"
								:value-format="item.config.valueFormat || 'timestamp'"
								:default-time="item.config.defaultTime"
								@input="handleDateRangeUpdate($event, formData, item.key)"
								clearable
							/>
						</template>
					</el-form-item>
				</el-col>
			</el-row>
			<!-- 按钮 -->
			<el-row type="flex" justify="end" align="middle">
				<el-button type="primary" icon="el-icon-search" @click="emitSearch" class="search-button"> 搜索 </el-button>
				<el-button icon="el-icon-refresh-right" @click="emitReset" class="search-button" v-if="showReset">
					重置
				</el-button>
				<template v-if="showExpand">
					<el-button icon="el-icon-top" @click="expand = false" class="search-button" v-if="expand">收起</el-button>
					<el-button icon="el-icon-bottom" @click="expand = true" class="search-button" v-else>展开</el-button>
				</template>
			</el-row>
		</el-form>
	</div>
</template>

<script>
import { store } from '@/store';
import { dateRangePickerGenerator } from 'util';
import { throttle } from 'underscore';

export default {
	name: 'searchPanel',
	props: {
		// 查询配置项
		config: {
			type: Array,
			default: () => {},
		},
		// 表单验证规则
		rules: {
			type: Object,
			default: () => {},
		},
		// 是否显示重置按钮
		showReset: {
			type: Boolean,
			default: true,
		},
		// 是否显示 展开/收起 按钮
		showExpand: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			expand: !this.showExpand,
			formData: {}, // 搜索字段
			formRules: {}, // 表达校验
			// 默认的快捷时间范围选择
			defaultPickerOptions: {
				shortcuts: [
					dateRangePickerGenerator('最近一周', 7),
					dateRangePickerGenerator('最近一个月', 30),
					dateRangePickerGenerator('最近三个月', 90),
					dateRangePickerGenerator('最近半年', 180),
					dateRangePickerGenerator('最近一年', 365),
				],
			},
		};
	},
	created() {
		this.initFormData();
	},
	watch: {
		formData: {
			deep: true,
			immediate: true,
			handler(newVal) {
				this.$emit('input', newVal);
			},
		},
	},
	methods: {
		// 初始化数据
		initFormData() {
			let [...dataArr] = this.config || [];
			let obj = {};
			dataArr.forEach((item) => {
				if (item.type === 'select' && item.bindKey) {
					item.options = store[item.bindKey];
				} else {
					obj[item.key] = item.value || null;
				}
			});
			this.formData = Object.assign({}, obj);
			this.formRules = this.rules || {};
		},
		// 查询
		emitSearch: throttle(function () {
			this.$refs['formRef'].validate((valid) => {
				if (valid) {
					this.$emit('search', Object.assign({}, this.formData));
					return true;
				} else {
					return false;
				}
			});
		}, 500),
		// 清空
		emitReset() {
			this.initFormData();
			this.$refs.formRef && this.$refs.formRef.resetFields();
		},
		// 日期范围选择清空回调 [修正 element datePicker 控件日期清空时,不回显问题]
		handleDateRangeUpdate(value, formData, key) {
			this.$nextTick(() => {
				if (value === null) {
					formData[key] = [undefined, undefined];
				} else {
					formData[key] = value;
				}
			});
		},
	},
};
</script>
<style lang="scss">
.search-header {
	padding-top: 5px;
	.search-header-item.el-form-item {
		width: 100%;
		display: flex;
		flex: auto;
		margin-bottom: 26px;
		.el-form-item__content,
		.el-input,
		.el-select,
		.el-date-editor {
			width: 100%;
		}
	}
}
</style>
