<template>
	<div id="header">
		<div class="header">
			<div class="header_t">
				<div class="header_t_c">
					欢迎回来，账号：{{userInfo.userName}} &nbsp;级别：{{userInfo.userType | userTypeCn}} &nbsp;余额：{{userInfo.amount}}
					<a v-if='userId' @click="$router.push('/login')">安全退出</a>
					<a v-else @click="$router.push('/login')">登录</a>
				</div>
			</div>
			<div class="header_b">
				<div class="header_b_c">
					<img src="../../assets/img/logo1.png" alt="">
					<img src="../../assets/img/logo2.jpg" alt="">
				</div>
			</div>
		</div>
		<div class="nav">
			<ul>
				<li tag="li" exact v-for="(it,i) in navList" :key="i" :class="{'active':it.id == curType}" @click="getCurType(it.id,it.path)">
					{{it.name}}
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				userType: "",
				userName: "",
				amount: 0,
				navList: [{
						id: '0',
						path: '/',
						name: '首页'
					},
					{
						id: '1',
						path: '/wrap/VipCenter',
						name: '会员中心'
					},
					{
						id: '2',
						path: '/wrap/PurchaseOfEmptyBags',
						name: '我要下单'
					},
					{
						id: '3',
						path: '/wrap/PurchaseFlow',
						name: '购买流量'
					},
					{
						id: '4',
						path: '/wrap/PurchaseCollection',
						name: '购买收藏'
					},
					{
						id: '5',
						path: '/wrap/UpToVip',
						name: '升级会员'
					},
					{
						id: '6',
						path: '/wrap/ExtensionLink',
						name: '推广奖励'
					}
				],
				curType: 0,
				userId: localStorage.getItem('userId')
			}
		},
		created() {
			this.$store.dispatch('getUserInfo')
		},
		computed: {
			userInfo() {
				return this.$store.state.userInfo;
			}
		},
		methods: {
			getCurType(id, path) {
				this.curType = id;
				this.$router.push(path)
			}
		},
		filters: {

			userTypeCn(value) {
				if (value == 3) {
					return '普通会员';
				} else if (value == 2) {
					return 'VIP会员';
				} else if (value == 1) {
					return '代理会员'
				}


			}


		}
	}
</script>

<style lang='less' scoped>
	@import url('./header.less');
</style>
