import Vue from 'vue'
import Vuex from 'vuex'
import {addlocalStorage,getTotalCount,updateLocalCount,deleteLocalGoodsCount} from '../common/localStorage'
Vue.use(Vuex);
// 创建一个仓库，在点击加入购物车时，将商品对应的数量和id存进去 注意，store一定要注册到根实例中
const store=new Vuex.Store({
    state:{//数据
        count:0,
    },
    getters:{//从仓库中取出商品数
        getGoodsData:state=>{
            if(state.count>0){
                return state.count
            }else{//不是第一次添加，可以直接在本地存储中取数
             return getTotalCount()
            }
            // return state.count;
            // return getTotalCount()  //这种每次多从本地中取也可以
            
        }
    },
    // goods={
    //     goodsId:this.goodsId,
    //     goodsCount:this.count,
    // }
    mutations:{//将数据同步加存储到仓库中
        addGoods(state,goods){//goods为点击按钮时，获取并传过来的到的数据,但通过vuex存储的数据是内存数据，当刷新时就会自动销毁，所以要将数据存入本地localStorage中
            // 为了方便的localStorage的操作，将其独立抽出为一个模块
            // state.count+=goods.count;
            state.count=addlocalStorage(goods);
            // console.log(state.count);
        },
        updateGoods(state,goods){
            state.count=updateLocalCount(goods);
        },
        deleteGoods(state,goodsId){
            state.count=deleteLocalGoodsCount(goodsId)
        }
    }


})
export {store};