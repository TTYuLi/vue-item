<template>
    <div>
      <!-- 轮播图 -->
      <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(pic,index) in pics" :key="index">
          <a :href="pic.url">
            <img :src="pic.img" alt="">
          </a>
      </mt-swipe-item>
  
      </mt-swipe>


      <!-- 九宫格 -->
    <my-ul>
      <my-li v-for="(item, index) in HRouters" :key="index">
        <router-link :to="item.router">
          <div :class="'bgimg '+ item.className">{{item.title}}</div>
        </router-link>
      </my-li>
    </my-ul>
    </div>
</template>

<script>
export default {
  created(){
    this.$axios.get("getlunbo").then( res => {
      console.log(res)
      this.pics = res.data.message
    })
  },
  data(){
    return {
      pics:[],
      HRouters:[{
        title:'新闻列表',
        className:'news',
        router:{name:'news.list'}
      },
      {
        title:'图文分享',
        className:'pic',
        router:{name:'share',params:{catId:0}}
      },
      {
        title:'商品列表',
        className:'goods',
        router:{name:'news.list'}
      },
      {
        title:'留言反馈',
        className:'feedback',
        router:{name:'news.list'}
      },
      {
        title:'搜索资讯',
        className:'search',
        router:{name:'news.list'}
      },
      {
        title:'联系我们',
        className:'callme',
        router:{name:'news.list'}
      }]
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
/*轮播图样式*/
.mint-swipe-item img {
    width: 100%;
 }
.mint-swipe{
    height: 30%;
}
/*九宫格样式*/
.bgimg{
        background-size: 50px;
        background-repeat: no-repeat;
        background-position: 40px 35px;
        font-size: 20px;
        font-family: 'Microsoft YaHei';
}
li a{
    color:black;
}
/* 图片 */
.news {
  background-image: url(../../static/img/news.png)
}
.pic {
  background-image: url(../../static/img/picShare.png)
}
.goods{
    background-image: url(../../static/img/goodShow.png)
}
.feedback{
    background-image: url(../../static/img/feedback.png)
}
.search{
    background-image: url(../../static/img/search.png)
}
.callme{
    background-image: url(../../static/img/callme.png)
}
</style>
