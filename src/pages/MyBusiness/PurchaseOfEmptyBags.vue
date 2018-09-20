<template>
	<div id="PurchaseOfEmptyBags">
		<p class="title"> 在线自助购买空包&nbsp;&nbsp;单号</p>
		<div class="notice">
			韵达快递、圆通速递、 支持（折800、蘑菇街、苏宁、微店、美丽说、）等电商平台！
		</div>
		<div class="step">
			<p class="title">
				第一步：设置您的发货地址
				<el-input v-model="condition" class="input_select" placeholder="请输入名字/地址/电话"></el-input>
				<el-button type="primary" size="middle">搜索</el-button>
			</p>
			<div class="select_area">
				<div v-if="DeliveryInfoList && DeliveryInfoList.length>0" class="displayBox">
					<input type="text" class="displayInput" v-model="curAddrText" @click="showOne=!showOne">
					<el-collapse-transition>
						<ul v-if="showOne" cass="aPop">
							<li v-for="item in DeliveryInfoList" :key="item.diId" @click="getDeliveryInfo(item)">{{item.text}}</li>
						</ul>
					</el-collapse-transition>
				</div>
				<el-button v-else type="primary" size="middle" @click="$router.push('/wrap/ReceivingAddress/1')">设置发货地址</el-button>
				<el-button type="primary" size="middle">设为默认</el-button>
			</div>
		</div>
		<div class="step">
			<p class="title">
				第二步：选择快递类型
			</p>
			<ul class="quick_type">
				<li v-for="(it,i) in 6" :key="i" @click="getCurQuickType(i)" :class="{'active':i==curQuickType}">天猫商城</li>
			</ul>
			<div class="select_area">
				<div v-if="KdPriceList && KdPriceList.length>0" class="displayBox">
					<input type="text" class="displayInput" v-model="curKDText" @click="showTwo=!showTwo">
					<el-collapse-transition>
						<ul v-if="showTwo" cass="aPop">
							<li v-for="item in KdPriceList" :key="item.dpId" @click="getDescribe(item)">{{item.priceInfo}}</li>
						</ul>
					</el-collapse-transition>
				</div>
				<el-button type="primary" size="middle">设为默认</el-button>
			</div>
			<p class="details">{{curDetail}}</p>
		</div>
		<div class="step">
			<p class="title">
				第三步：请严格按样式图去复制地址提交，否则无法购买单号
			</p>
			<img src="../../assets/img/purchaseEB.jpg" alt="">
			<p class="details">收货地址格式：李四，15888888888，广东省 广州市 番禺区 岭南大道321号 ，330006 *</p>
		</div>
		<div class="step">
			<p class="title">
				第四步：填写收货地址↓可批量购买单号，每行一个地址，每个地址后面以*结尾，收货人姓名，收货地址，电话，邮箱之间用英文输入法的逗号','隔开，最多2000个地址{{addrList}}
			</p>
			<textarea v-model='addrList' placeholder="例如：李四,15888888888,广东省 广州市 番禺区 岭南大道321号,330006*"></textarea>
			<p class="moduleUp">
				商品名称（
				<span>必填</span>）：
				<el-input v-model="goodsName" class="input_select" placeholder="请输入商品名称"></el-input>
				<el-button type="warning" size="middle" @click="addAddr = true">真实订单区分器</el-button>
				<el-button type="danger" size="middle" @click='downloadPop = true'>点击选择下载快递上传模板</el-button>
			</p>
			<p class="weight">
				快递重量：
				<el-input v-model="kg" class="input_select"></el-input>
				公斤，本网站代发空包可按照顾客的重量发出，同步快递公司内网信息。
			</p>
			<div class="book">
				<el-button type="success" size="middle" @click='showAddrList'>检查收货地址</el-button>
				余额：
				<span>0.00</span> 元，【
				<span>普通会员</span> 】下单：
				<span>{{myPrice}}</span>元/单。 下单总金额：
				<span>{{(myPrice*itemsList.length).toFixed(3)}}</span>元。
        <el-button type="success" size="middle" @click='update = true'>选择导入摸板</el-button>
			</div>
			<p class="confirmPuechase">
				<el-button type="primary" size="middle" @click="saveOrder">确认购买</el-button>
			</p>
		</div>
		<!-- 订单在线区分器 -->
		<el-dialog title="订单在线区分器" :visible.sync="addAddr" width="500px" class="addAddress">
			<div>
				<textarea></textarea>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addAddr = false">取 消</el-button>
				<el-button type="primary" @click="addAddr = false">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 选择下载模板 -->
		<el-dialog title="模板选择" :visible.sync="downloadPop" width="500px" class="downloadPop">
			<div @click='downloadPop=false' class='selectM'>
				<a :href="downloadUrl1">京东模板</a>
				<a :href="downloadUrl2">拼多多模板</a>
			</div>
		</el-dialog>
    <!-- 选择模板 -->
    <el-dialog title="模板选择" :visible.sync="downloadPop" width="500px" class="downloadPop">
    	<div @click='downloadPop=false' class='selectM'>
    		<a :href="downloadUrl1">京东模板</a>
    		<a :href="downloadUrl2">拼多多模板</a>
    	</div>
    </el-dialog>
    <!-- 选择上传模板 -->
    <el-dialog title="导入模板选择" :visible.sync="update" width="500px" class="downloadPop">
    	<div @click='update=false' class='selectM'>
				<form>
          <input type="file" name="fileup" id="uploadEventFile" @change="fileChange($event)" style="display:none" />
        </form>
        <el-button type="primary" size="middle" plain @click="importData(1,$event)">导入淘宝京东模板</el-button>
        <el-button type="primary" size="middle" plain @click="importData(2,$event)">导入拼多多模板</el-button>
    	</div>
    </el-dialog>
    <!-- 检查收货地址 -->
    <el-dialog title="收货地址" :visible.sync="reciveAddr" width="900px" class="downloadPop displayAddr">
      <ul class="disTitle">
          <li>
            <span>序号</span>
            <span>收货人姓名</span>
            <span>收货人电话</span>
            <span>收货人地址</span>
            <span>邮箱</span>
          </li>
      </ul>
      <ul class="disList">
      		<li v-for="(it,i) in displayAddrList" :key='i'>
      			<span>{{i+1}}</span>
      			<span>{{it[0]}}</span>
      			<span>{{it[1]}}</span>
      			<span>{{it[2]}}</span>
      			<span>{{it[3]}}</span>
      		</li>
      </ul>
      <p class="total">{{itemsList.length}}&nbsp;X&nbsp;{{myPrice}}={{(itemsList.length*myPrice).toFixed(3)}}元</p>
    </el-dialog>
	</div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      condition: "",
      activeName: "",
      curQuickType: 0,
      goodsName: "",
      goodsWeight: 0,
      addr: "",
      priceType: "",
      addAddr: false,
      KdPriceList: [],
      DeliveryInfoList: [],
      curDetail: "",
      //下单数据
      postAddrItem: {
        city: "",
        addr: "",
        postName: "",
        area: "",
        province: "",
        postPhone: ""
      },
      diId: "",
      addrList: "",
      kdid: "", //需要购买的快递Id(外部系统ID)
      dpId: "", //需要购买的快递Id(内部系统ID)
      expressType: "", //快递类型
      kg: "", //货物重量
      num: "", //货物数量
      paymentAmount: "", //应付总金额,,
      myPrice: "",
      curAddrText: "",
      showOne: false,
      curKDText: "",
      showTwo: false,
      upload: "",
      downloadUrl1: "",
      downloadUrl2: "",
      downloadPop: false,
      templateType: "",
      update: false,
      reciveAddr: false,
      mList:[]
    };
  },
  created() {
    this.getDeliveryInfoList();
    this.downloadUrl1 =
      this.$serve.http + this.$API.download + "?templateType=1";
    this.downloadUrl2 =
      this.$serve.http + this.$API.download + "?templateType=2";
    this.getKdPriceList();
  },
  computed: {
    itemsList() {
      let arr = this.addrList.split("*");
      arr = arr.slice(0, arr.length - 1);
      let brr = [];
      for (let i = 0; i < arr.length; i++) {
        let addrMap = {
          msg: arr[i]
        };
        brr.push(addrMap);
      }
      return brr;
    },
    displayAddrList(){
      let crr = this.itemsList.map(x=>{
        return x.msg.split(',')
      })
      return crr
    }
  },
  methods: {
    importData(v, event) {
      this.templateType = v;
      event.preventDefault();
      $("#uploadEventFile").trigger("click");
    },
    fileChange(el) {
      el.preventDefault(); //取消默认行为
      let vm = this;
      let uploadEventFile = $("#uploadEventFile").val();
      this.file = el.target.files[0];
      if (uploadEventFile == "") {
        alert("请择excel,再上传");
      } else if (
        uploadEventFile.lastIndexOf(".xls") > 0 ||
        uploadEventFile.lastIndexOf(".XLS") > 0
      ) {
        let formData = new FormData();

        formData.append("filename", this.file);
        formData.append("templateType", this.templateType);
        let config = {
          // 一定要定义头
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        // url为对应的后端接口
        vm.$http
          .post(this.$API.getExcelInfo, formData, config)
          .then(response => {
            let list = response.data;
            let crr = '';
            if (this.templateType==1) {
            	list.map(x=>{
            		crr = x.name+','+x.tel+','+x.address+'*\n';
            		this.addrList = crr+this.addrList;
            	})  
            } else{
            	list.map(x=>{
            		crr = x.name+','+x.tel+','+x.province+x.city+x.area+x.street+'*\n';
            		this.addrList = crr+this.addrList;
            	}) 
            }
            this.$message({
              message: "上传成功",
              type: "success"
            });
          });
      } else {
        this.$message({
          message: "上传失败",
          type: "error"
        });
      }
    },
    getCurQuickType(val) {
      this.curQuickType = val;
    },
    //地址列表
    getDeliveryInfoList() {
      this.$http
        .post(this.$API.getDeliveryInfoList, {
          userId: localStorage.getItem("userId")
        })
        .then(res => {
          if (res.success == true) {
            this.DeliveryInfoList = res.data;
            if (res.data.length > 0) {
              this.curAddrText = res.data[0].text;
            }
          } else {
            this.$message({
              message: res.message,
              type: "error"
            });
          }
        });
    },
    //检查收货地址
    showAddrList() {
      if (!this.expressType) {
        this.$message({
          message: "请选择收货地址",
          type: "error"
        });
        return;
      }
      this.reciveAddr = true;
    },
    //快递类型列表
    getKdPriceList() {
      this.$http
        .post(this.$API.getKdPriceList, {
          userId: localStorage.getItem("userId")
        })
        .then(res => {
          if (res.success == true) {
            this.KdPriceList = res.data;
            this.curKDText = res.data[0].priceInfo;
            this.myPrice = res.data[0].myPrice;
            this.expressType = res.data[0].kdName;
          } else {
            this.$message({
              message: res.message,
              type: "error"
            });
          }
        });
    },
    //快递获取描述
    getDescribe(v) {
      this.showTwo = !this.showTwo;
      this.curKDText = v.priceInfo;
      this.dpId = v.dpId;
      this.kdid = v.extKdId;
      this.expressType = v.kdName;
      this.myPrice = v.myPrice;
      this.curDetail = v.describe;
    },
    //获取收货信息详情
    getDeliveryInfo(v) {
      this.showOne = !this.showOne;
      this.diId = v.diId;
      this.curAddrText = v.text;
      this.postAddrItem = {
        city: v.deliveryCity,
        addr: v.addressDetail,
        postName: v.deliveryName,
        area: v.deliveryArea,
        province: v.deliveryProvince,
        postPhone: v.deliveryTel
      };
    },
    //下单
    saveOrder() {
      let num = this.itemsList.length;
      this.$http
        .post(this.$API.saveOrder, {
          userId: localStorage.getItem("userId"),
          diId: this.diId,
          postAddrItem: this.postAddrItem,
          itemsList: this.itemsList,
          kdid: this.kdid,
          dpId: this.dpId,
          expressType: this.expressType,
          kg: this.kg,
          num: num,
          paymentAmount: (this.myPrice * num).toFixed(3)
        })
        .then(res => {
          if (res.success == true) {
            this.$message({
              message: res.message,
              type: "success"
            });
          } else {
            this.$message({
              message: res.message,
              type: "error"
            });
          }
        });
    }
  }
};
</script>

<style lang='less' scoped>
@import url("./PurchaseOfEmptyBags.less");
</style>
