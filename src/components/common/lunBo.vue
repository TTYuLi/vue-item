<template>
  <div>

    <!-- 轮播图 -->
      <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(pic,index) in pics" :key="index">
          <a href="javascript:;">
            <img :src="pic.img||pic.src" alt="">
          </a>
      </mt-swipe-item>
  
      </mt-swipe>

  </div>
</template>

<script>
export default {
  props:['url'],
  name:'lunbo',
  data(){
    return {
      pics:[]
    }
  },
   created(){
      this.$axios.get(this.url).then( res => {
          //console.log(res)
         this.pics = res.data.message
        })
  },
}
</script>

<style scoped>
.mint-swipe {
   height:30%
}
.mint-swipe img{
  width:100%;
  height:100%
}
</style>
