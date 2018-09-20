<template>
	<div id="UpToVip">
		<p class="title">升级中心</p>
		<div class="notice">
			<p>一次性充值满50元，或充值累积满100元。可自动升级为永久VIP会员。 </p>
			<p>一次性充值满100元，或充值累积满200元。可自动升级为永久代理会员。</p>
		</div>
		<div class="info">
			<dl>
				<dd>用&nbsp;户&nbsp;&nbsp;名：</dd>
				<dt>
					<span class="green">{{userInfo.userName}}</span>
				</dt>
				<dd>当前级别：</dd>
				<dt>
					<span class="green">{{userInfo.userType |userTypeCn}}</span>
				</dt>
				<dd>可用余额：</dd>
				<dt>
					<span class="orange">{{userInfo.amount}}</span>元</dt>
				<dd>升级会员：</dd>
				<dt class="sel">
					<el-select v-model="customType" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					推荐加入【代理会员】购买空包更划算！！
					<el-button type="primary" @click="upgradeMember">立即加入</el-button>
				</dt>
				<dd>购买提醒：</dd>
				<dt>建议购买终身【代理会员】资格,这样最划算而且还能推广下线赚钱哦！！</dt>
			</dl>
		</div>
		<div class="list">
			<div class="tab">
				<el-table :data="tableData" style="width: 100%">
					<el-table-column prop="kdName" label="快递类型" width="210" align='center' cen>
					</el-table-column>
					<el-table-column prop="generalPrice" label="普通会员" align='center' width="210">
					</el-table-column>
					<el-table-column prop="vipPrice" width="210" align='center' label="VIP会员">
					</el-table-column>
					<el-table-column prop="agentPrice" width="210" align='center' label="代理会员(推荐)">
					</el-table-column>
				</el-table>
			</div>
			<!-- <div class="page">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-sizes="[5, 10, 15, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
                </el-pagination>
            </div> -->
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				remoteUrl: '',
				total: 0,
				pageSize: 5,
				pageNum: 0,
				customType: '1',
				tableData: [],
				options: [{
						value: '2',
						label: '永久VIP会员10.00元'
					},
					{
						value: '1',
						label: '永久代理会员20.00元'
					}
				]

			}
		},
		created() {
			this.getKdPriceDetail();
		},
		computed: {
			userInfo() {
				return this.$store.state.userInfo;
			}
		},
		methods: {
			getKdPriceDetail() {
				this.$http.get(this.$API.getKdPriceDetail, {}).then((res) => {
					if (res.success) {
						this.tableData = res.data;
					} else {
						this.$message({
							type: 'error',
							message: "获取价格清单失败,请联系管理员！"
						})
					}
				})
			},
			//升级会员
			upgradeMember() {
				this.$http.post(this.$API.upgradeMember, {
					userId: localStorage.getItem("userId"),
					userType: this.customType
				}).then((res) => {
					if (res.success) {
						this.$message({
							type: 'success',
							message: res.data.message
						});
						this.$store.dispatch('getUserInfo')
					} else {
						this.$message({
							type: 'error',
							message: res.message
						})
					}
				})
			}
		},
		filters: {
			userTypeCn(value) {
				if (value == 3) {
					return '普通会员'
				} else if (value == 2) {
					return 'VIP会员'
				} else if (value == 1) {
					return '代理会员'
				}
			}
		}
	}
</script>

<style lang='less' scoped>
	@import url('./UpToVip.less');
</style>
