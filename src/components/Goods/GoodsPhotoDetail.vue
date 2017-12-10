<template>
    <div class="tmpl">
      <nav-bar title="商品图文详情"></nav-bar>
        <div class="news-title">
            <p>{{goodDesc.title}}</p>
            <div>
                <span>0次点击</span>
                <span>分类:民生经济</span>
                <span>添加时间:2015-01-01</span>
            </div>
        </div>
        <div class="news-content" v-html="goodDesc.content"></div>
    </div>
</template>
<script>
export default {
  data(){
    return {
      goodDesc:{},
    }
  },
  created(){
    //获取图文详情信息
   let goodsId = this.$route.query.goodsId
   console.log(goodsId)
    this.$axios.get(`goods/getdesc/${goodsId}`)
    .then( res => {
        this.goodDesc = res.data.message[0] 
        console.log(this.goodDesc)
    })
    .catch( err => {
        console.log(err)
    })
  }
}
</script>
<style scoped>
.news-title p {
    color: #0a87f8;
    font-size: 20px;
    font-weight: bold;
}

.news-title span {
    margin-right: 30px;
}

.news-title {
    margin-top: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}


/*主体文章的左右距离*/

.news-content {
    padding: 10 5;
}
</style>
