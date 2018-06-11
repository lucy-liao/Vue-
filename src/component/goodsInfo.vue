   <template>
 
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section" v-if="goods.goodsinfo">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <div class="magnifier" id="magnifier1">
                                  <div class="magnifier-container">
                                        <div class="images-cover"></div>
                                        <!--当前图片显示容器-->
                                        <div class="move-view"></div>
                                        <!--跟随鼠标移动的盒子-->
                                    </div>
                                    <div class="magnifier-assembly">
                                        <div class="magnifier-btn">
                                            <span class="magnifier-btn-left">&lt;</span>
                                            <span class="magnifier-btn-right">&gt;</span>
                                        </div>
                                        <!--按钮组-->
                                        <div class="magnifier-line">
                                            <ul class="clearfix animation03">
                                                <li v-for="item in goods.imglist" :key="item.id">
                                                    <div class="small-img">
                                                        <img :src="item.thumb_path" />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <!--缩略图-->
                                    </div>
                                    <div class="magnifier-view"></div>
                                    <!--经过放大的图片显示容器-->
                                </div>
                            </div>       
 
                            <div class="goods-spec">
                                <h1>{{goods.goodsinfo.title}}</h1>
                                <p class="subtitle">{{goods.goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goods.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">{{goods.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">{{goods.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number v-model="num"  :min="1" :max="goods.goodsinfo.stock_quantity" size="small"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goods.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="addToShopCar" class="add" ref="addToShopCartRef">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                 <Affix>
                                <ul>
                                    <li>
                                        <a href="javascript:;" @click="isShowcomment=!isShowcomment" :class="!isShowcomment ? 'selected':''">商品介绍</a>
                                    </li>
                                    <li>
                                        <a href="javascript:;" @click="isShowcomment=true" :class="isShowcomment ? 'selected' : ''">商品评论</a>
                                    </li>
                                </ul>
                                 </Affix>
                            </div>
                            <div v-show="!isShowcomment" class="tab-content entry" style="display: block;" v-html="goods.goodsinfo.content">
                                
                            </div>
                            <div v-show="isShowcomment" class="tab-content" style="display: block;">
                                <div class="comment-box" >
                                    <div id="commentForm" name="commentForm"
                                        class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea ref="postcommentref" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit" @click="postComment">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box" >
                                        <p  v-if="commentlist.totalcount <= 0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in commentlist.message" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time|fmtData('YYYY-MM-DD HH:mm:ss')}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <!-- <div id="pagination" class="digg"> -->
                                            <el-pagination
                                                @size-change="handleSizeChange"
                                                @current-change="handleCurrentChange"
                                                :current-page="pageIndex"
                                                :page-sizes="[2, 5, 10, 20]"
                                                :page-size="pageSize"
                                                layout="total, sizes, prev, pager, next, jumper"
                                                :total="commentlist.totalcount">
                                            </el-pagination>
                                        <!-- </div> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in goods.hotgoodslist" :key="item.id"> 
                                        <div class="img-box">
                                            <router-link :to="'/site/goodsinfo/'+item.id" class="">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <a href="#/site/goodsinfo/90" class="">{{item.title}}</a>
                                            <span>{{item.add_time|fmtData}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
         <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
            <div v-show="isShowAnimateImg" ref="animateImgRef" v-if="goods.imglist" class="animateImg">
                <img :src="goods.imglist[0].thumb_path" alt="">
            </div>
        </transition>
    </div>
   
          
   </template>
   <script>
   //按需引入组件
   import { Affix } from 'iview';
   import"../statics/site/js/jqplugins/jqimgzoom/js/magnifier";
        export default {
        data() {
            return {
            goods: {},
            num: 1,
            isShowcomment:false,
            pageIndex:1,
            pageSize:2,
            commentlist:{},
            isShowAnimateImg:false,
            addToShopCartOffset: null,//加入购物车按钮的偏移量
            shoppingCartCountOffset: null,
            };
        },
        components: {//在这里注册我们goodsinfo.vue的所有子组件
            Affix
        },
        watch:{
            $route:function (newValue, oldValue) {  
                 this.getinfoData();
                 this.getCommentContent();
            }
        },
        updated(){
             $('#magnifier1').imgzoon({magnifier:'#magnifier1'});
        },
        created() {
            this.getinfoData();
            this.getCommentContent();
        },
        methods: {
            getinfoData() {
            const url = `site/goods/getgoodsinfo/${this.$route.params.goodsId}`;
            this.$axios
                .get(url)
                .then(response => {
                // console.log(response.data);
                this.goods = response.data.message;
                // /写在这里更加准备
                    setTimeout(() => {
                        this.addToShopCartOffset = $(this.$refs.addToShopCartRef).offset()
                    //     //给我们动画的元素设置top、left
                        $(this.$refs.animateImgRef).css({
                            left: this.addToShopCartOffset.left,
                            top: this.addToShopCartOffset.top
                        })

                        //获取App.vue中的购物车图标的偏移量
                        this.shoppingCartCountOffset = $("#shoppingCartCount").offset()
                    }, 200);
                })
                .catch(err => {
                console.log(err);
                });
            },
            getCommentContent(){
                const url = `site/comment/getbypage/goods/${this.$route.params.goodsId}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`;
                this.$axios
                .get(url)
                .then(response => {
                // console.log(response.data);
                this.commentlist = response.data;
                })
                .catch(err => {
                console.log(err);
                });
            },
            handleSizeChange(pageSize){
                this.pageIndex=1;
                this.pageSize=pageSize;
                this.getCommentContent();
            },
            handleCurrentChange(pageIndex){
                this.pageIndex=pageIndex;
                this.getCommentContent();
            },
            postComment(){
                // 获w文本框中的内容，ref的设置，有vm.$ref.postCommentRef"来获取
                // console.log(this.$refs.postcommentref);
                const commenttxt=this.$refs.postcommentref.value;
                if(commenttxt.trim().length==0){
                        this.$message({
                            message: '请输入内容',
                            type: 'warning'
                            });
                            return;
                }
                const url=`site/validate/comment/post/goods/${this.$route.params.goodsId}`
                this.$axios.post(url,{commenttxt:commenttxt}).then(response=>{
                    // console.log(response.data)
                    if(response.data.status!=0){
                        this.$message({
                            message: '评论失败',
                            type: 'warning'
                            });
                    }
                                  // 清空文本框
                this.$refs.postcommentref.value="";
                    this.$message({
                            message: '评论成功',
                            type: 'success'
                            });
                
                // 跳到第一页并刷新数
                this.pageIndex=1;
                this.getCommentContent();
                })
              
            },
        // ------------------产品图片运动开始--------------------
            addToShopCar(){
                this.isShowAnimateImg=true;
                // console.log(this.shoppingCartCountOffset);
                const goods={
                    goodsId:this.$route.params.goodsId,
                    count:this.num,
                }
                // console.log(goods);
                // 激活mutation，将goods提交给mutation
                // console.log( this.$store);
                this.$store.commit('addGoods',goods)//第一个参数是mutation中的函数名，第二个参数为要给他的数据
            },
            // ------------动画开始
            beforeEnter: function (el) {
                    // 设置图片的位置
                    el.style.left=this.addToShopCartOffset.left+"px";
                    el.style.top=this.addToShopCartOffset.top+"px";
                    el.style.transform="scale(1)"
                },
                // 此回调函数是可选项的设置
                // 与 CSS 结合时使用
                enter: function (el, done) {
                    // 刷新动画帧
                    el.offsetWidth;
                    el.style.left=this.shoppingCartCountOffset.left+"px";
                    // console.log()
                    el.style.top=this.shoppingCartCountOffset.top+"px";
                    el.style.transform="scale(0.5)"
                    done()
                },
                afterEnter: function (el) {
                     this.isShowAnimateImg = false;
                },
        }
        };
</script>
<style>
    @import "../statics/site/js/jqplugins/jqimgzoom/css/magnifier.css";

    .animateImg {
        height: 50px;
        width: 50px;
        position: absolute;
        top: 0;
        left: 0;
        transition: all .5s;
    }

    .animateImg img {
        width: 100%;
        height: 100%;
    }
</style>

