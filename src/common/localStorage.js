// 在这里进行进行数据的增删改查,按需导出

// 数据的增加，在vuex的mutations中将商品信息当做参数传给这里，在这里进行转换为json格式的对象字符串进行存储，要比较传过来的
// 商品id是不是已经存在，存在就直接追加数量，不存在则生成相对应的信息，最后返回商品的总数量给mutations
const KEY="goodsData";
// 计算出商品的总数量

export const getTotalCount=()=>{
    const localGoodsData=getLocalStorage();
    let totalCount=0;
    for (const key in localGoodsData) {
      totalCount+=localGoodsData[key];
    }
    return totalCount;
    console.log(totalCount)
}
export const getLocalStorage=()=>{
    return JSON.parse(localStorage.getItem(KEY)||'{}');
}

export const addlocalStorage=(goods)=>{
    // 判断传过来的商品id是不是已经存在，存在就直接追加数量，不存在则生成相对应的信息，最后返回商品的总数量给mutations
    // 在此之前要先获取本地存储中的数据，这一步在getlocalStorage中实现
    const localGoodsData=getLocalStorage();
    if(localGoodsData[goods.goodsId]){
        localGoodsData[goods.goodsId]+=goods.count;
    }else{
        localGoodsData[goods.goodsId]=goods.count;
    }
    localStorage.setItem(KEY,JSON.stringify(localGoodsData));
    // 最后返回商品的总数量给mutations
    return getTotalCount();
}

export const updateLocalCount=(goods)=>{
    const localGoodsData=getLocalStorage();
    localGoodsData[goods.goodsId]=goods. goodsCount;
    localStorage.setItem(KEY,JSON.stringify(localGoodsData));
    return getTotalCount();
}

export const deleteLocalGoodsCount=(goodsId)=>{
    const localGoodsData=getLocalStorage();
    delete localGoodsData[goodsId];
    localStorage.setItem(KEY,JSON.stringify(localGoodsData));
    return getTotalCount();
}