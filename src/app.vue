<template>
	<el-container direction="vertical" class="platform-container">
		<topBar @openSwitchSideBarModal="openSwitchSideBarModal" />
		<el-container direction="horizontal" class="platform-layout">
			<!-- 菜单导航栏 -->
			<sideBar v-if="sideBarType === 'sideBar'" :menu="menu" @tabChange="addTab" />
			<elSideBar v-else :menu="menu" />

			<el-main class="platform-content customer-tab">
				<el-tabs v-model="activeTab" type="card" @tab-click="clickTab" @tab-remove="removeTab">
					<el-tab-pane v-for="{ name, title, component, closable } in tabList" :key="name" :label="title" :name="name" :closable="closable">
						<keep-alive>
							<component :is="component" ref="componentalive" />
						</keep-alive>
					</el-tab-pane>
				</el-tabs>
				<div class="tab-operation-buttons">
					<div class="operation-box icon-lock" @click.stop="toggleClosable">
						<i :class="['iconfont', hasLocked ? 'el-icon-unlock' : 'el-icon-lock']" />
					</div>
					<div class="operation-box" @click.stop="refreshActiveTabPage">
						<i class="iconfont">&#xe605;</i>
					</div>
					<div class="operation-box" @click.stop="openCloseAllTabTips">
						<i class="iconfont">&#xe685;</i>
					</div>
					<div class="operation-box" @click.stop="turnToPrevTab">
						<i :class="['iconfont', matchTabIndex === 0 && 'tab-disable']">&#xe682;</i>
					</div>
					<div class="operation-box" @click.stop="turnToNextTab">
						<i :class="['iconfont', matchTabIndex === this.tabList.length - 1 && 'tab-disable']">&#xe683;</i>
					</div>
				</div>
			</el-main>
			<!-- 关闭页签对话框 -->
			<el-dialog title="提示" :visible.sync="closeTabModal" width="32%" v-drag>
				<span>确认关闭所有页签吗? 请确保所有页签的内容都处理完毕.</span>
				<span slot="footer" class="dialog-footer">
					<el-checkbox v-model="isIgnore">以后不再提示</el-checkbox>
					<span>
						<el-button @click.stop="closeTabModal = false">取 消</el-button>
						<el-button type="primary" @click.stop="confirmCloseAllTab">关闭所有页签</el-button>
					</span>
				</span>
			</el-dialog>
			<!-- 切换导航栏对话框 -->
			<el-dialog
				class="abow-dialog"
				title="选择导航菜单"
				:visible.sync="switchSideBarModal"
				width="1200px"
				v-drag
				:lock-scroll="false"
			>
				<div class="switch-side-bar-modal">
					<div
						:class="['side-bar', checkedSideBarType === 'elSideBar' && 'side-bar-selected']"
						@click="selectSideBarType('elSideBar')"
					>
						<img src="./assets/elSideBar.gif" />
						<p>折叠式菜单</p>
					</div>
					<div
						:class="['side-bar', checkedSideBarType === 'sideBar' && 'side-bar-selected']"
						@click="selectSideBarType('sideBar')"
					>
						<img src="./assets/sideBar.gif" />
						<p>弹出式菜单</p>
					</div>
				</div>
				<div slot="footer">
					<el-button @click.stop="switchSideBarModal = false">取 消</el-button>
					<el-button type="primary" @click.stop="switchSideBar">确定</el-button>
				</div>
			</el-dialog>
		</el-container>
	</el-container>
</template>

<script>
import qs from 'querystring';
import Sortable from 'sortablejs/modular/sortable.core.esm.js';
import { debounce } from 'underscore';
import CacheTabManager from 'util/tab';
import elSideBar from './layout/elSideBar';

function createTab({ title, name, path, query, component }) {
	const tab = Object.create(null);
	tab.title = title;
	tab.name = name;
	tab.path = path || '';
	tab.query = query || '';
	tab.component = component || '';
	tab.closable = true;
	return tab;
}

export default {
	data() {
		const ignoreCloseTabTips = Boolean(localStorage.getItem('OP_ignoreCloseTabTips'));
		return {
			menu: this.$config.MENU || [],
			activeTab: CacheTabManager.intialActiveTab(),
			tabList: CacheTabManager.initialTabList(),
			closeTabModal: false,
			isIgnore: ignoreCloseTabTips,
			ignoreCloseTabTips,
			switchSideBarModal: false,
			checkedSideBarType: localStorage.getItem('sideBarType') || 'sideBar',
			currentRouter: '',
		};
	},
	created() {
		addEventListener('keydown', this.enterHandler);
	},
	methods: {
		// 切换页签锁定状态
		toggleClosable() {
			this.tabList[this.matchTabIndex].closable = !this.tabList[this.matchTabIndex].closable;
		},
		enterHandler(e) {
			if (e.keyCode !== 13) return;
			if (this.matchTabIndex === -1) return;
			const enterHandler = this.$refs.componentalive[this.matchTabIndex].enter;
			if (enterHandler) enterHandler();
			const handler = this.$refs.componentalive[this.matchTabIndex].$children[1].$children[0].emitSearch;
			handler && handler();
		},
		// 拖拽初始化
		initialDrag() {
			const el = document.querySelector('.el-tabs__nav');
			Sortable.create(el, {
				handle: '.is-active',
				onEnd: ({ newIndex, oldIndex }) => {
					// oldIIndex拖放前的位置， newIndex拖放后的位置
					const currRow = this.tabList.splice(oldIndex, 1)[0];
					this.tabList.splice(newIndex, 0, currRow);
				},
			});
		},
		// 新增页签
		addTab(props) {
			const { name: title, href, query, component } = props;
			// 查询字符串拼接
			const querystring = query && Object.keys(query).length ? `?${qs.stringify(query)}` : '';
			// 以完整 path 作为 页签 name, 便于唯一性识别
			const name = href + querystring;
			// 判断页签是否打开
			const openedTab = this.tabList.find((tab) => tab.name === name);
			if (openedTab) {
				return (this.activeTab = openedTab.name);
			}
			// 若未打开 则新建页签
			const addTabItem = createTab({
				title: query.title || title, // 优先使用 query 中的 title
				name,
				idx: this.tabList.length,
				href,
				query: querystring,
				component,
			});
			this.tabList.push(addTabItem);
			this.activeTab = addTabItem.name;
		},
		// 移除标签页
		removeTab(targetName) {
			if (!targetName) return;
			const tabs = this.tabList;
			let activeName = this.activeTab;

			if (activeName === targetName) {
				tabs.forEach((tab, index) => {
					if (tab.name === targetName) {
						let nextTab = tabs[index + 1] || tabs[index - 1];
						if (nextTab) {
							activeName = nextTab.name;
						}
					}
				});
			}
			this.activeTab = activeName;
			this.tabList = tabs.filter((tab) => tab.name !== targetName);
			if (!this.tabList.length) {
				this.$router.history.replace('/');
			} else {
				this.$router.history.push(activeName);
			}
		},
		// 刷新激活页签所对应的页面组件
		refreshActiveTabPage() {
			const { tabList, matchTabIndex } = this;
			// 获取打开的页签组件配置
			const origin = tabList.splice(matchTabIndex, 1)[0];
			requestAnimationFrame(() => {
				tabList.splice(matchTabIndex, 0, origin);
			});
		},
		// 打开关闭所有页签询问对话框
		openCloseAllTabTips() {
			if (!this.ignoreCloseTabTips) {
				return (this.closeTabModal = true);
			} else {
				this.closeAllTab();
			}
		},
		// 关闭所有页签21
		closeAllTab() {
			this.activeTab = '';
			this.tabList = [];
			this.$router.history.replace('/');
		},
		// 确认关闭所有页签
		confirmCloseAllTab() {
			this.closeTabModal = false;
			this.closeAllTab();
			this.$nextTick(() => {
				if (this.isIgnore) {
					localStorage.setItem('OP_ignoreCloseTabTips', Number(this.isIgnore));
					this.ignoreCloseTabTips = Boolean(localStorage.getItem('OP_ignoreCloseTabTips'));
				}
			});
		},
		// 后退
		turnToPrevTab() {
			let matchIndex = this.matchTabIndex;
			if (matchIndex === 0) return;
			matchIndex -= 1;
			const name = this.tabList[matchIndex]['name'];
			this.$router.history.push(name);
		},
		// 前进
		turnToNextTab() {
			let matchIndex = this.matchTabIndex;
			if (matchIndex === this.tabList.length - 1) return;
			matchIndex += 1;
			const name = this.tabList[matchIndex]['name'];
			this.$router.history.push(name);
		},
		// 点击选项卡
		clickTab({ name }) {
			this.$router.history.push(name);
		},
		// 刷新页面回调
		refreshPageHanlder(event) {
			event.returnValue = '';
			CacheTabManager.syncTabToStorage();
		},
		// 监听页面刷新事件
		listenPageRefresh() {
			window.addEventListener('beforeunload', this.refreshPageHanlder);
			this.$on('hook:beforeDestroy', () => {
				window.removeEventListener('beforeunload', this.refreshPageHanlder);
				CacheTabManager.clearCachedTabList();
			});
		},
		// 选择菜单导航
		selectSideBarType(type) {
			this.checkedSideBarType = type;
		},
		// 打开切换菜单导航 Dialog
		openSwitchSideBarModal() {
			this.switchSideBarModal = true;
		},
		// 切换菜单导航
		switchSideBar() {
			if (!this.checkedSideBarType) {
				this.$message.error('请选择菜单导航!');
			} else {
				const sideBarType = localStorage.getItem('sideBarType');
				if (sideBarType === this.checkedSideBarType) {
					this.switchSideBarModal = false;
					return;
				} else {
					localStorage.setItem('sideBarType', this.checkedSideBarType);
					this.switchSideBarModal = false;
					window.location.reload(false);
				}
			}
		},
	},
	computed: {
		matchTabIndex() {
			return this.tabList.findIndex(({ name }) => name === this.activeTab);
		},
		sideBarType() {
			// sideBarType 有两个, sideBar、elSideBar 默认为 sideBar
			const type = localStorage.getItem('sideBarType');
			return type || 'elSideBar';
		},
		hasLocked() {
			if (/undefined|-1/.test(this.matchTabIndex)) return false;
			return this.tabList[this.matchTabIndex].closable;
		},
	},
	watch: {
		$route: {
			handler(route) {
				if (!route.matched || !route.matched.length) return;
				const { query, matched } = route;
				const {
					path: href,
					meta: { title: name },
					components: {
						default: { name: component },
					},
				} = matched[matched.length - 1];
				if (!href || href === '/') return;
				this.addTab({ href, query, name, component });
				this.currentRouter = href;
			},
			immediate: true,
		},
		activeTab: {
			handler: debounce(function (activeTab) {
				CacheTabManager.cacheActiveTab(activeTab);
			}, 1200),
		},
		tabList: {
			handler: debounce(function (tabList) {
				CacheTabManager.cacheTabList(tabList);
			}, 1200),
		},
	},
	mounted() {
		this.$listen('CLOSE_TAB', this.removeTab);
		this.$nextTick(this.initialDrag);
		this.listenPageRefresh();
	},
	components: { elSideBar },
	beforeDestroy() {
		removeEventListener('keydown', this.enterHandler);
	},
};
</script>

<style lang="scss" scoped>
.platform-container {
	height: 100%;
	overflow: hidden;
}
.platform-topBar {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	background-color: #3883f8;
	color: $bg-control;
	font-size: 14px;
	line-height: 60px;
}
.user-name {
	color: $primary;
}
.platform-content {
	position: relative;
}
.platform-layout {
	height: calc(100% - 60px);
}
.tab-operation-buttons {
	position: absolute;
	top: 0;
	right: 24px;
	height: 50px;
	display: flex;
	justify-content: space-around;
	align-items: center;
	background-color: transparent;
}
.tab-operation-buttons i {
	font-size: 14px;
	color: #909399 !important;
}
.tab-operation-buttons .operation-box {
	width: 48px;
	height: 48px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	box-shadow: 0 -1px 0 1px rgba(230, 234, 239, 1);
	margin-right: 1px;
	transition: background-color 0.3s;
}
.tab-operation-buttons .operation-box:active {
	background-color: $bg-control;
}
.tab-disable {
	cursor: not-allowed;
}
.dialog-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.switch-side-bar-modal {
	display: flex;
	justify-content: space-around;
	.abow-dialog {
		overflow: scroll;
	}
	.side-bar {
		border: 2px solid transparent;
		border-radius: 4px;
		box-shadow: 0 0 12px rgba(0, 0, 0, 0.35);
		cursor: pointer;
		transition: border 0.4s;
	}
	.side-bar-selected {
		border: 2px solid $primary;
	}
	p {
		padding: 15px 0;
		text-align: center;
	}
	img {
		width: 500px;
		height: 340px;
	}
}
</style>
