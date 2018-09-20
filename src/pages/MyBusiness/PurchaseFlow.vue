<template>
	<div id="PurchaseFlow">
		<p class="title">在线自助购买流量</p>
		<div class="notice">
			<div class="one">
				<p>购买流量资料填写规则 </p>
				<p>第一行：填写店铺名称（如XX旗舰店）</p>
				<p>第二行：填写关键词，多个关键词用逗号隔开。（如链接一：关键词1，关键词2；链接2：关键词1，关键词2） </p>
				<p>第三行：填写商品链接或者商品ID，用逗号隔开。（套餐支持几款宝贝，在套餐下方的红字提醒看，没有写的就是只支持一款） </p>
			</div>
			<div class="two">
				<p>­
					<strong>电脑端流量</strong>
					(刷手通过电脑搜索关键词后主产品浏览1~­­­3分钟后部，随机浏览店铺其他 产品1~­­3款副宝贝，套餐上有收藏的就增加收藏）
				</p>
				<p>
					<strong>手机端流量­</strong>
					（刷手通过手机APP搜索关键词，货比三家后，进入主产品浏览1~­­3分钟后， 随机浏览店铺其他产品1­­~2款副宝贝，套餐上有收藏的会增加收藏，权重更高）
				</p>
				<p>
					<strong>混合端流量</strong>
					（刷手通过手机或者电脑搜索关键词，货比三家后，进入主宝贝浏览1~­­3分 钟左右，收藏，加购物车或者关注店铺，再浏览其他1~­­3款副宝贝）
				</p>
			</div>
			<div class="three">
				着重提醒：推荐购买手机端流量套餐，商家可在店铺名称后备注要男号还是女号， 仅限手机流量套餐。例：XX女装店（要女号）做手机流量的号都是V2以上，淘气 值是400——1000，浏览深度高，跳失率低，优化效果最佳定制套餐：本站提供了 一个自定义套餐的模板，淘宝递增流量点击下载，拼多多递增流量点击下载。如
				果有相加不满意这些套餐，有自己的想法，可以总一个EXCEL表格，自定义套餐 内容，发给在线客服，客服计价后引导下单
			</div>
		</div>
		<div class="step">
			<p class="title">
				第一步：选择平台类型
			</p>
			<ul class="tab">
				<li v-for="it in typeList" :key="it.typeId" @click="getCurType(it.typeId)" :class="{'active':curType == it.typeId}">{{it.title}}</li>
			</ul>
		</div>
		<div class="step">
			<p class="title">
				第二步：选择流量套餐服务
				<!-- {{priceId}} -->
			</p>
			<el-select v-model="priceId" placeholder="请选择" class="s_select">
				<el-option v-for="item in priceList" :key="item.trafficId" :label="item.text" :value="item.extTrafficId">
				</el-option>
			</el-select>
			<p class="notice">一天套餐默认当天走完，如有指定要求时间的备注在（店铺旺旺）号即可。</p>
		</div>
		<div class="step">
			<p class="title">
				第三步：填写来路信息务
			</p>
			<el-input v-model="storeName" class="input_select" placeholder="请输入店铺名称"></el-input>
			<el-input v-model="keyword" class="input_select" placeholder="请输入关键词如多个关键词用逗号隔开"></el-input>
			<el-input v-model="url" class="input_select" placeholder="请输入商品链接或商品ID，如多个商品用逗号隔开"></el-input>
			<p class="notice">注：关键词最多可以添加5个，用逗号隔开。</p>
			<el-button type="primary" size="middle" @click="trafficSubmitOrder">确认购买</el-button>
		</div>
		<div class="step">
			<p class="title">
				购买必知
			</p>
			<div class="purchase_kown">
				<p>问：下单流程，什么时候安排。</p>
				<p>
					答：
					<span>下单完24小时内安排开始，正常是早上下单，下午可以给您安排好， 晚上下单一般是明天早上给您找主持安排好浏览单。 尽量错开下单 高峰期，最好晚上下单，我们也能有充分时间给亲安排好明天的浏 览任务，当天18:00之前的订单当天处理，过18:00的隔天安排
					</span>
				</p>
			</div>
			<div class="purchase_kown">
				<p>问：下单后，怎么看你们是否已经安排了。</p>
				<p>答：
					<span>下单后，我们这边接受到订单安排好后，后台会显示在处理中。</span>
				</p>
			</div>
			<div class="purchase_kown">
				<p>问：如何计算出我刷多少单，需要多少访客量，才能控制好转化率，提升排名？</p>
				<p>
					答：
					<span>
						买流量为的就是增加宝贝的点击率，收藏加购率，控制转化率进而提升排名。 转化率=总单量/总访客数如果宝贝本身有基础流量访客。转化率=（真实单量 +补单数）/（日常访客+需买访客）。拼多多的顾客可以在商品数据里面查看 行业转化率均值，把转化率控制在其之上。转化太高容易出事。
					</span>
				</p>
			</div>
			<div class="purchase_kown">
				<p>问：你们安排的浏览单，会不会是在一个时间段全部都进来。</p>
				<p>答：
					<span>这点您放心，我们流量是给您一整天均匀给您安排浏览单。</span>
				</p>
			</div>
			<div class="purchase_kown">
				<h2>常见问题：</h2>
				<p>问：你们流量是怎么放的，在哪里放的。</p>
				<p>答：
					<span>我们是在各大刷手密集的平台给您放的浏览单。</span>
				</p>
			</div>
			<div class="purchase_kown">
				<p>问：你们放的浏览是通过关键词搜索进入的，还是直接链接进入的？</p>
				<p>
					答：
					<span>
						刷手通过关键词搜索进主宝贝浏览1分钟左右，再随机浏览1­3款副宝贝， 有收藏的收藏，有购物车的加车。后台 生意参谋可查询</span>
				</p>
			</div>
			<div class="purchase_kown">
				<p>问：流量会不会不安全？</p>
				<p>答：
					<span>流量如果能让店铺降权的话，那随便投放流量到同行店铺让同行降权，那淘宝就乱了。</span>
				</p>
			</div>
			<div class="purchase_kown">
				<p>那对商品有没有什么效果 </p>
				<p>
					答：
					<span>
						第一：流量配合刷单 控制转化率可以降低宝贝因刷单被降权的风险。 第二：宝贝搜索热度能提升宝贝搜索排名。
					</span>
				</p>
			</div>
			<div class="purchase_kown">
				<p>问：我是新店，刚开始不久或者老店很久没打理想刷单又怕系统勘查。</p>
				<p>
					答：
					<span>
						这个看您要以什么方面来购买这份流量，如果只是单纯要逃过系统勘查刷单， 那购买PC的即可，如果是想通过流量来做升权重，排名的，可以试试混合流量， 有PC/APP流量浏览中一部分刷手会给您浏览后收藏跟加入购物车来提升宝贝的权重
					</span>
				</p>
			</div>
			<div class="purchase_kown">
				<p>问：我一天刷10几单，大概需要购买多少流量才能不被系统勘查。。</p>
				<p>
					答：
					<span>
						要逃避系统勘查，这方面您要查看您本身行业的转化率，正常大部分行业 转化率不要超过百分之10%。也就是说我如果刷10单 大概也就是需要100 多左右浏览，逃过系统勘查。
					</span>
				</p>
			</div>
			<div class="purchase_kown">
				<p>问：那么我怎么辨别是你们做的流量还是真实顾客的流量</p>
				<p>答：
					<span>生意参谋里可以看到关键词对应下的访客人数，有明显的效果。</span>
				</p>
			</div>
			<div class="purchase_kown">
				<p>问：你们跟这么多平台合作，单肯定很多，会不会造成单多，而导致质量下降?</p>
				<p>答：
					<span>这点您放心，我们是接单后，会分配给主持给您放单，现合作的主持有200多名。保质保量，这点您放心。</span>
				</p>
			</div>
			<p class="finishNotice">
				<strong>搜索的关键词确保在前1­30页 可卡价钱或地区，中途因修改关键词或者其他操作导致任务浏览失败的或者中途想换词或链接的 联系客服 （浏览失败不计入天数）关键词可卡价钱，卡地区要求可在关键词后面备注一下。
				</strong>
			</p>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				priceId: "",
				typeList: [

				],
				curType: 3,
				url: "", //店铺链接ID
				storeName: "", //店铺名称
				keyword: "", //关键字
				packageName: "", //套餐名称
				price: "", //价格
				priceList: [],
				value: '',
				routerInfo: {
					shopName: '',
					keyWords: '',
					goodsId: ''
				}

			}
		},
		methods: {
			getTypeList() {
				//this.curType = val;
				this.$http.post(this.$API.getTrafficClass, {}).then((res) => {
					if (res.success) {
						this.typeList = res.data;
						this.getTrafficPriceList(); //获取流量价格列表
					} else {
						this.$message({
							type: 'error',
							message: res.message
						})
					}
				})
			},
			getCurType(val) {
				this.curType = val;
				this.getTrafficPriceList();
			},
			getTrafficPriceList() {
				this.$http.post(this.$API.getTrafficPriceList, {
					typeId: this.curType
				}).then((res) => {
					if (res.success) {
            this.priceList = [];
						this.priceList.push(...res.data);
						this.priceId = this.priceList[0].text;
					} else {
						this.$message({
							type: 'error',
							message: res.message
						})
					}
				})

			},
			trafficSubmitOrder() {
				if (!this.url) {
					this.$message({
						type: 'error',
						message: "店铺链接不能为空"
					})
					return false;
				}
				if (!this.storeName) {
					this.$message({
						type: 'error',
						message: "店铺名称不能为空"
					})
					return false;
				}
				if (!this.priceId) {
					this.$message({
						type: 'error',
						message: "请选择流量套餐"
					})
					return false;
				}
				var priceList = this.priceList;
				for (var i = 0; i < priceList.length; i++) {
					if (priceList[i].extTrafficId == this.priceId) {
						this.packageName = priceList[i].title;
						this.price = priceList[i].agentPrice;
						break;
					}
				}
				this.$http.post(this.$API.trafficSubmitOrder, {
					userId: localStorage.getItem("userId"),
					url: this.url,
					storeName: this.storeName,
					keyword: this.keyword,
					packageName: this.packageName,
					price: this.price,
					id: this.priceId,
				}).then((res) => {
					if (res.success) {
						this.$message({
							type: 'success',
							message: res.message
						})

					} else {
						this.$message({
							type: 'error',
							message: res.message
						})
					}



				})
			}

		},
		created() {
			this.getTypeList(); //获取流量类型


		}
	}
</script>

<style lang='less' scoped>
	@import url('./PurchaseFlow.less');
</style>
