<template>
	<div class="guidebar">
		<breadCrumb class="bread-box" />
		<div class="operate-btns">
			<slot></slot>
		</div>
	</div>
</template>

<script>
import breadCrumb from './breadCrumb.vue';
export default {
	name: 'guideBar',
	components: {
		breadCrumb,
	},
};
</script>

<style lang="scss" scoped>
.guidebar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 32px;
	margin: 16px auto;
}
.bread-box {
	min-width: 160px;
}
.operate-btns {
	flex: 1;
	display: flex;
	justify-content: flex-end;
	align-items: center;
}
</style>
