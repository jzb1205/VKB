<template>
	<div id="VipCenter">
		<p class="fTitle">会员组 ：
			<span class="red">{{userInfo.userType | getUserType(userInfo.userType)}}</span>， 空包余额：
			<span class="red">{{userInfo.amount}}</span> 元，
			<span @click="$router.push('/AccountRecharge')">（空包充值）</span>
		</p>
		<p class="title">账号登录信息:</p>
		<div class="info">
			<ul>
				<li>
					<span>用户名：</span>
					<span>{{userInfo.userName}}</span>
				</li>
				<li>
					<span>注册时间：</span>
					<span>{{userInfo.createTime}}</span>
				</li>
				<li>
					<span>最后登录：</span>
					<span>{{userInfo.lastLoginTime}}</span>
				</li>
				<li>
					<span>注册ip：</span>
					<span>{{userInfo.registerIp}}</span>
				</li>
				<li>
					<span>上次登录ip：</span>
					<span>{{userInfo.lastLoginIp}}</span>
				</li>
			</ul>
		</div>
		<div class="notice">
			<p>好消息</p>
			<p>活动期间免费送代理会员，注册了账号0元就可以升级代理会员。</p>
			<p>←← ← ← ← ←← ← ← ← 点击左边的《升级会员》就可申请。</p>
			<p>推广奖励</p>
			<p>
				<a @click="$router.push('/ExtensionLink')">每个用户都有自己的独立推广链接，您把您的推广链接发出去让别人过来本网站， 只要点击您的推广链接进来本网站的都是您的下家，
					<span>您的下家在本网站每次充 值系统自动奖励您百分之五元（每次都有，永久性。）
					</span>。虽然奖励金额不是很 大但推广的下家多也是大数目。点击（查看我的推广链接）
				</a>
			</p>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {}
		},
		created() {
			this.$store.dispatch('getUserInfo')
		},
		computed: {
			userInfo() {
				return this.$store.state.userInfo;
			}
		},
		filters: {
			getUserType(value) {
				let type = {
					3: '普通会员',
					2: 'vip会员',
					1: '代理会员',
					0: '管理员'
				}
				return type[value] ? type[value] : '';
			}
		},
		methods: {}
	}
</script>

<style lang='less' scoped>
	@import url('./VipCenter.less');
</style>
