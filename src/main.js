import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'
import App from './App.vue'

import './config/bootstrap'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

// TEMPORARIO!!!!
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6Ikxlb25hcmRvIE0uIExlaXTDo28iLCJlbWFpbCI6Imxlb25hcmRvQGNvZDNyLmNvbS5iciIsImFkbWluIjp0cnVlLCJpYXQiOjE1NjM0NTUwODQsImV4cCI6MTU2MzcxNDI4NH0.VHDHejJyudrwMaO4OvTCIe4qcgVC-HtOiFkViGTZkXM'

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
