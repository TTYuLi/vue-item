<template>
  <div>
        <!-- 引入返回导航 -->
        <!-- 顶部导航 -->
      <nav-bar title="图文分享"></nav-bar>
        <div class="photo-header">
            <ul>
                <li v-for="item in cats" :key="item.id">
                    <a href="javascript:;" @click="getPic(item.id)">{{item.title}}</a>
                </li>
            </ul>
        </div>

        <div class="photo-list">
            <ul>
                <li v-for="pic in pics" :key="pic.id">
                    <router-link :to="{name:'pic.detil',params:{picId:pic.id} }">
                        <img v-lazy="pic.img_url">
                        <p>
                            <span>{{pic.title}}}</span>
                            <br>
                            <span>{{pic.zhaiyao}}</span>
                        </p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      cats: [],
      pics: []
    };
  },
  methods: {
    getPic(id) {
      this.$axios.get("getimages/" + id).then(res => {
          this.pics = res.data.message
          if(this.imgs.length == 0){
                this.$toast({
                      message: '提示:没有图片了',
                      duration: 5000
                });
            }
      }).catch(err => {
          console.log(err)
      })
    }
  },
  created() {
    //   console.log(this.$route)
    //   console.log(this.$router)
    let catId = this.$route.params.catId;
    this.$axios
      .all([
        this.$axios.get("getimgcategory"),
        this.$axios.get("getimages/" + catId)
      ])
      .then(
        this.$axios.spread((catRes, imgRes) => {
          this.cats = catRes.data.message;
          this.cats.unshift({ id: 0, title: "全部" });

          this.pics = imgRes.data.message;
          if (!this.pics.length) {
            this.$toast({
              massage: "没有图片了哦",
              duration: 3000
            });
          }
        })
      )
      .catch(err => {
          console.log(err)
      })
  },//路由更新时，在组件被复用时的回调函数
  beforeRouteUpdate(to,from,next){
      this.getPic(to.params.catId)
  }
};
</script>
<style>
image[lazy=loading] {
width: 40px;
  height: 300px;
  margin: auto; 
}
.photo-header li {
  list-style: none;
  display: inline-block;
  margin-left: 10px;
  height: 30px;
}

.photo-header ul {
  /*强制不换行*/
  white-space: nowrap;
  overflow-x: auto;
  padding-left: 0px;
  margin: 5;
}

/*下面的图片*/

.photo-list li {
  list-style: none;
  position: relative;
}

.photo-list li img {
  width: 100%;
  height: 230px;
  vertical-align: top;
}

.photo-list ul {
  padding-left: 0px;
  margin: 0;
}

.photo-list p {
  position: absolute;
  bottom: 0px;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
  margin-bottom: 0px;
}

.photo-list p span:nth-child(1) {
  font-weight: bold;
  font-size: 16px;
}
</style>

