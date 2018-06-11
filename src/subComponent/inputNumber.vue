<template>
<div> 
  <div @click="sub" class="left">-</div>
  <div class="middle" @click="changeGoodsCount">{{count}}</div>
  <div @click="add" class="right">+</div>
</div>
</template>
<style>
 .left,.middle,.right{
     display:inline-block;
     border: 1px solid #000;
     width: 20px;
     height: 30px;
     text-align: center;
     line-height: 30px;
 }
</style>
<script>
    export default{
        props:["goodsId","goodsCount"],
        data(){
            return {
                count:0,
            }
        },
        created(){
            // 父组件向子组件传值的流程如下：父组件在子组件依变量的形式绑定中传两个参数，在子组件中通过props进行接收
            this.count=this.goodsCount;
        },
        methods:{
            sub(){
                if(this.count<=1){
                    return;
                }
                this.count--;
                this.changeGoodsCount();
            },
            add(){
                this.count++;
                this.changeGoodsCount();
            },
            // 子组件向父组件传值，子组件中注册一个事件，在其中通过this.$emit("自定义event名"，....args要传递的参数)，在父组件中写子组件的地方，通过v-on注册个自定义事件，写好处理函数
            changeGoodsCount(){
                const goods={
                    goodsId:this.goodsId,
                    goodsCount:this.count,
                }
                this.$emit("getChangeCount",goods);
            }
        }
    }
</script>

