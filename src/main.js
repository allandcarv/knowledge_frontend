import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'
import App from './App.vue'

import './config/bootstrap'
import './config/msgs'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

// TEMPORARIO!!!!
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6Ikxlb25hcmRvIE0uIExlaXTDo28iLCJlbWFpbCI6Imxlb25hcmRvQGNvZDNyLmNvbS5iciIsImFkbWluIjp0cnVlLCJpYXQiOjE1NjM4MDA0NzQsImV4cCI6MTU2NDA1OTY3NH0.xW-yLpfSlTguuLg0f-WRIGhBVSKsTH8XYBXWO1nSJ6E'

new Vue({
  store,
  router,  
  render: h => h(App),
}).$mount('#app')
