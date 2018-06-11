<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="javascript:;">支付中心</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment">
                        <div class="el-row">
                            <div class="el-col el-col-18">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{orders.order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{orders.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{orders.address}}
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{orders.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{orders.order_amount}} 元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                        <div class="el-col el-col-12">
                                                <dl class="form-group">
                                                    <dt>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</dt>
                                                    <dd>{{orders.message}}</dd>
                                                </dl>
                                            </div>
                                </div>
                            </div>
                            <div class="el-col el-col-6">
                                <img id="imgLogo" src="../statics/site/images/alipay.png" hidden>
                                <div id="container">
                                    <canvas width="400" height="400"></canvas>
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
import '../statics/site/js/jqplugins/qrcode/qrcode'
    export default{
        data(){
            return{
                orders:{},
                timer:null,
            }
        },
        created(){
            this.getOrder();
            this.getPaySuccess();
        },
        mounted(){
            // 文字
            //  $("#container").erweima({
            //     label: 'jQuery'
            // });
            // 图片
             $('#container').erweima({
                mode: 4,
                mSize:20,
                image: $("#imgLogo")[0],
                text:`http://47.106.148.205:8899/site/validate/pay/alipay/${this.$route.params.orderId}`
            });
        },
        beforeDestroy(){
            clearInterval(this.timer);
        },
        methods:{
            getOrder(){
                const url=`site/validate/order/getorder/${this.$route.params.orderId}`
                this.$axios.get(url).then(response=>{
                    // console.log(response.data)
                    // 查询如果response。data.status==2,的话，直接跳到订单成功页
                    if(response.data.message[0].status==2){
                        this.$router.push({path:"/site/paySuccess"})
                    }
                    this.orders=response.data.message[0];
                })
            },
            getPaySuccess(){
                this.timer=setInterval(()=>{
                    const url=`site/validate/order/getorder/${this.$route.params.orderId}`
                    this.$axios.get(url).then(response=>{
                        if(response.data.message[0].status==2){
                            this.$router.push({path:"/site/paySuccess"})
                        }
                    })
                },3000)
            }
        }
    }
</script>
