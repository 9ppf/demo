<template>
	<div class="total">
		<div class="header"><div class="title">移动端功能demo</div></div>
		<van-cell-group @touchend="gonext('/uploading')"><van-cell title="uploading" label="拍照并上传图片" /></van-cell-group>
		<van-cell-group @touchend="gonext('/uploading')"><van-cell title="copy" label="复制文本" /></van-cell-group>
	</div>
</template>

<script>
export default {
	name: 'home',
	data() {
		return {};
	},
	methods: {
		gonext(item) {
			this.$router.push(item);
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
