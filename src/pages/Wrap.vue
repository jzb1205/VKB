<template>
	<div id="Wrap">
		<Header></Header>
		<div class="main_warp">
			<div class="aside">
				<p>管理中心</p>
				<ul class="parent_list">
					<li v-for="(it,i) in parentList" :key="i">
						<p>{{it.menuName}}</p>
						<el-collapse-transition>
							<ul class="child_list">
								<router-link tag="li" exact :to="is.menuUrl" v-for="(is,j) in it.childNodes" :key="j">
									<p>{{is.menuName}}</p>
								</router-link>
							</ul>
						</el-collapse-transition>
					</li>
				</ul>
			</div>
			<div class="main">
				<router-view/>
			</div>
		</div>
		<Footer></Footer>
		<AppendRight></AppendRight>
	</div>
</template>

<script>
	import Header from '../pages/component/header'
	import Footer from '../pages/component/footer'
	import AppendRight from '../pages/component/appendRight'
	export default {
		components: {
			Header,
			Footer,
			AppendRight
		},
		data() {
			return {
				parentId: 1,
				showCur: true,
				oldParentId: 1,
				parentList: []
			}
		},
		created() {
			this.getTreeList()
		},
		methods: {
			getParentId(parentId) {
				if (this.oldParentId != parentId) {
					this.oldParentId = parentId;
					this.parentId = parentId;
					this.showCur = !this.showCur;
				}
				this.parentId = parentId;
				this.showCur = !this.showCur;
			},
			getTreeList() {
				this.$http.post(this.$API.getTreeList, {
					userId: localStorage.getItem('userId')
				}).then((res) => {
					let PList = res.data;
					let parentTree = {};
					if (res.success == true) {
						/* for(var i=0;i<PList.length;i++){ */
						/* let childTree = [];
						let Clist = PList[i].childNodes;
						for(var j=0;j<Clist.length;j++){
						    
						        childTree.push(Clist[j]);
						    
						} */
						/*  parentTree = {
						     childNodes:childTree,
						     createTime:PList[i].createTime,
						     menuLevel:PList[i].menuLevel,
						     menuName:PList[i].menuName,
						     menuUrl:PList[i].menuUrl,
						     parentId:PList[i].parentId,
						     resourceId:PList[i].resourceId,
						     showFlag:PList[i].showFlag,
						     sort:PList[i].sort,
						     updateTime:PList[i].updateTime
						 }; */
						this.parentList = PList;
						/*  } */
					} else {
						this.$message({
							message: res.message,
							type: 'error'
						});
					}
				})
			}
		}
	}
</script>

<style lang='less' scoped>
	@import url('./Wrap.less');
</style>
