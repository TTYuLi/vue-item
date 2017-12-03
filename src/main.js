//引入vue
import Vue from 'vue'
import VueRouter from 'vue-router'


//引入mint-ui
import MintUi from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUi)
Vue.use(VueRouter)

//引入各种路由组件
import App from './components/App.vue'
import Home from './components/Home.vue'

// 配合路由和规则
const router = new VueRouter()

router.addRoutes([
  //重定向到首页
  {path:'/',redirect:{name:'home'}}
  ,
  {name:'home',path:'/home',component:Home}
])


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