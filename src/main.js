//引入vue
import Vue from 'vue'
import VueRouter from 'vue-router'

//注册全局过滤器
import Moment from 'moment'
// 转换时间格式
Vue.filter('convertTime',(value)=>{
  return Moment(value).format('YYYY-MM-DD')
})
// 处理title太长问题
Vue.filter('convertTitle',(value,limit)=>{
  if(!value) return
  if(value.length > limit){
    return value.substr(0,limit)+'...'
  }
  return value
})

//引入mint-ui
import MintUi from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUi)
Vue.use(VueRouter)

//注册全局组件
import MyLi from './components/common/MyLi.vue'
import MyUl from './components/common/MyUl.vue'
import NavBar from './components/common/NavBar.vue'
Vue.component(MyLi.name,MyLi)
Vue.component(MyUl.name,MyUl)
Vue.component(NavBar.name, NavBar)


//引入各种路由组件
import App from './components/App.vue'
import Home from './components/Home/Home.vue'
import Search from './components/Search/Search.vue'
import Shopcart from './components/Shopcart/Shopcart.vue'
import Member from './components/Member/Member.vue'
import NewsList from './components/News/NewsList.vue'
import NewsDetail from './components/News/NewsDetail.vue'
import PicShare from './components/Share/PicShare.vue'
import PicDetail from './components/Share/PicDetail.vue'

// 配合路由和规则
const router = new VueRouter()

router.addRoutes([
  //重定向到首页
  {path:'/',redirect:{name:'home'}}
  ,
  {name:'home',path:'/home',component:Home},
  {name:'search',path:'/search',component:Search},
  {name:'shopcart',path:'/shopcart',component:Shopcart},
  {name:'member',path:'/member',component:Member},
  {name:'news.list',path:'/news/list',component:NewsList},
  {name: 'news.datail', path: '/detail', component: NewsDetail},
  {name:'share',path:'/share',component:PicShare},
  {name:'pic.detil',path:'/picDetail',component:PicDetail}
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