<template>
	<div :style="collapse ? 'minWidth: 46px;' : 'minWidth: 220px'" class="el-side-bar">
		<div class="el-sidebar-shrink-button" @click="toggleExpand">
			<i :class="`el-icon-s-${collapse ? 'fold' : 'unfold'}`" />
		</div>
		<el-menu
			:class="collapse ? 'shrink-menu' : 'expand-menu'"
			v-for="(levelOneMenu, levelOneIndex) in menu"
			:key="levelOneIndex"
			:collapse="collapse"
			:collapse-transition="false"
			:unique-opened="true"
		>
			<!-- 一级菜单有展开项 -->
			<template v-if="levelOneMenu.children">
				<el-submenu :index="`${levelOneIndex}`">
					<!-- 一级菜单标题 -->
					<template slot="title">
						<i class="iconfont" v-html="levelOneMenu.icon" />
						<span>{{ levelOneMenu.name }}</span>
					</template>
					<div
						v-for="(levelTwoMenu, levelTwoIndex) in levelOneMenu.children"
						:key="`${levelOneIndex}-${levelTwoIndex}`"
						:index="`${levelOneIndex}-${levelTwoIndex}`"
					>
						<!-- 二级菜单有展开项 -->
						<template v-if="levelTwoMenu.children">
							<el-submenu :index="`${levelOneIndex}-${levelTwoIndex}`">
								<!-- 二级菜单标题 -->
								<template slot="title">
									<span>{{ levelTwoMenu.name }}</span>
								</template>
								<div
									v-for="(levelThreeMenu, levelThreeIndex) in levelTwoMenu.children"
									:key="`${levelOneIndex}-${levelTwoIndex}-${levelThreeIndex}`"
									:index="`${levelOneIndex}-${levelTwoIndex}`"
								>
									<!-- 三级菜单 -->
									<el-menu-item @click="goTo({ name: levelThreeMenu.name, href: levelThreeMenu.href })">
										{{ levelThreeMenu.name }}
									</el-menu-item>
								</div>
							</el-submenu>
						</template>
						<!-- 二级菜单无展开项 -->
						<el-menu-item v-else @click="goTo({ name: levelTwoMenu.name, href: levelTwoMenu.href })">
							<i class="iconfont" v-html="levelTwoMenu.icon" />
							{{ levelTwoMenu.name }}
						</el-menu-item>
					</div>
				</el-submenu>
			</template>

			<!-- 一级菜单无展开项 -->
			<el-menu-item v-else>
				<i class="iconfont" v-html="levelOneMenu.icon" />
				{{ levelOneMenu.name }}
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
export default {
	name: 'elSideBar',
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
			collapse: false,
		};
	},
	methods: {
		goTo(item) {
			if (!item || !item.href) return;
			if (item.href === this.$route.path) return;
			this.$router.push(item.href);
		},
		toggleExpand() {
			this.collapse = !this.collapse;
		},
	},
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
	display: none;
}
.el-side-bar {
	overflow: scroll;

	.expand-menu {
		min-width: 220px;
	}
	.shrink-menu {
		min-width: 0;
	}
	.iconfont + span {
		padding-left: 20px;
	}

	.el-sidebar-shrink-button {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 24px;
		background-color: $color-divider;
		transition: background-color 0.4s;
		cursor: pointer;
	}
	.el-sidebar-shrink-button:hover {
		background-color: #eee;
	}
	.el-menu-item.is-active {
		color: #232426;
	}
}
</style>
