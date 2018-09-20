<template>
	<div id="ReceivingAddress">
		<p class="title">
			设置您的发货地址
			<el-button type="primary" size="mini" @click="addAddr = true">新增发货地址</el-button>
		</p>
		<p class="search">
			<el-input v-model="condition.name" class="input_select" placeholder="请输入名字"></el-input>
			<el-input v-model="condition.addr" class="input_select" placeholder="请输入地址"></el-input>
			<el-input v-model="condition.phone" class="input_select" placeholder="请输入电话"></el-input>
			<el-button type="primary" size="middle">搜索</el-button>
		</p>
		<div class="tab">
			<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="deliveryName" label="发货人姓名" width="120" align='center' cen>
				</el-table-column>
				<el-table-column prop="name" label="发货地址" align='center' width="320">
					<template slot-scope="scope">
						<span>{{scope.row.deliveryProvince}}{{scope.row.deliveryCity}}{{scope.row.deliveryArea}}{{scope.row.addressDetail}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="deliveryTel" width="200" align='center' label="发货电话">
				</el-table-column>
				<el-table-column prop="state" width="100" align='center' label="状态">
				</el-table-column>
				<el-table-column prop="option" width="100" align='center' label="操作">
					<template slot-scope="scope">
						<el-button type="primary" size="mini" @click="delAddr(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="page">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageNum" :page-sizes="[5, 10, 15, 20]"
			    :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>
		<!-- 新增收货地址 -->
		<el-dialog title="新增收货地址" :visible.sync="addAddr" width="700px" class="addAddress">
			<div>
				<el-form ref="form" label-width="120px">
					<el-form-item label="发货人姓名：">
						<el-input v-model="addAddrInfo.name" class="typeText"></el-input>
					</el-form-item>
					<el-form-item label="发货人电话：">
						<el-input v-model="addAddrInfo.phone" class="typeText"></el-input>
					</el-form-item>
					<el-form-item label="发货人城市：">
						<Distpicker @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></Distpicker>
					</el-form-item>
					<el-form-item label="详细地址：">
						<el-input v-model="addAddrInfo.detailAddr" class="text"></el-input>
					</el-form-item>
				</el-form>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addAddr = false">取 消</el-button>
				<el-button type="primary" @click="addAddressInfo">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import Distpicker from 'v-distpicker'
	export default {
		components: {
			Distpicker
		},
		data() {
			return {
				total: 0,
				pageSize: 5,
				pageNum: 1,
				condition: {
					name: '',
					addr: '',
					phone: ''
				},
				tableData: [],
				addAddr: false,
				addAddrInfo: {
					name: '',
					phone: '',
					area: '',
					city: '',
					province: '',
					detailAddr: ''
				}
			}
		},
		created() {
			this.getDeliveryInfoPage();
			console.log(this.$route.params.isShow)
			if (this.$route.params.isShow == 1) {
				this.addAddr = true;
			}else{
				this.addAddr = false;
			}
		},
		methods: {
			handleSizeChange(val) {
				this.pageSize = val;
				this.getDeliveryInfoPage()
			},
			handleCurrentChange(val) {
				this.pageNum = val;
				this.getDeliveryInfoPage()
			},
			onChangeProvince(a) {
				this.addAddrInfo.province = a.value;
			},
			onChangeCity(a) {
				this.addAddrInfo.city = a.value;
			},
			onChangeArea(a) {
				this.addAddrInfo.area = a.value;
			},
			getDeliveryInfoPage() {
				this.$http.post(this.$API.getDeliveryInfoPage, {
						pageNumber: this.pageNum,
						pageSize: this.pageSize,
						userId: localStorage.getItem('userId')
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
			addAddressInfo() {
				if (!this.addAddrInfo.name) {
					this.$message({
						message: '发货人名字不能为空',
						type: 'error'
					});
					return;
				}
				if (!this.addAddrInfo.phone) {
					this.$message({
						message: '发货人电话不能为空',
						type: 'error'
					});
					return;
				}
				if (!this.addAddrInfo.area || !this.addAddrInfo.city || !this.addAddrInfo.province) {
					this.$message({
						message: '发货省,市,区不能为空',
						type: 'error'
					});
					return;
				}
				if (!this.addAddrInfo.detailAddr) {
					this.$message({
						message: '详细地址不能为空',
						type: 'error'
					});
					return;
				}
				this.$http.post(this.$API.addAddressInfo, {
					userId: localStorage.getItem('userId'),
					deliveryName: this.addAddrInfo.name,
					deliveryTel: this.addAddrInfo.phone,
					deliveryArea: this.addAddrInfo.area,
					deliveryCity: this.addAddrInfo.city,
					deliveryProvince: this.addAddrInfo.province,
					addressDetail: this.addAddrInfo.detailAddr,
				}).then((res) => {
					if (res.success == true) {
						this.$message({
							message: res.message,
							type: 'success'
						});
						this.getDeliveryInfoPage();

					} else {
						this.$message({
							message: res.message,
							type: 'error'
						});
					}
					this.addAddrInfo = {
						name: '',
						phone: '',
						area: '',
						city: '',
						province: '',
						detailAddr: ''
					}
					this.addAddr = false
				})
				this.getDeliveryInfoPage()
			},
			delAddr(v) {
				let diIdsList = [];
				diIdsList.push(v.diId);
				this.$http.post(this.$API.delDeliveryInfo, {
					userId: localStorage.getItem('userId'),
					diIds: diIdsList
				}).then((res) => {
					if (res.success == true) {
						this.$message({
							message: '删除成功',
							type: 'success'
						});
					} else {
						this.$message({
							message: res.message,
							type: 'error'
						});
					}
					setTimeout(() => {
						this.getDeliveryInfoPage()
					}, 1000)
				})
			}

		}
	}
</script>

<style lang='less' scoped>
	@import url('./ReceivingAddress.less');
</style>
