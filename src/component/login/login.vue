<template>
	<div class="login">
		<div class="loginBox">
			<div class="header">欢迎登录</div>
			<el-form class="login-form" ref="loginForm" :rules="LOGIN_RULES" :model="loginForm" label-width="20px">
				<el-form-item>
					<span>登录</span>
				</el-form-item>
				<el-form-item>
					<el-input
						class="login-input"
						prop="username"
						autocomplete="on"
						placeholder="账号"
						v-model="loginForm.username"
					/>
				</el-form-item>
				<el-form-item>
					<el-input
						prop="password"
						class="login-input"
						autocomplete="on"
						:type="pwdType"
						placeholder="密码"
						v-model="loginForm.password"
					>
						<i @click="togglePasswordShow" slot="suffix" class="el-input__icon el-icon-view" />
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-button class="submit" type="success" @click="handleLogin" :disabled="!loginForm.username">
						登录
					</el-button>
				</el-form-item>
				<el-form-item>
					<el-checkbox v-model="loginForm.save">下次自动登录</el-checkbox>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import { LOGIN_RULES, ENV_OPTIONS } from './config';
import LoginManager from 'util/login';

export default {
	name: 'login',
	data() {
		return {
			LOGIN_RULES,
			ENV_OPTIONS,
			envTips: '',
			currentEnv: this.$config.CURRENT_ENV,
			checked: true,
			loginForm: LoginManager.getCachedAccount(),
			loading: null,
			pwdType: 'password',
		};
	},
	watch: {
		currentEnv: {
			immediate: true,
			handler(env) {
				this.envTips = LoginManager.changeHost(env);
				localStorage.setItem('env', env);
			},
		},
	},
	methods: {
		// 切换密码显隐
		togglePasswordShow() {
			this.pwdType = this.pwdType === 'password' ? '' : 'password';
		},
		// 登录
		handleLogin() {
			this.$refs.loginForm.validate((valid) => {
				if (valid) {
					// 登录
					LoginManager.handleLogin();
					LoginManager.saveAccount(this.loginForm);
					this.requestLoginPermission();
				} else {
					return false;
				}
			});
		},
		// 使用会员卡登录
		async requestLoginPermission() {
			this.loading = this.$loading({
				lock: true,
				text: '配置加载中, 请稍候...',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.7)',
			});

			setTimeout(() => {
				this.loading.close();
				// 跳转进首页
				this.$go('/');
				this.$message.success('登录成功, 欢迎使用 vue-tab-cli');
			}, 500);
		},
	},
};
</script>
<style lang="scss" scoped>
.login {
	width: 100%;
	height: 100%;
	background-color: #eee;
	.loginBox {
		width: 380px;
		height: 400px;
		background: $bg-control;
		border-radius: 2px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		overflow: hidden;
		transition: all 0.4s;
		&:hover {
			box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.15);
		}
		.login-input {
			width: 336px;
		}
		.header {
			font-size: 16px;
			font-weight: 500;
			color: rgba(48, 51, 54, 1);
			line-height: 24px;
			border-bottom: 1px #d9d9d9 solid;
			width: 100%;
			text-align: center;
			padding: 16px 0;
		}
		.login-form {
			.submit {
				width: 336px;
				height: 40px;
			}
		}
	}
}
</style>
