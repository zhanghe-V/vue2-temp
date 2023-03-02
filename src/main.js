import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import { post, get, del, download, put, upload, formData } from './assets/js/request'
import fullscreen from 'vue-fullscreen'
import moment from 'moment'
import './components'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/style/common.less'

Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.use(fullscreen)
Vue.prototype.$http = { post, get, del, download, put, upload, formData }
Vue.prototype.$moment = moment
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
