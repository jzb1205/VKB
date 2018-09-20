<template>
	<div id="PurchaseCollection">
		<p class="title">在线自助购买收藏</p>
		<div class="notice">
			<p>宝贝收藏：增加产品的宝贝收藏量。 </p>
			<p>收藏店铺：收藏店铺增加店铺的粉丝，掉量不补。</p>
			<p>购物车：增加产品买家加入购物车的数量</p>
			<p>京东宝贝/店铺/秒杀提醒：京东的宝贝关注是宝贝收藏，店铺关注是店铺粉丝，秒杀提醒是活动的。</p>
			<p>拼多多收藏：增加买家收藏宝贝和关注店铺的数量，增加权重，拼多多收藏都是当天完成。</p>
			<p>
				温馨提醒：很多顾客买了收藏加购，在手机端千牛看收藏的数量，然后就反馈说不足， 这种是错误的，手机千牛显示的是当天被收藏的款数，加购的款数，而不是次数。正 确查看方法：隔天看电脑端生意参谋→商品→商品概况。
			</p>
			<p>
				由于淘宝的原因，导致目前店铺收藏掉粉严重，店铺收藏做的时候就会掉，介意的勿拍。
				<br/> 备注多少天完成的任务，请忽略网站的任务状态，比如您备注10天完成，但是只过了2天，网站 上显示任务完成的，这个是不影响的，我们是人工操作的，任务正常在做的，会按您备注的天数做完的。
			</p>
		</div>
		<div class="step">
			<p class="title">
				第一步：选择平台类型
			</p>
			<ul class="tab">
				<li v-for="it in typeList" :key="it.typeId" @click="getCurType(it)" :class="{'active':curType == it.typeId}">{{it.title}}</li>
			</ul>
		</div>
		<div class="step">
			<p class="title">
				第二步：选择收藏套餐服务
			</p>
			<div v-if="collectionPriceList && collectionPriceList.length>0" class="displayBox">
				<input type="text" class="displayInput" v-model="collectionPrice" @click="showOne=!showOne">
				<el-collapse-transition>
					<ul v-if="showOne" cass="aPop">
						<li v-for="item in collectionPriceList" :key="item.collectionId" @click="CollectionClass(item)">{{item.text}}</li>
					</ul>
				</el-collapse-transition>
			</div>
			<p class="notice">{{describe}}</p>
		</div>
		<div class="step">
			<p class="title">
				第三步：填写来路信息务
			</p>
			<el-input v-model="orderParams.storeName" class="input_select" placeholder="请输入店铺名称"></el-input>
			<el-input v-model="orderParams.keyword" class="input_select" placeholder="请输入关键词如多个关键词用逗号隔开"></el-input>
			<el-input v-model="orderParams.url" class="input_select" placeholder="请输入商品链接或商品ID，如多个商品用逗号隔开"></el-input>
			<p class="notice">注：关键词最多可以添加5个，用逗号隔开。</p>
			<el-button type="primary" size="middle" @click="submitOrder">确认购买</el-button>
		</div>
		<div class="step">
			<p class="title">
				购买必知
			</p>
			<p class="known">收藏宝贝，店铺及购物车，天猫关注购买须知。</p>
			<div class="purchase_kown">
				<p>问：当天下单，什么时候可以开始？</p>
				<p>
					答：
					<span>当天18:00之前的订单当天处理，过18:00的隔天安排。</span>
				</p>
			</div>
			<div class="purchase_kown">
				<p>问：你们安排（收藏，购物车）是怎么安排的，刷手如何操作的</p>
				<p>答：
					<span>刷手通过关键词搜索进主宝贝，浏览主宝贝1­2分钟，收藏主宝贝，然后再随机浏览其他1­3款副宝贝。</span>
				</p>
			</div>
			<div class="purchase_kown">
				<p>问：刷收藏有什么好处。</p>
				<p>
					答：
					<span>淘宝刷收藏推广，简单说，就是通过增加收藏人气，提高商品的排名。吸引流量，增加销售。</span>
					<br/>
					<span>淘宝收藏人气的提升，是淘宝人气宝贝权重提升的重要因素。如果卖家有好的商品，再加上配合刷单提升权重， 收藏率高的宝贝在淘宝搜索系统是属于有潜力的商品，搜索系统会优先展示该商品必然会随着浏览量的增加，销 售量会大幅增长。特别是要上天天特价等活动的审核前期，收藏率和购物车率是能提高一审通过的概率。
					</span>
				</p>
			</div>
			<div class="purchase_kown">
				<p>问：收藏套餐多久能完成？ </p>
				<p>答：
					<span>淘宝收藏加购：默认情况下，100个收藏加购物是1——2天完成，200个是2——3天，500个是5天，1000个 是10天左右京东收藏：默认情况下，100个收藏是1天，500个是5天，1000个是10天，大量的是15天不超过一个月 拼多多收藏：目前的拼多多套餐都是一天完成的，50个收藏一天完成，100个/200/500/3000个。
					</span>
				</p>
			</div>
			<div class="purchase_kown">
				<p>问：我不知道你们放了多少，完成了吗。</p>
				<p>答：
					<span>放之前可以先记录一下产品多少收藏，对比安排后多少收藏。</span>
					<span>我们安排之前也会给您做记录，想查询可以咨询客服。</span>
				</p>
			</div>
			<div class="purchase_kown">
				<p>问：能根据客户要求指定时间完成吗？</p>
				<p>
					答：
					<span>可以的，套餐要做多少天，可以在第三步，店铺旺旺后面备注。例如：请输入店铺旺旺 （5天完成收藏）</span>
				</p>
			</div>
			<div class="purchase_kown">
				<p>问：怎样查看收藏有没有在做？</p>
				<p>答：
					<span>任务状态显示为“进行处理”，则表明客服已开始处理，您可以在生意参谋查看收藏的增加，或者查看宝贝的总收藏数。</span>
				</p>
			</div>
			<div class="purchase_kown">
				<p>问：我定的套餐是自定义要求10天完成的，可是第5天就显示“完成处理”，是怎么回事？ </p>
				<p>
					答：
					<span>自定义天数的，如果显示“完成处理”是没关系的，我们这边是会把数量给您做完的。</span>
				</p>
			</div>
			<div class="purchase_kown">
				<p>问：收藏购物车刷多会不会被封店</p>
				<p>
					答：
					<span>收藏不同于刷信誉，淘宝是不查的，更不会封店，因为收藏是可以直接执行的，如果说刷收藏会 封店，那我只能说淘宝得关门了，举个简单的例子：如果收藏有风险，会封店，那么我想打击哪家店，就 刷他，难道他就因此而受处罚或封店了吗？那是不可能的事哦，所以说，请放心大胆滴刷！刷收藏不会
						被封店的，如果刷收藏会封店的话，那么哪个店铺老板得罪了我，我就花钱请人帮他刷几千个，几万个， 淘宝会封他的店吗，答案肯定是不会封，所以淘宝刷收藏，只有好处，一点点坏处都没有。
					</span>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				typeList: [],
				collectionPriceList: [],
				curType: 6,
				selectCollection: '',
				collectionPrice: '',
				describe: '',
				orderParams: {
					url: '',
					storeName: '',
					keyword: '',
					packageName: '',
					price: '',
					id: ''
				},
				showOne: false

			}
		},
		created() {
			this.getCollectionClass();
			this.getCollectionPriceList();
		},
		computed: {
			userInfo() {
				return this.$store.state.userInfo;
			}
		},
		methods: {
			getCurType(val) {
				this.curType = val.typeId;
				this.orderParams.packageName = val.title;
				this.getCollectionPriceList();
			},
			//获取平台收藏类型
			getCollectionClass() {
				this.$http.post(this.$API.getCollectionClass)
					.then((res) => {
						if (res.success == true) {
							this.typeList = res.data;
							this.curType = this.typeList[0].typeId;
						} else {
							this.$message({
								message: res.message,
								type: 'error'
							});
						}
					})
			},
			//获取收藏价格列表
			getCollectionPriceList() {
				this.$http.post(this.$API.getCollectionPriceList, {
						typeId: this.curType
					})
					.then((res) => {
						if (res.success == true) {
							this.collectionPriceList = res.data;
							this.collectionPrice = this.collectionPriceList[0].text;
						} else {
							this.$message({
								message: res.message,
								type: 'error'
							});
						}
					})
			},
			CollectionClass(v) {
				this.showOne = !this.showOne;
				this.describe = v.describe;
				this.collectionPrice = v.text;
				this.orderParams.id = v.extCollectionId;
				if (this.userInfo.userType == '3') {
					this.orderParams.price = v.generalPrice;
				} else if (this.userInfo.userType == '2') {
					this.orderParams.price = v.vipPrice;
				} else if (this.userInfo.userType == '1') {
					this.orderParams.price = v.agentPrice;
				}
			},
			//收藏下单
			submitOrder() {
				if (!this.orderParams.url) {
					this.$message({
						type: 'error',
						message: "店铺链接不能为空"
					})
					return false;
				}
				if (!this.orderParams.storeName) {
					this.$message({
						type: 'error',
						message: "店铺名称不能为空"
					})
					return false;
				}
				if (!this.orderParams.id) {
					this.$message({
						type: 'error',
						message: "请选择收藏套餐类型不能为空"
					})
					return false;
				}
				this.$http.post(this.$API.submitOrder, {
						userId: localStorage.getItem('userId'),
						url: this.orderParams.url,
						storeName: this.orderParams.storeName,
						keyword: this.orderParams.keyword,
						packageName: this.orderParams.packageName,
						price: this.orderParams.price,
						id: this.orderParams.id
					})
					.then((res) => {
						if (res.success == true) {
							this.$message({
								message: res.message,
								type: 'success'
							});
							this.orderParams = {
								url: '',
								storeName: '',
								keyword: '',
								packageName: '',
								price: '',
								id: ''
							}
						} else {
							this.$message({
								message: res.message,
								type: 'error'
							});
						}
					})
			},
		}
	}
</script>

<style lang='less' scoped>
	@import url('./PurchaseCollection.less');
</style>
