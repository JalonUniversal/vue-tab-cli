<template>
	<div class="edit-footer">
		<slot />
	</div>
</template>

<script>
export default {
	name: 'actionBar',
};
</script>

<style lang="scss" scoped>
.edit-footer {
	padding: 16px 38px;
	box-shadow: 0px -2px 6px 0px rgba(0, 0, 0, 0.1);
	position: fixed;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	bottom: 0;
	left: 0;
	box-sizing: border-box;
	background-color: $bg-cornt;
	right: 0;
	z-index: 120;
}
</style>
