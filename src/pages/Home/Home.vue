<template>
	<div id='Home'>
		<Header></Header>
		<div class="banner">
			<el-carousel indicator-position="outside">
				<el-carousel-item v-for="item in bannerList" :key="item.url">
					<img :src="item.url" alt="">
				</el-carousel-item>
			</el-carousel>
			<el-button type="danger" class="loginBtn" @click="$router.push('/logo')">立即注册，成为本站会员</el-button>
		</div>
		<div class="imgPic">
			<img src="../../assets/img/home.jpg" alt="">
		</div>
		<div class="new">
			<div class="one">
				<p>网站公告
					<a href="">更多...</a>
				</p>
				<ul>
					<li>1.入驻一个月，还未从平台赚到钱的商.....</li>
					<li>2.打造拼多多爆款</li>
				</ul>
			</div>
			<div class="two">
				<p>新手教程
					<a href="">更多...</a>
				</p>
				<ul>
					<li>1.关于拼多多的那些事儿</li>
				</ul>
			</div>
			<div class="three">
				<p>淘宝技巧
					<a href="">更多...</a>
				</p>
				<ul>
				</ul>
			</div>
		</div>
		<Footer></Footer>
		<AppendRight></AppendRight>
	</div>
</template>

<script>
	import Header from '../../pages/component/header'
	import Footer from '../../pages/component/footer'
	import AppendRight from '../../pages/component/appendRight'
	export default {
		components: {
			Header,
			Footer,
			AppendRight
		},
		data() {
			return {
				bannerList: [{
						url: require('../../assets/img/banner1.jpg')
					},
					{
						url: require('../../assets/img/banner2.jpg')
					}
				]
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url('./Home.less');
</style>
