<template>
    <div> 
        <nav-bar title="图文详情"></nav-bar>
        <div class="photo-title">
            <p>{{imgDetail.title}}</p>
            <span>发起日期：{{imgDetail.add_time|convertTime}}</span>
            <span>{{imgDetail.click}}次浏览</span>
            <span>分类：民生经济</span>
        </div>
        <ul>
            <li v-for="(item, index) in imgs" :key="index">
                <img class="preview-img" :src="item.src" alt="" @click="$preview.open(index,imgs)">
            </li>    
        </ul>
        <div class="photo-desc">
            <p  v-html="imgDetail.content"></p>
        </div>
    </div>
</template>
<script>
   export default {
     data(){
       return {
         imgs: [],
         imgDetail: []  
       }
     },
     created(){
         console.log(this.$route.params)
       let picId = this.$route.params.picId
        this.$axios.get('getthumimages/' + picId)
        .then(res =>{
          this.imgs = res.data.message
        }).catch(err=>{
          console.log(err)
        })

        this.$axios.get('getimageInfo/' + picId)
        .then(res => {
         this.imgDetail = res.data.message
          this.imds.forEach(ele=>{
            ele.h = 400
            ele.w = 600
          })
        })
     },
     methods:{

     }
   }
</script>
<style scoped>
li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}

.photo-title {
    overflow: hidden;
}

.photo-title,
.photo-desc {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

.photo-title p {
    color: #13c2f7;
    font-size: 20px;
    font-weight: bold;
}

.photo-title span {
    margin-right: 20px;
}

.photo-desc p {
    font-size: 18px;
}

</style>
