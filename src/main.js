import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'amfe-flexible'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
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
  GridItem,
  Dialog,
  Popup,
  Picker,
  DatetimePicker,
  Tab,
  Tabs,
  Icon,
  PullRefresh,
  List,
  Search
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
  GridItem,
  Dialog,
  Popup,
  Picker,
  DatetimePicker,
  Tab,
  Tabs,
  Icon,
  PullRefresh,
  List,
  Search
]
import '@/assets/css/global.less'
plugins.forEach(plugin => {
  Vue.use(plugin)
})

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')


Vue.filter('relativeTime', value => {
  return dayjs(value).from(dayjs())
})
Vue.filter('datetime', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format)
})

Vue.config.productionTip = false
Vue.prototype.$toast = Toast
Vue.prototype.$dialog = Dialog
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
