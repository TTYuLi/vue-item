//引入vue
import Vue from 'vue'
import VueRouter from 'vue-router'


//引入mint-ui
import MintUi from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUi)
Vue.use(VueRouter)

//注册全局组件
import MyLi from './components/common/MyLi.vue'
import MyUl from './components/common/MyUl.vue'
Vue.component(MyLi.name,MyLi)
Vue.component(MyUl.name,MyUl)


//引入各种路由组件
import App from './components/App.vue'
import Home from './components/Home/Home.vue'
import Search from './components/Search/Search.vue'
import Shopcart from './components/Shopcart/Shopcart.vue'
import Member from './components/Member/Member.vue'

// 配合路由和规则
const router = new VueRouter()

router.addRoutes([
  //重定向到首页
  {path:'/',redirect:{name:'home'}}
  ,
  {name:'home',path:'/home',component:Home},
  {name:'search',path:'/search',component:Search},
  {name:'shopcart',path:'/shopcart',component:Shopcart},
  {name:'member',path:'/member',component:Member}
])


// 引入css资源
import './static/css/global.css'



//开启Axios

//引入Axios 
import Axios from 'axios'
//挂载axios
Vue.prototype.$axios = Axios

Axios.defaults.baseURL= 'http://vue.studyit.io/api/'
//结束Axios


//启动vue
new Vue({
  el:'#app',
  render:c=>c(App),
  router
})