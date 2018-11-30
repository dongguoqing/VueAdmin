import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import routes from './routes'
import Mock from './mock'
import Cookies from 'js-cookie';
Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)



const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  //如果路由是登录页面 就跳转到登录页面 并清空sessionStorage
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  //获取token 判断token是否还存在
  let adminToken = Cookies.get("Admin-Token");
  if (!adminToken && to.path != '/login')
    next({ path: '/login' });
  else
    next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

