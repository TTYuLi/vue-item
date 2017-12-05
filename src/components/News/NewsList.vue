<template>

  <div>
      <!-- 顶部导航 -->
      <nav-bar title="新闻列表"></nav-bar>
      
      <!-- 列表 -->
      <div class="domo">
        <ul>
          <li v-for="news in newsList" :key="news.id">
            <router-link :to="{name:'news.datail',query:{newsId:news.id}}">
              <img :src="news.img_url" alt="">
              <div>
                <span>{{news.title|convertTitle(13)}}</span>
                <div class="news-desc">
                  <p>点击数:{{news.click}}</p>
                  <p>发表时间:{{news.add_time|convertTime}}</p>
                </div>
              </div>
            </router-link>
          </li>
          <li class="line"></li>
        </ul>
      </div>
  </div>
</template>

<script>
export default {
    created(){
      this.$axios.get('getnewslist')
      .then(res=>{
        console.log(res)
        this.newsList = res.data.message
      })
      .catch(err=>{
        consoloe.log(err)
      })
    },
    data(){
      return {
        newsList:[],
      }
    }
}
</script>

<style>
.demo a {
    display: block;
    width: 100%;
    height: 44px;
    color: #000;
    padding: 10px 0px 10px 10px;
}
.demo img {
    float: left;
    width: 42px;
    height: 42px;
    margin-right: 20px;
}
.demo a div {
    float: left;
    width: 258px;
}
.demo span {
    display: block;
    width: 100%;
    font-size: 17px;
    line-height: 21px;
/*    white-space: nowrap;
    overflow: hidden;*/
}
.demo a p {
    float: left;
    color: #0bb0f5;
    font-size: 14px;
    line-height: 21px;
}
.demo p:nth-child(2) {
    float: right;
}
.line {
    margin-left: 16px;
    transform: scaleY(.5);
    border-bottom: 1px solid #c8c7cc;
}

</style>
