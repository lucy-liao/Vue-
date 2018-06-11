<template>
  <div>
      <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li class="active">
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <div id="orderForm" name="orderForm" url="">
                          <!-- 进行表达单验证，填制的数据需提交， -->
                          <!-- 表单form上的order里面的东西提交， rules里面的内容给下面的内容进行验证 ,ref为下面发起验证做准备-->
                            <el-form :model="order" :rules="rules" ref="orderForm" label-width="150px" class="demo-ruleForm" status-icon>
                                <el-form-item label="收件人姓名" prop="accept_name" style="width:600px">
                                    <el-input v-model="order.accept_name"></el-input>
                                </el-form-item>
                                <el-form-item label="所属地区：" prop="area">
                                    <v-distpicker  @selected="onSelected" :province="order.area.province.value" :city="order.area.city.value" :area="order.area.area.value"></v-distpicker>
                                </el-form-item>
                                <el-form-item label="详细地址" prop="address" style="width:600px">
                                    <el-input v-model="order.address"></el-input>
                                </el-form-item>
                                <el-form-item label="手机号码" prop="mobile" style="width:600px">
                                    <el-input v-model="order.mobile"></el-input>
                                </el-form-item>
                                <el-form-item label="电子邮箱：">
                                    <el-input style="width:600px;" v-model="order.email"></el-input>
                                </el-form-item>
                                <el-form-item label="邮政编码：">
                                    <el-input style="width:250px;" v-model="order.post_code"></el-input>
                                </el-form-item>
                            </el-form>
                            <h2 class="slide-tit">
                                <span>2、支付方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <label>
                                        <el-radio v-model="order.payment_id" label="6">在线支付</el-radio>
                                        <em>手续费：0.00元</em>
                                    </label>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>3、配送方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <el-radio-group @change="switchExpress" v-model="order.express_id">
                                        <el-radio label="1">顺丰快递(20.00元)</el-radio> 
                                        <el-radio label="2">圆通快递(10.00元)</el-radio> 
                                        <el-radio label="3">韵达快递(8.00元)</el-radio> 
                                    </el-radio-group>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>4、商品清单</span>
                            </h2>
                            <div class="line15"></div>
                            <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                <tbody>
                                    <tr>
                                        <th colspan="2" align="left">商品信息</th>
                                        <th width="84" align="left">单价</th>
                                        <th width="84" align="center">购买数量</th>
                                        <th width="104" align="left">金额(元)</th>
                                    </tr>
                                    <tr v-for="item in orderList" :key="item.id">
                                        <td width="68">
                                            <a target="_blank" href="/goods/show-89.html">
                                                <img :src="item.img_url" class="img">
                                            </a>
                                        </td>
                                        <td>
                                            <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                                        </td>
                                        <td>
                                            <span class="red">
                                                ￥{{item.sell_price}}
                                            </span>
                                        </td>
                                        <td align="center">{{item.buycount}}</td>
                                        <td>
                                            <span class="red">
                                                ￥{{item.buycount*item.sell_price}}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="line15"></div>
                            <h2 class="slide-tit">
                                <span>5、结算信息</span>
                            </h2>
                            <div class="buy-foot clearfix">
                                <div class="left-box">
                                    <dl>
                                        <dt>订单备注(100字符以内)</dt>
                                        <dd>
                                            <textarea name="message" class="input" style="height:35px;" v-model="order.message" ></textarea>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="right-box">
                                    <p>
                                        商品
                                        <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                        <label id="goodsAmount" class="price">{{totalAmount}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p>
                                        运费：￥
                                        <label id="expressFee" class="price">{{order.expressMoment}}</label> 元
                                    </p>
                                    <p class="txt-box">
                                        应付总金额：￥
                                        <label id="totalAmount" class="price">{{getSum}}</label>
                                    </p>
                                    <p class="btn-box">
                                        <a class="btn button" href="/cart.html">返回购物车</a>
                                        <a id="btnSubmit" class="btn submit" @click="goToOrder">确认提交</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

  </div>
</template>
<script>
// 省级联动插件的导入,集成。
import VDistpicker from 'v-distpicker'
  export default{
    data(){
      var checkMobile = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号码不能为空'));
        }
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;  
          if (!myreg.test(value)) {  
              callback(new Error('手机号码非法'))
          } else {  
              callback();
          }  
      }
      return{
        totalCount:'',
        totalAmount:'',
        orderList:{},//页面渲染商品信息
        // 下面是表单验证内容orderForm为提交的内容，rules为表单验证规则
        order:{
           accept_name:'廖路', //收货人姓名
           area:{
              province: { code: 440000, value: '广东省' },
              city: { code: 440300, value: '深圳市' },
              area: { code: 440306, value: '宝安区' }
           },
           address:"中粮商务公园3栋17楼",//详细地址
           mobile:"13317548748",//电话号码//需自定义验证
            email:"hejie@163.com",//电子邮箱
            post_code:"518000",//邮政编码
            payment_id:"6",//在线支付的方式
            express_id:"1",//快递方式
            message:"急用，请快点发货",
            expressMoment:20,
        },
        rules:{
          accept_name: [
            { required: true, message: '请输入收件人姓名', trigger: 'blur' },
          ],
          address: [
            { required: true, message: '请输入收件人姓名', trigger: 'blur' },
          ],
          mobile: [
            { validator: checkMobile, trigger: 'blur' }
          ],
          area: [
                        { required: true, message: '请选择所属地区', trigger: 'blur' }
                    ],
        }
      }
    },
    created(){
      this.getOrderData();
    },
    computed:{
      getSum(){
        return this.totalAmount+this.order.expressMoment
      }
    },
    methods:{
      getOrderData(){
        this.order.goodsids=this.$route.params.goodsId;
        // console.log(this.order.goodsId);
        const localData=JSON.parse(localStorage.getItem("goodsData"));
        console.log(localData);
        this.order.cargoodsobj=localData;
        const url=`site/validate/order/getgoodslist/${this.$route.params.goodsId}`
        const that=this;
        this.$axios.get(url).then(response=>{

          // console.log(response.data)
          let temtotalCount=0;
          let temtotalAmount=0;          
          response.data.message.forEach(function(item) {
               //   如果发现id在本地找不到，就直接跳到商品列表页
              if(localData[item.id]==undefined){
                  that.$router.push({path:"/site/goodsList"});
                  return;
              }
            // console.log(localData[item.id])
            item.buycount=localData[item.id];
            temtotalCount+=item.buycount;
            temtotalAmount+=item.buycount*item.sell_price;
             
          });
          this.totalCount=temtotalCount;
          this.totalAmount=temtotalAmount;
          this.order.goodsAmount=temtotalAmount;
          // console.log(response.data)
          this.orderList=response.data.message;
      

        })
      },
      onSelected(area) {
          // alert(data.province + ' | ' + data.city + ' | ' + data.area)
          this.order.area = area
            
      },
      switchExpress(label){
        switch (label) {
          case "1":
              this.order.expressMoment=20
            break;
          case "2":
              this.order.expressMoment=10
            break;
          case "3":
              this.order.expressMoment=8
            break;
          default:
            break;
        }
      },
      goToOrder(){
        // 提交订单时，对表单进行验证，并
        this.$refs.orderForm.validate((valid) => {
          if (valid) {//验证通过，打印下提交的信息，进行比对看信息是否正确，调用接口，发送POST请求，获取订单Id,根据订单id获取订单信息
            console.log(this.$refs.orderForm)
            const url=`site/validate/order/setorder`;
            this.$axios.post(url,this.order).then(response=>{
                // 
                if(response.data.status==0){
                  // 根据商品Id清除数据库中的数据，并跳转到订单详情页
                  var temArr=this.$route.params.goodsId.split(',')
                  temArr.forEach(goodsId=>{
                    this.$store.commit('deleteGoods',goodsId);
                  });
                  // 跳转到详情页
                  this.$router.push({path:"/site/orderInfo/"+response.data.message.orderid})
                }else{
                  this.$message.error("评论失败");
                  return;
                }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      }
    
    },
    components: { VDistpicker }
  }
</script>
