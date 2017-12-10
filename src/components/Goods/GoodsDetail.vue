<template>
    <div>
        <nav-bar title="商品详情"></nav-bar>
        <div class="outer-swiper">
            <div class="swiper">
                <lunbo :url="goodUrl"></lunbo>
            </div>
        </div>
        <div class="product-desc">
            <ul>
                <li><span class="product-desc-span">
                    {{goodInfo.title}}
                </span></li>
                <li class="price-li">市场价：
                    <s>￥{{goodInfo.market_price}}</s> 销售价：<span>￥{{goodInfo.sell_price}}</span></li>
                <li class="number-li">购买数量：<span @click="subtract">-</span><span>{{pickNum}}</span><span @click="plus">+</span></li>
                <li>
                    <mt-button type="primary">立即购买</mt-button>
                    <mt-button type="danger" @click="addCart">加入购物车</mt-button>
                </li>
            </ul>
        </div>
       <!-- 小球的运动效果 -->
       <transition name="myball" v-on:after-enter="afterEnter">
            <div class="ball" v-if="showBall"></div>
        </transition>
        <div class="product-props">
            <ul>
                <li>商品参数</li>
                <li>商品货号：{{goodInfo.goods_no}}}</li>
                <li>库存情况：{{goodInfo.stock_quantity}}件</li>
                <li>上架时间：2014-08-09</li>
            </ul>
        </div>
        <div class="product-info">
            <ul>
                <li>
                    <mt-button type="primary" size="large" plain @click="getGoodsDesc">图文详情</mt-button>
                </li>
                <li>
                    <mt-button type="danger" size="large" plain @click="getGoodsComment">商品评论</mt-button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import GoodsTools from '../common/GoodsTools.js'
import VueBus from '../common/VueBus.js'
export default {
  data(){
    return {
        goodInfo:{},
        goodDesc:``,  
        goodUrl:'',
        showBall:false,//小球是否存在
        pickNum:'0'    
    }
  },
  methods:{
      //跳转到商品详情页面
      getGoodsDesc(){
         this.$router.push({
             name:'goods.photo.detail',
             query:{goodsId:this.goodInfo.id}
         }) 
        
      },
      //跳转到商品评论
      getGoodsComment(){
          this.$router.push({
              name:'goods.detail.comment',
              query:{commentId:this.goodInfo.id}
          })
           console.log(this.goodInfo.id)
      },//减少
      subtract(){
          this.pickNum  = this.pickNum -0 -1
      },//增加
      plus(){
          this.pickNum  = this.pickNum -0 + 1
      },
      //加入购物车
      addCart(){
          this.showBall =true//触发v-enter-active的动画
          //更改本地存储

          GoodsTools.addOrUpdate({
              id:this.goodInfo.id,
              num:this.pickNum
          })
            
      },
      afterEnter(){
          //过渡元素进入后，动画完毕，将小球移出
          this.showBall = false;
      }
  },
  created(){
    let goodId = this.$route.params.goodId
    this.goodUrl= `getthumimages/${goodId}`
    // 获取商品详情
    this.$axios.get(`goods/getinfo/${goodId}`)
    .then( res => {
      this.goodInfo = res.data.message[0]
      //console.log(this.goodInfo)
    })
    .catch( err => {
        console.log(err)
    })
    
    
  }
}
</script>
<style scoped>

/* 进入中的动画 */
.myball-enter-active {
    animation: bounce-in 1s;
}
/* 设置离开后状态为透明 */
.myball-leave{
    opacity: 0;
}
@keyframes bounce-in {
    0% {
        transform: translate3d(0, 0, 0);
    }
    50% {
        transform: translate3d(120px, -50px, 0);
    }
    75% {
        transform: translate3d(140px, 0px, 0);
    }
    100% {
        transform: translate3d(120px, 300px, 0);
    }
}

.swiper {
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 8px;
    width: 95%;
    border-radius: 15px;
    overflow: hidden;
}

.outer-swiper,
.product-desc,
.product-props,
.product-info {
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 3px;
}


/*请ulpadding*/

.outer-swiper ul,
.product-desc ul,
.product-props ul,
.product-info ul {
    padding: 0;
}

.product-desc ul li,
.product-props ul li,
.product-info ul li {
    list-style: none;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.5);
    margin-top: 8px;
}

.product-desc ul >:nth-child(1) span {
    color: blue;
    font-size: 22px;
    font-weight: bold;
}

.product-desc ul >:nth-child(1) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}

.product-desc ul,
.product-info ul,
.product-props ul {
    padding-left: 10px;
}

.price-li span {
    color: red;
    font-size: 25px;
}

.price-li s {
    margin-right: 16px;
}


/*加减*/

.number-li span {
    display: inline-block;
    border: 2px solid rgba(0, 0, 0, 0.1);
    width: 25px;
}


/*商品参数*/

.product-props ul >:nth-child(1) {
    text-align: left;
}

.product-props ul:not(:nth-child(1)) {
    margin-left: 40px;
}

.product-info ul {
    margin-bottom: 70px;
    padding: 0 5;
}

.number-li span {
    text-align: center;
}

.number-li >:nth-child(2) {
    width: 40px;
}

.ball {
    border-radius: 50%;
    background-color: red;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 440px;
    left: 120px;
    display: inline-block;
    z-index: 9999;
}
</style>
