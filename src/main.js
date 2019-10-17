// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
import axios from 'axios'

import store from './store/index'
Vue.use(Vant)
Vue.config.productionTip = false
/**
 *引入iconfont
 */
import  "./assets/iconfont/iconfont.css"
import moment from 'moment'//导入文件
moment.locale('zh-cn');//需要汉化
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
import { Swipe, SwipeItem } from 'vant';
Vue.use(Swipe).use(SwipeItem);
import VConsole from 'vconsole'
const vConsole = new VConsole()
console.log(vConsole.version)
import VueAwesomeSwiper from 'vue-awesome-swiper'
import './assets/swiper/swiper-4.1.0.min.css'
Vue.use(VueAwesomeSwiper);
/**
 * 图片压缩
 */
import lrz from 'lrz'
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
