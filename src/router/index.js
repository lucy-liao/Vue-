import Vue from 'vue'
// 导入路由，创建路由，设置路由规则、、安装路由
import VueRouter from'vue-router'
Vue.use(VueRouter)

import axios from 'axios'
axios.defaults.baseURL="http://47.106.148.205:8899";
Vue.prototype.$axios = axios;
axios.defaults.withCredentials=true;


// import goodslist from '../component/goodslist'
// import goodsinfo from '../component/goodsInfo'
// import shoppingInfo from '../component/shoppingInfo'
// import order from '../component/order'
// import login from '../component/login.vue'
// import orderInfo from '../component/orderInfo.vue'
// import paySuccess from '../component/paySuccess.vue'

const goodslist = () => import("../component/goodslist")
const goodsinfo = () => import("../component/goodsInfo")
const shoppingInfo = () => import("../component/shoppingInfo")
const order = () => import("../component/order")
const login = () => import("../component/login.vue")
const orderInfo = () => import("../component/orderInfo.vue")
const paySuccess = () => import("../component/paySuccess.vue")



const router = new VueRouter({
        routes:[
            // 重定向
            {path:"/",redirect:"/site/goodsList"},
            {path:"/site/goodsList",component:goodslist},
            {path:"/site/goodsinfo/:goodsId",component:goodsinfo},
            {path:"/site/shoppingCar",component:shoppingInfo},  
            {path:"/site/order/:goodsId",component:order,meta:{needlogin:true}},
            {path:"/site/login",component:login},  
            {path:"/site/orderInfo/:orderId",component:orderInfo,meta:{needlogin:true}},
            {path:"/site/paySuccess",component:paySuccess,meta:{needlogin:true}},         
        ]
    })
    // 路由守卫是路由的一个方法，可以拦截所有的请求，判断是不是需要权限，不要权限，直接next ，要权限，先判断是否登录，和meta(路由元信息)，相当于一个标签，有这个标签的，都要进行判断
    router.beforeEach((to,from,next)=>{
        // console.log(to)
        if(to.path!="/site/login"){
            localStorage.setItem("youWantTo",to.path)
        }
        if(to.meta.needlogin){
            // 判断是否登录
            const url=`site/account/islogin`;
            axios.get(url).then((response)=>{
                // console.log(response.data)
                if(response.data.code=='nologin'){
                    router.push({path:"/site/login"});
                }else{
                    next()
                }
            })
        }else{
            next()
        }
    })
    export default router;