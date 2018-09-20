<template>
	<div id="ExtensionLink">
		<p class="title">我推荐的下线</p>
		<div class="notice">
			<h2>推广奖励明细</h2>
			<p>
				每个用户都有自己的独立推广链接，您把您的推广 链接发出去让别人过来本网站， 只要点击您的推广链接进来本网站的都是您的下家，您的下家在本网站 每次充值系统自动奖励您百分之五元（每 次都有，永久性。）。虽然奖励 金额不是很大但推广的下家多也是大数目
			</p>
			<h5>参考广告语：</h5>
			<div class="content">
				<p>全网最低空包代发、一单一用、不怕降权、</p>
				<p>免费提供：快递底单、签收底单、签收证明、物流内网。</p>
				<p>活动期间免费升级VIP会员、代理会员、您还在等什么？？</p>
				<p>网站：（
					<span>写上您的推广链接</span>）</p>
			</div>
		</div>
		<div class="notice">
			推广网址：
			<el-input v-model="remoteUrl" class="typeText"></el-input>
			<el-button type="primary" v-clipboard:copy="remoteUrl" v-clipboard:success="onCopy">复制链接地址</el-button>
		</div>
		<div class="list">
			<div class="tab">
				<el-table :data="tableData" style="width: 100%">
					<el-table-column prop="userName" label="下线帐号" width="150" align='center' cen>
					</el-table-column>
					<el-table-column prop="qq" label="下线QQ" align='center' width="140">
					</el-table-column>
					<el-table-column prop="email" width="160" align='center' label="下线邮箱">
					</el-table-column>
					<el-table-column prop="amount" width="110" align='center' label="余额">
					</el-table-column>
					<el-table-column prop="userType" width="100" align='center' label="会员级别">
						<template slot-scope="scope">{{scope.row.userType | userTypeCn(scope.row.userType)}}</template>
					</el-table-column>
					<el-table-column prop="createTime" width="180" align='center' label="注册时间">
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
            remoteUrl: "",
            total: 1,
            pageSize: 5,
            pageNumber: 1,
            customType: "",
            tableData: []
        };
    },
    created() {
            this.getOfflineList();
            this.getPromoteUrl();
    },
    filters: {
        timerFormat(vaule) {
            return Moment(vaule).format("YYYY-MM-DD");
        },
        userTypeCn(value) {
            if (value == 1) {
                return "代理会员";
            } else if (value == 2) {
                return "VIP会员";
            } else if (value == 3) {
                return "普通会员";
            }
        }
    },
    methods: {
        handleSizeChange(val) {
            this.pageSize = val;
            this.getOfflineList();
        },
        handleCurrentChange(val) {
            this.pageNumber = val;
            this.getOfflineList();
        },
        downLoad() {
            if (!this.time) {
                this.$message({
                    message: "请选择起始时间和截止时间",
                    type: "warning"
                });
                return;
            }
            this.addAddr = true;
        },
        getPromoteUrl() {
            this.$http.post(this.$API.getPromoteUrl, {
                userId: localStorage.getItem("userId")
            }).then(res => {
                if (res.success) {
                    this.remoteUrl = res.data.url;
                } else {
                    this.$message({
                        type: "error",
                        message: res.message
                    });
                }
            });
        },
        getOfflineList() {
            this.$http.post(this.$API.getOfflineList, {
                userCode: localStorage.getItem("userCode"),
                pageNumber: this.pageNumber,
                pageSize: this.pageSize
            }).then(res => {
                if (res.success) {
                    this.tableData = res.data.listData;
                    this.total = res.data.totalNumber;
                } else {
                    this.$message({
                        type: "error",
                        message: res.message
                    });
                }
            });
        },
        onCopy() {
            this.$message({
                type: "success",
                message: "复制成功"
            });
        }
    }
}
</script>

<style lang='less' scoped>
@import url("./ExtensionLink.less");
</style>
