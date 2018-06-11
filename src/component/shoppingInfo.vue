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
                                <li>
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
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-for="item in goodsList" :key="item.id">
                                    <th width="48" align="center">
                                        <el-switch
                                        v-model="item.isSelected"
                                        active-color="#13ce66"
                                        inactive-color="#555555">
                                        </el-switch>
                                    </th>
                                    <th align="left" colspan="2">
                                        <div class="goodsInfo">
                                            <img :src="item.img_url" alt="">
                                            {{item.title}}
                                        </div>
                                        
                                    </th>
                                    <th width="84" align="left">{{item.sell_price}}</th>
                                    <th width="104" align="center">
                                        <inputNumber :goodsId="item.id" :goodsCount="item.buycount" @getChangeCount="handlerGoodsData"></inputNumber>
                                    </th>
                                    <th width="104" align="left">{{item.sell_price*item.buycount}}(元)</th>
                                    <th width="54" align="center">
                                        <a @click="deleteGoods(item.id)" >删除</a>
                                    </th>
                                </tr>
                                <tr v-if="$store.getters.getGoodsData==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{getTotalCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{getTotalMoney}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" @click="continueShopping" >继续购物</button>
                            <button class="submit" @click="postTheOrder">提交订单</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
  </div>
</template>
<style>
    .goodsInfo{
        /* width: 50px;
        height: 50px; */
        /* text-align: center; */
        display: flex;
        align-items: center;
    }
    .goodsInfo img{
        width: 50px;
        height: 50px;
        margin-right: 5px;
    }
  
</style>

<script>
    import inputNumber from '../subComponent/inputNumber.vue'
    export default{
        data(){
            return{
                goodsList:[],
                
            }
        },
        created(){
            this.getGoodsData();
        },
        components:{
            inputNumber
        },
        computed:{
            getTotalCount:function(){
                let totalCount=0;
                this.goodsList.forEach(function (item) {
                    if(item.isSelected){
                        totalCount+=item.buycount;
                    }
                  })
                 return totalCount;
            },
            getTotalMoney:function () { 
                let totalMoney=0;
                this.goodsList.forEach(function (item) {
                    if(item.isSelected){
                        totalMoney+=item.buycount*item.sell_price;
                    }
                  })
                 return totalMoney;
             }
        },
        methods:{
            getGoodsData(){
                const localGoodSData=JSON.parse(localStorage.getItem('goodsData'))
                // console.log(localGoodSData)
                let idArr=[]
                for (var key in localGoodSData) {
                    idArr[idArr.length]=key;
                }
                // console.log(idArr);
                const url=`site/comment/getshopcargoods/${idArr.join(',')}`
                this.$axios.get(url).then(response=>{
                    // console.log(response.data)
                    response.data.message.forEach(function(element) {
                        element.buycount = localGoodSData[ element.id]
                        element.isSelected=true;
                    });
                    this.goodsList=response.data.message;
                    
                })
            },
            handlerGoodsData(goods){
                // 取到商品的数据，将goods中的数量进行更改
                this.goodsList.forEach((item)=>{
                    if(item.id==goods.goodsId){
                        item.buycount=goods.goodsCount;
                    }
                })
                // 激活vuex中的updateGoods方法，将goods作为参数传过去
                this.$store.commit("updateGoods",goods)
            },
            // 这里的goodsId是形参
            deleteGoods(goodsId){
                // 根据id找到这条数据在goodlist 中的索引，先删除这条数据，之后消除vuex中的数据和localStorage中的数据,
                this.$confirm('是否删除Id为'+goodsId+'的商品?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        const index= this.goodsList.findIndex((item)=>{//item为goodslist中的每一条信息
                            return item.id==goodsId
                        })
                        // 删除这条信息
                        this.goodsList.splice(index,1);
                        // 激活vuex中的deleteGoods方法，将goodsId作为参数传过去
                        this.$store.commit('deleteGoods',goodsId);
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                    });
               
            },
            continueShopping(){
                // console.log(11111)
                this.$router.push({path:"/site/goodsList"})
            },
            postTheOrder(){
                // 提交订单要先判断是否登录，如果没有登录就跳转到登录页，有登录就去订单页
               const temArr=[];
               this.goodsList.forEach((item)=>{
                   if(item.isSelected){//被选中的商品Id才被传过去
                        temArr.push(item.id);
                   }
               })
            //    console.log(temArr)
               if(temArr.length==0){
                   this.$message({
                        message: '没有选中任何商品哦，最少要一件商品哦',
                        type: 'warning'
                    });
                    return;
               }
                this.$router.push({path:"/site/order/"+temArr.join(',')})
            }
        }
    }
</script>
