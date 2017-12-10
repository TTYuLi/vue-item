   <template>
    <div>
        
        <div class="pay-detail">

            <ul>
                <li class="p-list" v-for="item in shopcart" :key="item.id">
                    <mt-switch v-model="item.isSelected"></mt-switch>
                    <img :src="item.thumb_path">
                    <div class="pay-calc">
                        <p>{{item.title}}</p>
                        <div class="calc">
                            <span>￥{{item.sell_price}}</span>
                            <span>-</span>
                            <span>{{item.pickNum}}</span>
                            <span>+</span>
                            <a href="javascript:;">删除</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="show-price">
            <div class="show-1">
                <p>总计(不含运费):</p>
                <span>已经选择商品1件，总价￥888元</span>
            </div>
            <div class="show-2">
                <mt-button type="danger" size="large">去结算</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import GoodsTools from '../common/GoodsTools.js'
import VueBus from '../common/VueBus.js'
export default {
    data(){
      return {
        shopcart: []
      }
    },
    created(){
      //从本地存储获取商品对象
      let goodsObj = GoodsTools.getGoods()
      //获取url中的ids
      let ids = Object.keys(goodsObj).join(',')
      //拼接url
      let url = `goods/getshopcarlist/${ids}`
      // 发送请求
      this.$axios.get(url)
      .then(res => {
          this.shopcart = res.data.message
          console.log(this.shopcart)
          this.shopcart.forEach(ele => {
            this.$set(ele,'pickNum',goodsObj[ele.id])
            this.$set(ele,'isSelected',true)
          })
      })
      .catch(err => cosole.log(err))
  }
}
</script>
<style scoped>
.pay-detail ul li {
    list-style: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 3px;
}

.pay-detail ul {
    padding-left: 5px;
    margin-top: 5px;
}

.pay-detail ul li img {
    width: 80px;
    height: 80px;
    display: inline-block;
    vertical-align: top;
    margin-top: 10px;
}

.pay-detail ul li >:nth-child(1),
.pay-detail ul li >:nth-child(3) {
    display: inline-block;
}

.pay-calc p {
    display: inline-block;
    width: 250px;
    overflow: hidden;
    color: blue;
    font-size: 15px;
    margin-bottom: 10px;
}

.pay-detail ul li >:nth-child(1) {
    line-height: 80px;
}

.calc:nth-child(1) {
    color: red;
    font-size: 20px;
}

.calc span:not(:nth-child(1)) {
    border: 1px solid rgba(0, 0, 0, 0.3);
    display: inline-block;
    width: 20px;
    text-align: center;
}

.calc a {
    margin-left: 20px;
}

.show-1,
.show-2 {
    display: inline-block;
}

.show-1,
.show-2 {
    margin-left: 30px;
}

.show-price {
    background-color: rgba(0, 0, 0, 0.2);
}
</style>
