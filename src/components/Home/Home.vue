<template>
    <div>
      <!-- 轮播图 -->
       <lunbo url="getlunbo"></lunbo>

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
 
  data(){
    return {
     
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
        router:{name:'goods.list',params:{page:1}}
      },
      {
        title:'留言反馈',
        className:'feedback',
        router:{name:'goods.list',params:{page:1}}
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
