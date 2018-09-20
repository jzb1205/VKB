<template>
	<div id="AccountRecharge">
		<div class="title_bar">
			<ul class="tabar">
				<li>支付宝、微信充值</li>
			</ul>
		</div>
		<p class="title">24小时全自动充值实时到账，必须完成以下两个步骤！</p>
		<div class="step">
			<p class="title">请选择以下方式进行自动充值，无需联系客服自动到账！</p>
			<p class="money">
				充值金额：
				<el-input v-model="rechargeMoney" class="input_select" placeholder="请输入金额"></el-input>
				元
				<span>*</span>最低充值
				<span>5</span>元
				<img src="../../assets/img/payImg.jpg" alt="">
			</p>
		</div>
		<div class="stepT">
			<p>当前帐号余额：
				<span>0.00</span>元 </p>
			<p>充值如遇到问题，请联系客服！</p>
			<img src="../../assets/img/rechargeBook.jpg" alt="">
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				rechargeMoney: 0
			}
		},
		methods: {
			handleSizeChange(val) {
				this.pageSize = val;
			},
			handleCurrentChange(val) {
				this.pageNum = val;
			},
			downLoad() {
				if (!this.time) {
					this.$message({
						message: '请选择起始时间和截止时间',
						type: 'warning'
					});
					return;
				}
				this.addAddr = true;
			}
		}
	}
</script>

<style lang='less' scoped>
	@import url('./AccountRecharge.less');
</style>
