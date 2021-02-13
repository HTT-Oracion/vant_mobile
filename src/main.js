import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'amfe-flexible'
import {
  Button,
  NavBar,
  Cell,
  CellGroup,
  Form,
  Field,
  CountDown,
  Toast,
  Tabbar,
  TabbarItem,
  Image as VanImage,
  Grid,
  GridItem
} from 'vant'

const plugins = [
  Button,
  NavBar,
  Cell,
  CellGroup,
  Form,
  Field,
  CountDown,
  Toast,
  Tabbar,
  TabbarItem,
  VanImage,
  Grid,
  GridItem
]
import '@/assets/css/global.less'
plugins.forEach(plugin => {
  Vue.use(plugin)
})
Vue.config.productionTip = false
Vue.prototype.$toast = Toast
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
