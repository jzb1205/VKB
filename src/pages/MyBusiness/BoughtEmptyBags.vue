<template>
	<div id="BoughtEmptyBags">
		<p class="title"> 空包单号购买记录&nbsp;&nbsp;（购买后自动显示单号，看到完整单号后就可以在网店发货了）</p>
		<div class="notice">
			温馨提示：您所购买的空包记录我们将永久为你保存，用不作任何删除记录。
		</div>
		<div class="content">
			<ul class="tab">
				<li v-for="it in typeList" :key="it.type" @click="getCurType(it.type)" :class="{'active':curType == it.type}">{{it.name}}</li>
			</ul>
			<p class="condition">
				单号：
				<el-input v-model="goodsNum" class="input_select" placeholder="输入单号或发货名"></el-input>
				下单时间：
				<el-date-picker v-model="time" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00']">
				</el-date-picker>
				<el-button type="primary" @click="getDeliveryOrderListByPage">查询</el-button>
				<el-button type="danger" @click="downLoad">下载</el-button>
			</p>
			<div class="list">
				<ul>
					<li v-for="(item,i) in list" :key="i">
						<p>{{item.expressType}}：{{item.courierNumber}}</p>
						<p>发货信息: {{item.consignorName}}， {{item.consignorTel}}，{{item.startCity}}{{item.startArea}}{{item.startAddress}}</p>
						<p>收货信息：{{item.arriveAddress}}</p>
						<p class="red">购买金额：{{item.price}}，购买时间：{{item.createTime | timerFormat}}</p>
					</li>
				</ul>
			</div>
			<div class="page">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="[5, 10, 15, 20]"
				    :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
		<!-- 下载-->
		<el-dialog title="信息" :visible.sync="addAddr" width="300px" class="addAddress">
			<div style="text-align:center">
				确认下载？
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="addAddr = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>	
import Moment from "moment";
	export default {
		data() {
			return {
				total: 0,
				pageSize: 5,
				pageNum: 1,
				typeList: [{
						type: '1',
						name: '未发货'
					},
					{
						type: '2',
						name: '已发货'
					},
					{
						type: '3',
						name: '一个月前单子'
					}
				],
				curType: '1',
				time: '',
				goodsNum: '',
				addAddr: false,
        list:[]

			}
		},
		created() {
			this.getDeliveryOrderListByPage()
		},
    filters:{
     timerFormat(vaule) {
				return Moment(vaule).format("YYYY-MM-DD");
			}
    },
		methods: {
			getCurType(val) {
				this.curType = val;
				this.getDeliveryOrderListByPage();
			},
			handleSizeChange(val) {
				this.pageSize = val;
				this.getDeliveryOrderListByPage();
			},
			handleCurrentChange(val) {
				this.pageNum = val;
				this.getDeliveryOrderListByPage();
			},
			downLoad() {
				//console.log(this.time)
				if (!this.time) {
					this.$message({
						message: '请选择起始时间和截止时间',
						type: 'warning'
					});
					return;
				}
				this.addAddr = true;
			},
			getDeliveryOrderListByPage() {
				let startDate = '';
				let endDate = '';
				if (this.time && this.time.length == 2) {
					startDate = this.time[0];
					endDate = this.time[1];
				}else{
					this.time='';
				}
				this.$http.post(this.$API.getDeliveryOrderListByPage, {
						userId: localStorage.getItem('userId'),
						pageNumber: this.pageNum,
						pageSize: this.pageSize,
						orderNo: this.goodsNum,
						startDate: startDate,
						endDate: endDate,
						orderStatus: this.curType
					})
					.then((res) => {
						if(res.success){
                        this.list=[];
						this.list.push(...res.data.listData);
						this.total=res.data.totalNumber;
						}else{
							this.$message({
								type:'error',
								message:res.message
							})
						}
						
					})
			}
		}
	}
</script>

<style lang='less' scoped>
	@import url('./BoughtEmptyBags.less');
</style>
