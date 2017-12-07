<template>
    <div  :style="'height:'+ height">
      <nav-bar title="商品列表"></nav-bar>
      <mt-loadmore ref="loadmore" :bottom-method="loadBottom" :auto-fill="isAutoFill" :bottom-all-loaded="allLoaded">
        <ul ref="ul">
            <li v-for="good in goods" :key="good.id">
                <router-link :to="{name:'goods.detail',params:{goodId:good.id}}">
                    <img :src="good.img_url">
                    <div class="title">{{good.title|convertTitle(25)}}</div>
                    <div class="desc">
                        <div class="sell">
                            <span>￥{{good.sell_price}}</span>
                            <s>￥{{good.market_price}}</s>
                        </div>
                        <div class="detail">
                            <div class="hot">
                                热卖中
                            </div>
                            <div class="count">
                                剩{{good.stock_quantity}}件
                            </div>
                        </div>
                    </div>
                </router-link>
            </li>             
          
        </ul>
        </mt-loadmore>
    </div>
</template>
<script>
export default {
  //接收APP中的头和底部
  props:['appRefs'],
  data(){
    return {
      goods:[],
      allLoaded:false,
      isAutoFill:false,
      page:1,
      height:''//根节点div的高度
    }
  },
  methods:{
    loadBottom(){
      this.$axios.get(`getgoods?pageindex=${this.page}`)
      .then( res => {
        
        if (res.data.message.length == 0) {
          this.$toast({
            message:'没有数据了哦!',
            duration:2000
          })
          //没有数据时，设置禁止下拉
          this.allLoaded = true
          return
        }
        //如果有数据，则追加数据
        this.goods = this.goods.concat(res.data.message)
        this.page++
        // 把loading状态通知货到初始状态
        this.$refs.loadmore.onBottomLoaded()

      })
      .catch( err => {
        console.log(err)
      })

    },
    //动态获取父盒子高度
    getHeight(){

        return this.height = document.documentElement.clientHeight -
        this.appRefs.header.$el.offsetHeight -
        this.appRefs.footer.$el.offsetHeight
    }
  },
  created(){
    console.log()
    let page = this.$route.params.page
    this.$axios.get(`getgoods?pageindex=${page}`)
    .then(res => {
      this.goods = res.data.message
      //console.log(res.data)
     // console.log(res)
    })
    .catch(err => {
        console.log(err)
    })
  },
  mounted () {
      this.getHeight()
  }
}
</script>
<style scoped>

ul {
    overflow: hidden;
}
li {
    width: 50%;
    float: left;
    padding: 6px;
    box-sizing: border-box;
}


li > a:not(.mui-btn) {
    margin: 0px;
    padding: 0px;
    border: 1px solid #5c5c5c;
    box-shadow: 0 0 4px #666;
    width: 100%;
    display: block;


}

li > a:not(.mui-btn) img {
     width: 100%;
}

.sell > span {
    float: left;
    color: red;
    text-align: left;
}

.detail >.hot {
    float: left;
    text-align: left;
    font-size: 15px;
}

.detail >.count {
    float: right;
    text-align: right;
    font-size: 15px;
}


/*撑开，去除浮动没有的高度*/

.detail {
    overflow: hidden;
}

.desc {
    color: rgba(92, 92, 92, 0.8);
    background-color: rgba(0, 0, 0, 0.2);
}

img {
    height: 200px;
}
</style>
