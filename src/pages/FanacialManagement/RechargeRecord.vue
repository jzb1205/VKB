<template>
	<div id="RechargeRecord">
		<p class="title">入账明细</p>
		<div class="list">
			{{payDate}}
			<div class="search">
				入账时间：
				<el-date-picker type="daterange" v-model="payDate" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00']">
				</el-date-picker>
				状态：
				<el-select v-model="payState" placeholder="请选择" class="s_select" v-if="options && options.length>0">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-button type="primary" @click="getRechargeRecordPage">查询</el-button>
			</div>
			<div class="tab">
				<el-table :data="tableData" style="width: 100%">
					<el-table-column prop="payNo" label="支付单号" width="210" align='center' cen>
					</el-table-column>
					<el-table-column prop="createTime" label="时间" align='center' width="220">
						<template slot-scope="scope">{{scope.row.createTime | timerFormat(scope.row.createTime)}}</template>

					</el-table-column>
					<el-table-column prop="payAmount" width="190" align='center' label="存入金额">
					</el-table-column>
					<el-table-column prop="payStatus" width="180" align='center' label="支付状态">
						<template slot-scope="scope">{{scope.row.payStatus | payStatus(scope.row.payStatus)}}</template>
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
				startDate: "",
				endDate: "",
				payDate: "",
				total: 0,
				pageSize: 5,
				pageNumber: 1,
				payState: '',
				tableData: [

				],
				options: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '双皮奶'
				}, {
					value: '选项3',
					label: '蚵仔煎'
				}, {
					value: '选项4',
					label: '龙须面'
				}, {
					value: '选项5',
					label: '北京烤鸭'
				}]

			}
		},
		methods: {
			handleSizeChange(val) {
				this.pageSize = val;
				this.getRechargeRecordPage();
			},
			handleCurrentChange(val) {
				this.pageNumber = val;
				this.getRechargeRecordPage();
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
			},
			getRechargeRecordPage() {
				if (this.payDate && this.payDate.length > 0) {
					this.startDate = this.payDate[0];
					this.endDate = this.payDate[1];
				} else {
					this.startDate = null;
					this.endDate = null;
				}
				this.$http.post(this.$API.getRechargeRecordPage, {
					userId: localStorage.getItem("userId"),
					pageSize: this.pageSize,
					pageNumber: this.pageNumber,
					startTime: this.startDate,
					endTime: this.endDate

				}).then((res) => {
					if (res.success) {
						this.tableData = []
						this.tableData.push(...res.data.listData)
						this.total = res.data.totalNumber;
					} else {
						this.$message({
							type: error,
							message: res.message
						})

					}



				})



			}
		},
		created() {
			this.getRechargeRecordPage()
		},
		filters: {
			timerFormat(vaule) {
				return Moment(vaule).format("YYYY-MM-DD HH:mm:ss");
			},
			payStatus(value) { //支付状态
				if (value == 1) {
					return "支付成功"
				} else if (value == 2) {
					return "未支付"
				}
			}


		}
	}
</script>

<style lang='less' scoped>
	@import url('./RechargeRecord.less');
</style>
