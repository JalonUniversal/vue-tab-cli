<template>
	<div>
		<el-header class="platform-topBar">
			<img class="logo" :src="LOGO" />
			<div class="name" @click="toggleScreenFull">{{ $config.APP_NAME }}</div>
			<div class="blank">
				<template v-if="showWelcome">您好!欢迎</template>
				<template v-else>
					<div class="operation" @click.stop="openSwitchSideBarModal">切换菜单</div>
					<div class="operation" @click.stop="changePassword">修改密码</div>
					<div class="operation" @click.stop="logout">您好! 管理员, [退出]</div>
				</template>
			</div>
		</el-header>
		<!-- 修改密码对话框 -->
		<el-dialog title="修改密码" :visible.sync="changePasswordModal.show" class="changePasswordModal" width="35%" v-drag>
			<p class="tips">
				说明：<br />
				1. 密码修改之后需要重新登录一次。<br />
				2. 密码长度须为 6-12 位，可包含字母、数字和符号。且两次密码需一致。<br />
			</p>
			<el-form
				:model="changePasswordModal"
				status-icon
				:rules="rules"
				ref="password"
				label-width="100px"
				label-position="left"
				size="small"
			>
				<el-form-item label="原密码" prop="oldPassword">
					<el-input type="password" v-model="changePasswordModal.oldPassword" autocomplete="off" />
				</el-form-item>
				<el-form-item label="新密码" prop="newPassword">
					<el-input type="password" v-model="changePasswordModal.newPassword" autocomplete="off" />
				</el-form-item>
				<el-form-item label="确认密码" prop="confirmPassword">
					<el-input type="password" v-model="changePasswordModal.confirmPassword" autocomplete="off" />
				</el-form-item>
			</el-form>
			<span slot="footer">
				<el-button @click.stop="changePasswordModal.show = false">取 消</el-button>
				<el-button type="primary" @click.stop="confirmChangePassword"> 保存 </el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import LOGO from '@/assets/logo.jpeg';
import LoginManager from 'util/login';

export default {
	name: 'topBar',
	data() {
		const equalCheck = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入确认密码'));
			} else if (value !== this.changePasswordModal.newPassword) {
				callback(new Error('两次输入密码不一致!'));
			} else if (this.changePasswordModal.oldPassword === this.changePasswordModal.newPassword) {
				callback(new Error('新密码不能与旧密码一致!'));
			} else {
				callback();
			}
		};
		return {
			LOGO,
			changePasswordModal: {
				show: false,
				oldPassword: '',
				newPassword: '',
				confirmPassword: '',
			},
			rules: {
				oldPassword: [{ required: true, trigger: 'blur', message: '原密码必填' }],
				newPassword: [{ required: true, trigger: 'blur', message: '6-12位字母数字混合密码' }],
				confirmPassword: [{ validator: equalCheck, trigger: 'blur', message: '请确保确认密码与新密码一致' }],
			},
		};
	},
	computed: {
		showWelcome() {
			const { path } = this.$route;
			if (!path) return false;
			return /login/.test(path.substring(0));
		},
	},
	methods: {
		goTo(href) {
			if (!href) return;
			this.$router.history.push(href);
		},
		// 修改密码
		changePassword() {
			this.changePasswordModal.show = true;
		},
		// 修改密码确认回调
		confirmChangePassword() {
			this.$refs.password.validate((valid) => {
				if (valid) {
					console.log('submit!', valid);
					this.changePasswordModal.show = false;
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		// 切换全屏/普通状态
		toggleScreenFull() {
			window.screenfull && window.screenfull.toggle();
		},
		logout() {
			LoginManager.handleLogout();
			this.$router.history.replace('/login');
		},
		openSwitchSideBarModal() {
			this.$emit('openSwitchSideBarModal');
		},
	},
};
</script>

<style lang="scss" scoped>
::v-deep.changePasswordModal {
	.el-form-item {
		margin-bottom: 15px;
	}
}
.el-header {
	padding: 0 24px !important;
}
.platform-topBar {
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: $bg-control;
	color: $color-title;
	font-size: 12px;
	min-width: 768px;
	height: 64px;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
	z-index: 333;
}
.logo {
	display: inline-block;
	width: 60px;
	height: 32px;
	user-select: none;
}
.name {
	margin-left: 20px;
	border-left: 1px solid #333;
	font-size: 14px;
	line-height: 14px;
	color: #333;
	text-indent: 20px;
	user-select: none;
}
.operation {
	font-size: 14px;
	line-height: 14px;
	color: #333;
	border-right: 1px solid #333;
	padding-right: 20px;
	margin-right: 20px;
	user-select: none;
	cursor: pointer;
}
.operation:hover {
	color: $primary;
}
.operation:last-child {
	padding-right: 0;
	margin-right: 0;
	border-right-width: 0;
}
.blank {
	flex: 1;
	display: flex;
	justify-content: flex-end;
	align-items: center;
}
.user-name {
	color: $primary;
}
.tips {
	line-height: 22px;
	margin-bottom: 16px;
}
</style>
