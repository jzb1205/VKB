<template>
	<div id="appendRight">
		<div class="small" @click="show=!show">在线客服>></div>
		<transition name="el-zoom-in-right">
			<div class="appendRight" v-show="show">
				<div class="big">
					<p class="title">QQ在线客服</p>
					<p>
					<a target="_blank" :href="qqUrl">
						<img src="../../assets/img/qq.gif" alt="">空包客服</a>
					</p>
					<p>
						<img src="../../assets/img/qq.gif" alt="">流量收藏客服</p>
					<p class="title">电话咨询</p>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
        qqUrl:`http://wpa.qq.com/msgrd?v=3&uin=${this.$serve.qqServe}&site=qq&menu=yes`
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url('./appendRight.less');
</style>
