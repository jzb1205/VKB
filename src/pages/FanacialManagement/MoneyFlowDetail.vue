<template>
	<div id="MoneyFlowDetail">
		<p class="title">消费记录</p>
		<div class="list">
			<div class="search">
				消费时间：
				<el-date-picker v-model="time" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00']">
				</el-date-picker>
				消费类型：
				<el-select v-model="costType" placeholder="请选择" class="s_select" v-if="options && options.length>0">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-button type="primary" @click="getAccountFlowPage">查询</el-button>
			</div>
			<div class="tab">
				<el-table :data="tableData" style="width: 100%">
					<el-table-column prop="content" label="消费内容" width="170" align='center' cen>
					</el-table-column>
					<el-table-column prop="type" label="类型" align='center' width="180">
						<template slot-scope="scope">{{scope.row.type | costType(scope.row.type)}}</template>
					</el-table-column>
					<el-table-column prop="cost" width="150" align='center' label="金额">
					</el-table-column>
					<el-table-column prop="balance" width="140" align='center' label="余额">
					</el-table-column>
					<el-table-column prop="createTime" width="180" align='center' label="时间">
						<template slot-scope="scope">{{scope.row.createTime | timerFormat(scope.row.createTime)}}</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="page">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNumber" :page-sizes="[5, 10, 15, 20]"
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
				pageNumber: 1,
				costType: '',
				time: '',
				startDate: '',
				endDate: '',
				tableData: [

				],
				options: [{
						value: '',
						label: '全部'
					},
					{
						value: '1',
						label: '充值'
					}, {
						value: '2',
						label: '购买空包'
					}, {
						value: '3',
						label: '升级VIP'
					}, {
						value: '4',
						label: '升级代理'
					}, {
						value: '5',
						label: '奖励'
					}, {
						value: '6',
						label: '退款'
					}, {
						value: '7',
						label: "官方"
					}
				]

			}
		},
		methods: {
			handleSizeChange(val) {
				this.pageSize = val;
			},
			handleCurrentChange(val) {
				this.pageNum = val;
			},

			getAccountFlowPage() {
				if (this.time && this.time.length > 0) {
					this.startDate = this.time[0];
					this.endDate = this.time[1]
				} else {
					this.startDate = null;
					this.endDate = null;
				}
				this.$http.post(this.$API.getAccountFlowPage, {
					userId: localStorage.getItem("userId"),
					pageSize: this.pageSize,
					pageNumber: this.pageNumber,
					startTime: this.startDate,
					endTime: this.endDate,
					type: this.costType

				}).then((res) => {
					if (res.success) {
						this.tableData = res.data.listData;
						this.total = res.data.totalNumber
					} else {
						this.$message({
							type: error,
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
			this.getAccountFlowPage();
		},
		filters: {
			timerFormat(vaule) {
				return Moment(vaule).format("YYYY-MM-DD");
			},
			costType(value) {
				if (value == 1) {
					return '充值'
				} else if (value == 2) {
					return '购买空包'
				} else if (value == 3) {
					return '升级VIP'
				} else if (value == 4) {
					return '升级代理'
				} else if (value == 5) {
					return '奖励'
				} else if (value == 6) {
					return '退款'
				} else if (value == 7) {
					return '官方'
				} else {
					return '--'
				}


			}


		}
	}
</script>

<style lang='less' scoped>
	@import url('./MoneyFlowDetail.less');
</style>
