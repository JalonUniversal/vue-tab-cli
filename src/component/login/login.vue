<template>
	<div class="login">
		<topBar />
		<div class="login-bg">
			<div class="loginBox">
				<div class="header" @click="showEnvSelectorClick">欢迎登录运营后台</div>
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
					<el-form-item v-if="showEnvSelector">
						<el-select v-model="currentEnv" placeholder="请选择所使用环境" class="login-input">
							<el-option
								v-for="item in ENV_OPTIONS"
								:key="item.value"
								:label="item.label"
								:value="item.value"
								:disabled="item.disabled"
							/>
						</el-select>
						<p>{{ envTips }}</p>
					</el-form-item>
					<el-form-item>
						<el-button class="submit" :type="buttonType" @click="handleLogin" :disabled="!loginForm.username">
							登录
						</el-button>
					</el-form-item>
					<el-form-item>
						<el-checkbox v-model="loginForm.save">下次自动登录</el-checkbox>
					</el-form-item>
				</el-form>
				<div class="footer">Perfect U-cong</div>
			</div>
		</div>
	</div>
</template>

<script>
import { LOGIN_RULES, ENV_OPTIONS } from './config';
import LoginManager from 'util/login';
import { mutations } from '@/store';
import { loadProductsConfig, loadServiceCompany } from '@/service';
import qs from 'querystring';

export default {
	name: 'login',
	data() {
		return {
			LOGIN_RULES,
			ENV_OPTIONS,
			showEnvSelectorCount: 0,
			envTips: '',
			currentEnv: this.$config.CURRENT_ENV,
			checked: true,
			loginForm: LoginManager.getCachedAccount(),
			loading: null,
			pwdType: 'password',
		};
	},
	computed: {
		// 环境选择器后门
		showEnvSelector() {
			return this.showEnvSelectorCount === 10;
		},
		buttonType() {
			return {
				dev: 'warning',
				test: 'success',
				uat: 'danger',
				prod: 'primary',
			}[this.currentEnv];
		},
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
		// 环境选择器后门
		showEnvSelectorClick() {
			this.showEnvSelectorCount++;
		},
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
					// this.$router.history.replace('/');
					this.requestLoginPermission();
				} else {
					// console.log('error submit!!');
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
			const { username, password } = this.loginForm;
			const form = {
				username,
				password,
				grant_type: 'password',
				auth_type: 'op',
			};

			const res = await this.$fetch({
				method: 'POST',
				url: 'login/oauth/token',
				data: qs.stringify(form),
				headers: {
					client: 'op',
					'Content-Type': 'application/x-www-form-urlencoded',
					Authorization: this.$config.DEFAULT_LOGIN_TOKEN,
				},
			});

			if (res && res.code === 200 && res.data) {
				const { access_token, refresh_token } = res.data;

				localStorage.setItem('OP_accessKey', btoa(access_token));
				mutations.updateCustomerField('access_token', access_token);
				mutations.updateCustomerField('refresh_token', refresh_token);
				loadProductsConfig();
				loadServiceCompany();

				setTimeout(() => {
					this.loading.close();
					// 跳转进首页
					this.$go('/');
					this.$message.success('登录成功, 欢迎使用油葱商城后台');
				}, 500);
			} else {
				this.loading.close();
				this.$message.error((res && res && res.data.message) || '登录失败, 请检查网络或咨询服务提供方');
			}
		},
	},
};
</script>
<style lang="scss" scoped>
.login {
	width: 100%;
	height: 100%;
	.login-bg {
		height: 640px;
		background-image: url(../../assets/login_back.jpg);
		background-size: cover;
		position: relative;
		.loginBox {
			width: 380px;
			height: 520px;
			background: $bg-control;
			box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.3);
			border-radius: 8px;
			position: absolute;
			right: 18.95%;
			top: 64px;
			overflow: hidden;
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
			.footer {
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				font-size: 14px;
				color: #666;
				height: 48px;
				line-height: 48px;
				text-align: center;
				background: #f5f5f5;
			}
		}
	}
}
</style>
