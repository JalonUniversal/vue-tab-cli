<template>
	<div class="op-editor">
		<div :ref="id" />
	</div>
</template>

<script>
import Editor from 'wangeditor';
import { generateRandomCode } from '@/util';

export default {
	name: 'editor',
	props: {
		// DOM ID
		id: {
			type: String,
			default: generateRandomCode(),
		},
		// 文本内容
		value: {
			type: String,
			default: '',
		},
		// 配置
		config: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	model: {
		prop: 'value',
		event: 'input',
	},
	data() {
		return {
			editor: null,
			isChange: false,
		};
	},
	watch: {
		value(val) {
			if (!this.isChange) {
				this.editor.txt.html(val);
			}
			this.isChange = false;
		},
		// 监听是否禁用富文本 contenteditable:ture启用false禁用
		config: {
			deep: true,
			immediate: true,
			handler(val) {
				this.$nextTick(() => {
					this.editor.$textElem.attr('contenteditable', val.contenteditable);
				});
			},
		},
	},
	methods: {
		// 监听内容变化
		listenContentChange() {
			this.editor.customConfig.onchange = (html) => {
				this.isChange = true;
				this.$emit('input', html);
			};
		},
		// 监听上传成功的图片并插入当富文本中
		uploadImgHooks() {
			this.editor.customConfig.uploadImgHooks = {
				customInsert: function (insertImg, result) {
					insertImg(result.datas.fileUrlKey);
					// result 必须是一个 JSON 格式字符串！！！否则报错
				},
			};
		},
		// 给上传路径添加请求头
		uploadImgHeaders() {
			if (this.editor.customConfig.uploadImgServer) {
				this.$nextTick(() => {
					this.editor.config.uploadImgHeaders = { Authorization: `bearer ${this.$store.access_token}` };
				});
				this.uploadImgHooks();
			}
		},
		// 清空内容
		clear() {
			this.$emit('input', '');
		},
	},
	mounted() {
		this.editor = new Editor(this.$refs[this.id]);
		this.editor.customConfig = Object.assign(this.editor.customConfig, this.config);
		this.uploadImgHeaders();
		this.listenContentChange();
		this.editor.create();
	},
};
</script>

<style lang="scss" scoped>
::v-deep.op-editor .w-e-menu {
	z-index: 103 !important;
}
::v-deep.op-editor .w-e-text-container {
	z-index: 100 !important;
}
::v-deep.op-editor .w-e-text {
	z-index: 100 !important;
}
</style>
