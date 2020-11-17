<template>
	<div :class="['platform-sidebar', !expand && 'sidebar-shrink']" ref="dom" @mouseleave="hideMenuDelay">
		<div
			:class="['sidebar-searchbar', keyword.length && 'searchbar-focus']"
			v-show="expand"
		>
			<input
				v-model.trim="keyword"
				class="sidebar-menu-search"
				placeholder="搜索"
				v-on:input="searchMenu"
				v-on:keyup.esc="clearKeyword"
				@focus="clearSubMenu"
			/>
			<i
				class="el-icon-close sidebar-clear-button"
				@click="clearKeyword"
				v-show="keyword.length"
			/>
			<i class="el-icon-search" @click="searchMenu" />
		</div>
		<ul class="top-menu-list">
			<li
				v-for="(item, idx) in displayMenu"
				:key="idx"
				:class="[
					'sidebar-item',
					activeMenu === idx && 'active-menu',
					!expand && 'sidebar-item-shrink',
				]"
				@click="goTo(item)"
				@mouseenter="updateSubMenu(item, 'displaySubMenu', idx)"
			>
				<i class="iconfont" v-html="item.icon" />
				<span class="sidebar-item-title" v-show="expand">
					{{ item.name }}
				</span>
				<i
					class="el-icon-caret-right"
					v-show="item.children && item.children.length && activeMenu === idx"
				/>
			</li>
		</ul>
		<!-- 二级菜单 -->
    <transition name="el-fade-in">
		<ul
			:class="['sub-menu-list', !expand && 'sub-menu-list-shrink']"
			v-show="showSubMenu"
		>
			<li
				v-for="(subItem, subIdx) in displaySubMenu"
				:key="subIdx"
				:class="[
					'sidebar-item sidebar-sub-item',
					activeSubMenu === subIdx && 'active-menu',
				]"
				@click.stop="goTo(subItem)"
				@mouseenter="updateChildMenu(subItem, 'displayChildMenu', subIdx)"
			>
				<span class="sidebar-item-title">{{ subItem.name }}</span>
				<i
					class="el-icon-caret-right"
					v-if="subItem.children && subItem.children.length && activeSubMenu === subIdx"
				/>
			</li>
			<!-- 三级菜单 -->
			<ul class="child-menu-list" v-show="showChildMenu">
				<li
					v-for="(childItem, childIdx) in displayChildMenu"
					:key="childIdx"
					class="sidebar-item sidebar-childitem"
					@click.stop="goTo(childItem)"
				>
					<span class="sidebar-item-title">{{ childItem.name }}</span>
				</li>
			</ul>
		</ul>
    </transition>
		<div class="sidebar-shrink-button" @click="toggleExpand">
			<i :class="`el-icon-s-${expand ? 'fold' : 'unfold'}`" />
		</div>
	</div>
</template>

<script>
import { uniq, throttle } from 'underscore';

function merge(menu, result) {
  for(let i = 0; i < menu.length; i++) {
    result.push(menu[i]);
    if(menu[i].children && menu[i].children.length) {
      merge(menu[i].children, result);
    }
  }
  return result;
}

export default {
	name: 'sideBar',
	props: {
		menu: {
			type: Array,
			default() {
				return [];
			},
			required: true,
		},
	},
	data() {
		return {
			keyword: '',
			expand: true,
			displayMenu: [],
			displaySubMenu: [],
			displayChildMenu: [],
			menuList: this.menu,
			activeMenu: -1,
			activeSubMenu: -1,
		};
	},
	computed: {
		showSubMenu() {
			return this.displaySubMenu && this.displaySubMenu.length;
		},
		showChildMenu() {
			return this.displayChildMenu && this.displayChildMenu.length;
		},
	},
	methods: {
		// 更新展示的子级菜单
		updateSubMenu(menu, key, idx) {
			this.displayChildMenu = [];
			this[key] = menu.children || [];
			this.activeMenu = idx;
			this.activeSubMenu = -1;
		},
		// 更新展示的孙级菜单
		updateChildMenu(menu, key, idx) {
			this[key] = menu.children || [];
			this.activeSubMenu = idx;
		},
		// 清空子级/孙级菜单
		clearSubMenu() {
			this.activeMenu = this.activeSubMenu = -1;
			this.displaySubMenu = this.displayChildMenu = [];
		},
		// 延迟隐藏菜单
		hideMenuDelay() {
			setTimeout(this.clearSubMenu, 400);
    },
		// 跳转
		goTo(item) {
			if (!item || !item.href) return;
			this.clearSubMenu();
			if (item.href === this.$route.path) return;
			this.$router.push(item.href);
		},
		// 初始化菜单项
		initialMenu() {
			this.displayMenu = this.menuList;
		},
		// 清空搜索关键字
		clearKeyword() {
			this.keyword = '';
			this.initialMenu();
		},
		// 搜索菜单项
		searchMenu: throttle(function() {
			this.clearSubMenu();
			const keyword = this.keyword;
			if (keyword === '') return this.initialMenu();
			const ORIGIN_MENU = JSON.parse(JSON.stringify(this.menuList));
			const mergeSearchMenu = uniq(merge(this.menuList, ORIGIN_MENU), ({ name }) => name);
			const searchResult = mergeSearchMenu.filter(({ name }) => name.includes(keyword));
			this.displayMenu = searchResult;
		}, 200),
		// 切换展开/收缩模式
		toggleExpand() {
			this.clearSubMenu();
			this.expand = !this.expand;
		},
		// 关闭菜单栏回调
		closeSubMenu(e) {
			if (this.showSubMenu && !this.$refs.dom.contains(e.target)) {
				this.clearSubMenu();
			}
		},
		// 注册监听全局点击事件, 以关闭菜单
		initialGlobalClickListener() {
			// 点击本元素之外的区域关闭菜单
			document.addEventListener('click', this.closeSubMenu);
			this.$on('hook:destroyed', () => {
				document.removeEventListener('click', this.closeSubMenu);
			});
		},
	},
	created() {
		this.initialMenu();
		this.$nextTick(this.initialGlobalClickListener);
	},
};
</script>

<style lang="scss" scoped>
.platform-sidebar {
	position: relative;
	display: flex;
	flex-direction: column;
	width: 264px;
	min-width: 264px;
	background-color: #f2f4f9;
	transition: width 0.25s;
	z-index: 330;
}
.sidebar-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	padding: 0 24px;
	height: 40px;
	line-height: 40px;
	color: #5c626b;
	background: transparent;
	border-left: 4px solid transparent;
	cursor: pointer;
	transition: all 0.25s;
	user-select: none;
}
.active-menu {
	color: $primary;
	background-color: $bg-control;
	border-left: 4px solid $primary;
}
.sidebar-childitem {
	border-left: 4px solid transparent;
	transition: border-color 0.25s;
}
.sidebar-childitem:hover {
	color: $primary;
	background-color: $bg-control;
	border-left-color: $primary;
}
.sidebar-childitem:active {
	background-color: $bg-control;
}
.sidebar-item-title {
	flex: 1;
	text-indent: 24px;
}
.sidebar-searchbar {
  position: relative;
	width: 216px;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	padding: 0 8px 0 16px;
	outline: 1px solid $color-border;
	background-color: $bg-control;
	border-radius: 6px;
	margin: 24px auto;
	box-sizing: border-box;
	transition: box-shadow 0.4s;
}
.searchbar-focus {
	box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
}
.sidebar-menu-search {
  outline: none;
	border: none;
	width: 140px;
	height: 32px;
	font-size: 12px;
	color: #333;
	margin-right: 10px;
	caret-color: $primary;
}
.sidebar-menu-search:focus .sidebar-searchbar {
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.75);
}
.sidebar-searchbar > input::-webkit-input-placeholder {
	color: #ccc;
}
.sidebar-searchbar > input::-moz-placeholder {
	color: #ccc;
}
.sidebar-searchbar > input:-moz-placeholder {
	color: #ccc;
}
.sidebar-searchbar > input:-ms-input-placeholder {
	color: #ccc;
}
.sidebar-searchbar > i {
	cursor: pointer;
}
.top-menu-list {
	flex: 1;
	overflow-y: auto;
	font-size: 12px;
}
.sub-menu-list {
	width: 224px;
	height: 100%;
	font-size: 12px;
	position: absolute;
	top: 0;
	left: 264px;
	background: #f2f4f9;
	z-index: 166;
	padding-top: 80px;
  border-left: 2px solid $bg-control;
}
.child-menu-list {
	width: 224px;
	height: 100%;
	position: absolute;
	top: 0;
	background: #f2f4f9;
	left: 225px;
	z-index: 188;
	padding-top: 80px;
	border-left: 2px solid $bg-control;
}
.platform-layout {
	background-color: $bg-control;
}
.platform-content {
	position: absolute;
	left: 264px;
	top: 60px;
	bottom: 0;
	right: 0;
	overflow: scroll;
	padding: 10 !important;
}
.sidebar-clear-button {
	font-size: 12px;
	margin-right: 8px;
	margin-top: 2px;
	color: $color-disabled;
}
.el-icon-search {
  position: absolute;
  right: 10px;
	color: $color-disabled;
}
.sidebar-shrink-button {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 24px;
	background-color: $color-divider;
	transition: background-color 0.4s;
	cursor: pointer;
}
.sidebar-shrink-button:hover {
	background-color: #eee;
}
.sidebar-shrink {
	width: 40px;
	min-width: 40px;
}
.sidebar-item-shrink {
	justify-content: center;
	padding: 0;
	transition: color, background-color 0.25s;
}
.sidebar-item-shrink:hover {
	color: $bg-control;
	background-color: $primary;
}
.sub-menu-list-shrink {
	left: 40px;
}
</style>
