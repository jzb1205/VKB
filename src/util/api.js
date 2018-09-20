const api = {
	//权限管理
	getTreeList: 'Tree/getTreeList',
  
  //我的业务
  getDeliveryInfoPage:'DeliveryInfo/getDeliveryInfoPage', //获取发货地址列表(分页)
  addAddressInfo:'DeliveryInfo/addAddressInfo',//新增发货地址
  delDeliveryInfo:'DeliveryInfo/delDeliveryInfo',//删除发货地址(可批量删除)
  //购买空包
  getDeliveryInfoList:'DeliveryInfo/getDeliveryInfoList',//获取发货地址列表(不分页)
  getKdPriceList:'kdPrice/getKdPriceList',//获取快递空包价格列表
  saveOrder:'BuyEmptyBag/saveOrder',//确认购买(下单)
  //已买空包
  getDeliveryOrderListByPage:'deliveryOrder/getDeliveryOrderListByPage',//获取空包订单列表
  //购买流量
  getTrafficClass:'TrafficSellectionClass/getTrafficClass',//获取平台流量类型
  getTrafficPriceList:'Traffic/getTrafficPriceList',//获取流量价格列表
  submitOrder:'Traffic/submitOrder',//流量下单
  //已买流量
  getTrafficOrderPage:'TrafficOrder/getTrafficOrderPage',//获取流量订单列表(分页)
  //购买收藏
  getCollectionClass:'TrafficSellectionClass/getCollectionClass',//获取平台收藏类型
  getCollectionPriceList:'Collection/getCollectionPriceList',//获取收藏价格列表
  submitOrder:'Collection/submitOrder',//收藏下单
  //已买收藏
  getCollectionOrderPage:'Collection/getCollectionOrderPage',//获取收藏订单列表(分页)
  
  
  //用户管理
  register:'SysUser/register',//注册
  login:'SysUser/login',//登录
  getUserInfo:'SysUser/getUserInfo',//获取用户信息
  updateUserPass:'SysUser/updateUserPass',//修改密码
  getOfflineList:'SysUser/getOfflineList',//推广奖励,获取下线列表,
  getKdPriceDetail:'kdPrice/getKdPriceDetail',//快递空包价格清单
  upgradeMember:'SysUser/upgradeMember',
  
  //财务管理
  getAccountFlowPage:'AccountFlow/getAccountFlowPage',//获取资金明细列表(分页),
  getRechargeRecordPage:'RechargeRecord/getRechargeRecordPage',//获取资金明细列表(分页),

	//我的业务
	getDeliveryInfoPage: 'DeliveryInfo/getDeliveryInfoPage', //获取发货地址列表(分页)
	addAddressInfo: 'DeliveryInfo/addAddressInfo', //新增发货地址
	delDeliveryInfo: 'DeliveryInfo/delDeliveryInfo', //删除发货地址(可批量删除)
	//购买空包
	getDeliveryInfoList: 'DeliveryInfo/getDeliveryInfoList', //获取发货地址列表(不分页)
	getKdPriceList: 'kdPrice/getKdPriceList', //获取快递空包价格列表
	download: 'excel/download', //下载拼多多、淘宝京东模板
	getExcelInfo: 'excel/getExcelInfo', //下载拼多多、淘宝京东导入EXCEL
	saveOrder: 'BuyEmptyBag/saveOrder', //确认购买(下单)
	//已买空包
	getDeliveryOrderListByPage: 'deliveryOrder/getDeliveryOrderListByPage', //获取空包订单列表
	//购买流量
	getTrafficClass: 'TrafficSellectionClass/getTrafficClass', //获取平台流量类型
	getTrafficPriceList: 'Traffic/getTrafficPriceList', //获取流量价格列表
	submitOrder: 'Traffic/submitOrder', //流量下单
	//已买流量
	getTrafficOrderPage: 'TrafficOrder/getTrafficOrderPage', //获取流量订单列表(分页)
	//购买收藏
	getCollectionClass: 'TrafficSellectionClass/getCollectionClass', //获取平台收藏类型
	getCollectionPriceList: 'Collection/getCollectionPriceList', //获取收藏价格列表
	submitOrder: 'Collection/submitOrder', //收藏下单
	//已买收藏
	getCollectionOrderPage: 'Collection/getCollectionOrderPage', //获取收藏订单列表(分页)


	//用户管理
	register: 'SysUser/register', //注册
	login: 'SysUser/login', //登录
	getUserInfo: 'SysUser/getUserInfo', //获取用户信息
	updateUserPass: 'SysUser/updateUserPass', //修改密码
	getOfflineList: 'SysUser/getOfflineList', //推广奖励,获取下线列表,
	getKdPriceDetail: 'kdPrice/getKdPriceDetail', //快递空包价格清单
	upgradeMember: 'SysUser/upgradeMember',

	//财务管理
	getAccountFlowPage: 'AccountFlow/getAccountFlowPage', //获取资金明细列表(分页),
	getRechargeRecordPage: 'RechargeRecord/getRechargeRecordPage', //获取资金明细列表(分页),
}
export default api;
