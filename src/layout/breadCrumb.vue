<template>
	<el-breadcrumb>
		<el-breadcrumb-item v-for="item in guidePath" :key="item.path">
			{{ item.meta.title || '空' }}
		</el-breadcrumb-item>
	</el-breadcrumb>
</template>

<script>
export default {
	name: 'breadCrumb',
	data() {
		return {
			guidePath: [],
		};
	},
	watch: {
		$route: {
			handler(route) {
				this.guidePath = route.matched.map(({ path, meta }) => ({
					path,
					meta,
				}));
			},
			immediate: true,
		},
	},
};
</script>
