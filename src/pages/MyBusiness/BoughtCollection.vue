<template>
	<div id="BoughtCollection">
		<p class="title">收藏购买记录</p>
		<div class="notice">
			<div class="one">
				<p>宝贝收藏：增加产品宝贝收藏量。</p>
				<p>收藏店铺：收藏店铺增加手机粉丝。</p>
				<p>购物车：增加产品买家加入购物车数量。</p>
				<p>天猫品牌关注：增加品牌关注度。</p>
				<p>京东宝贝关注/店铺关注：增加宝贝关注数，店铺收藏关注人数。</p>
			</div>
			<div class="two">
				<p>
					着重提醒：手机千牛上显示的数据“今日被收藏宝贝”“今 日被加购宝贝”，这个数据是指店铺宝贝被收藏加购的款数，而不是收藏加购的次数。
				</p>
			</div>
			<div class="three">
				<p>例如：您买了100个收藏，填写了2款宝贝，在手机千牛上只会显示“今日店铺被收藏宝贝”数字为2，而不是100。</p>
				<p>正确查看方式1：在电脑上，直接看宝贝主图左下角的收藏总数</p>
				<p>正确查看方式2：打开生意参谋→商品效果→商品概况。</p>
			</div>
		</div>
		<div class="list">
			<ul class="tabar">
				<li v-for="it in typeList" :key="it.type" @click="getCurType(it.type)" :class="{'active':curType == it.type}">{{it.name}}</li>
			</ul>
			<div class="listA">
				<ul>
					<li v-for="(item,i) in tableData" :key="i">
						<p>套餐名称：{{item.storeName}}</p>
						<p>订单编号：{{item.orderNo}}</p>
						<p>店铺名称：{{item.storeName}}</p>
						<p>商品ID：{{item.url}}</p>
						<p>订单状态：{{item.tsoOrderStatus | timerFormat}}</p>
						<p class="red">购买金额：{{item.price}}，购买时间：{{item.tsoOrderStatus | timerFormat}}</p>
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
				total: 0,
				pageSize: 5,
				pageNum: 0,
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
				tableData: [],
				curType: 1
			}
		},
		created() {
			this.getCollectionOrderPage();
		},
		filters: {
			timerFormat(vaule) {
				return Moment(vaule).format("YYYY-MM-DD HH:MM:SS");
			}
		},
		methods: {
			getCurType(val) {
				this.curType = val;
				this.getCollectionOrderPage();
			},
			handleSizeChange(val) {
				this.pageSize = val;
				this.getCollectionOrderPage();
			},
			handleCurrentChange(val) {
				this.pageNum = val;
				this.getCollectionOrderPage();
			},
			//获取平台收藏类型
			getCollectionOrderPage() {
				this.$http.post(this.$API.getCollectionOrderPage, {
						userId: localStorage.getItem('userId'),
						status: this.curType,
						pageNumber: this.pageNum,
						pageSize: this.pageSize
					})
					.then((res) => {
						if (res.success == true) {
							this.tableData = res.data.listData;
							this.total = res.data.totalNumber;
						} else {
							this.$message({
								message: res.message,
								type: 'error'
							});
						}
					})
			},
		}
	}
</script>

<style lang='less' scoped>
	@import url('./BoughtCollection.less');
</style>
