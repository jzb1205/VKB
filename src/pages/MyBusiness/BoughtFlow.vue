<template>
	<div id="BoughtFlow">
		<p class="title">流量购买记录</p>
		<div class="notice">
			<p>购买流量以后的订单有四个状态：等待处理、处理中、处理完成、已取消。</p>
			<p>等待处理：购买以后就是这个状态的，等待我们的专业客服进行处理。</p>
			<p>处理完成：您所购买的套餐我们已经帮您完成了。</p>
			<p>处理中：证明我们已经在帮您开始操作了。</p>
			<p>已取消：一般是顾客要求退款，或填写有误。这个状态的钱是自动退款给您的。</p>
			<p class="ts">提醒：在套餐服务的时间内可以随时联系客服进行更换关键词或宝贝链接修改。</p>
		</div>
		<div class="list">
			<ul class="tabar">
				<li v-for="it in typeList" :key="it.type" @click="getCurType(it.type)" :class="{'active':curType == it.type}">{{it.name}}</li>
			</ul>
			<div class="listA">
				<ul>
					<li v-for="(it,i) in tableData" :key="i">
						<p>套餐名称：{{it.packageName}}</p>
						<!-- （电脑端100搜索流量*1天） PACKAGE_NAME-->
						<p>订单编号：{{it.orderNo}}</p>
						<!-- 0005981808311025089107 -->
						<p>店铺名称：{{it.storeName}}</p>
						<!--  阿叶手办 STORE_NAME-->
						<p>商品ID：{{it.url}}</p>
						<p>订单状态：{{it.tsoOrderStatus | orderStatusCn(it.tsoOrderStatus)}}</p>
						<!-- TSO_ORDER_STATUS -->
						<p class="red">购买金额：{{it.price}}，购买时间：{{it.createTime | timerFormat}}</p>
					</li>
				</ul>
			</div>
			<div class="page">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="[5, 10, 15, 20]"
				    :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	import Moment from "moment";
	export default {
		data() {
			return {
				tableData: [],
				total: 0,
				pageSize: 5,
				pageNum: 1,
				typeList: [{
						type: '1',
						name: '等待处理'
					},
					{
						type: '2',
						name: '进行处理'
					},
					{
						type: '3',
						name: '完成处理'
					},
					{
						type: '0',
						name: '取消任务'
					}
				],
				curType: 1

			}
		},
		methods: {
			getCurType(val) {
				this.curType = val;
				this.getTrafficOrderPage();
			},
			handleSizeChange(val) {
				this.pageSize = val;
				this.getTrafficOrderPage();
			},
			handleCurrentChange(val) {
				this.pageNum = val;
				this.getTrafficOrderPage();
			},
			getTrafficOrderPage() {
				this.$http.post(this.$API.getTrafficOrderPage, {
					userId: localStorage.getItem("userId"),
					status: this.curType,
					pageNumber: this.pageNum,
					pageSize: this.pageSize
				}).then((res) => {
					if (res.success) {
						this.tableData = res.data.listData;
						this.total = res.data.totalNumber;
						//this.pageNum= res.data.pageNumber;
						//this.pageSize=res.data.pageSize;

					} else {
						this.$message({
							type: 'error',
							message: res.message

						})


					}




				})
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
		},
		created() {
			this.getTrafficOrderPage();
		},
		filters: {
			timerFormat(vaule) {
				return Moment(vaule).format("YYYY-MM-DD");
			},
			orderStatusCn(vaule) {
				if (vaule == 0) {
					return '取消任务';
				} else if (vaule == 1) {
					return '等待处理';
				} else if (vaule == 2) {
					return '处理中';
				} else if (vaule == 3) {
					return '已完成';
				}

			}

		}


	}
</script>

<style lang='less' scoped>
	@import url('./BoughtFlow.less');
</style>
