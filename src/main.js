
import Vue from 'vue'
// import Vuex from 'vuex'
import App from './App.vue'
import moment from 'moment'
import {Button,InputNumber,Pagination,Carousel,CarouselItem,Form,FormItem,Radio,RadioGroup,Switch,Row,Col,Input,Message,MessageBox} from 'element-ui';
// element 完整导入
// Vue.use(ElementUI);
// element按需导入
// import 'element-ui/lib/theme-chalk/index.css';//生产阶段不需要导入，会自动导入上一步use的样式，开发阶段必须导入
Vue.use(InputNumber)
Vue.use(Pagination)
Vue.use(Carousel)
Vue.use(Button)
Vue.use(CarouselItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Switch)
// Vue.use(Message)//附着在原型上的
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;


import VueLazyload from 'vue-lazyload'  //引入这个懒加载插件
// import axios from 'axios'
import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS
import router from './router/index'
import {store} from './vuex/vuex'
// 引入path
const path=require('path')

// 引入css
import"./statics/site/css/style.css"
// 设置axios的全局引用
// axios.defaults.baseURL="http://47.106.148.205:8899";
// Vue.prototype.$axios = axios;
// axios.defaults.withCredentials=true;

// // 导入路由，创建路由，设置路由规则、、安装路由
// import VueRouter from'vue-router'
// import goodslist from './component/goodslist'
// import goodsinfo from './component/goodsInfo'
// import shoppingInfo from './component/shoppingInfo'
// import order from './component/order'
// import login from './component/login.vue'
// import orderInfo from './component/orderInfo.vue'
// import paySuccess from './component/paySuccess.vue'
// import 'element-ui/lib/theme-chalk/index.css';
// 按需引入localStorage.js
// import {addlocalStorage,getTotalCount,updateLocalCount,deleteLocalGoodsCount} from '../src/common/localStorage'
Vue.use(VueLazyload, {
    loading: path.join(__dirname,"src/statics/site/images/01.gif"),
  })
// Vue.use(VueRouter)

// Vue.use(Vuex);
// // 创建一个仓库，在点击加入购物车时，将商品对应的数量和id存进去 注意，store一定要注册到根实例中
// const store=new Vuex.Store({
//     state:{//数据
//         count:0,
//     },
//     getters:{//从仓库中取出商品数
//         getGoodsData:state=>{
//             if(state.count>0){
//                 return state.count
//             }else{//不是第一次添加，可以直接在本地存储中取数
//              return getTotalCount()
//             }
//             // return state.count;
//             // return getTotalCount()  //这种每次多从本地中取也可以
            
//         }
//     },
//     mutations:{//将数据同步加存储到仓库中
//         addGoods(state,goods){//goods为点击按钮时，获取并传过来的到的数据,但通过vuex存储的数据是内存数据，当刷新时就会自动销毁，所以要将数据存入本地localStorage中
//             // 为了方便的localStorage的操作，将其独立抽出为一个模块
//             // state.count+=goods.count;
//             state.count=addlocalStorage(goods);
//             // console.log(state.count);
//         },
//         updateGoods(state,goods){
//             state.count=updateLocalCount(goods);
//         },
//         deleteGoods(state,goodsId){
//             state.count=deleteLocalGoodsCount(goodsId)
//         }
//     }

// })
// const router = new VueRouter({
//     routes:[
//         // 重定向
//         {path:"/",redirect:"/site/goodsList"},
//         {path:"/site/goodsList",component:goodslist},
//         {path:"/site/goodsinfo/:goodsId",component:goodsinfo},
//         {path:"/site/shoppingCar",component:shoppingInfo},  
//         {path:"/site/order/:goodsId",component:order,meta:{needlogin:true}},
//         {path:"/site/login",component:login},  
//         {path:"/site/orderInfo/:orderId",component:orderInfo,meta:{needlogin:true}},
//         {path:"/site/paySuccess",component:paySuccess,meta:{needlogin:true}},         
//     ]
// })
// // 路由守卫是路由的一个方法，可以拦截所有的请求，判断是不是需要权限，不要权限，直接next ，要权限，先判断是否登录，和meta(路由元信息)，相当于一个标签，有这个标签的，都要进行判断
// router.beforeEach((to,from,next)=>{
//     // console.log(to)
//     if(to.path!="/site/login"){
//         localStorage.setItem("youWantTo",to.path)
//     }
//     if(to.meta.needlogin){
//         // 判断是否登录
//         const url=`site/account/islogin`;
//         axios.get(url).then((response)=>{
//             // console.log(response.data)
//             if(response.data.code=='nologin'){
//                 router.push({path:"/site/login"});
//             }else{
//                 next()
//             }
//         })
//     }else{
//         next()
//     }
// })
Vue.filter('fmtData',(input,symbol="YYYY-MM-DD")=>{
    return moment(input).format(symbol);
})
//创建根元素，渲染
new Vue({
    el:"#app",
    render: function (createElement) {
        return createElement(App)
      },
      router,
      store,
})