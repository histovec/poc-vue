// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'es6-promise/auto'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './plugins'

import apiConf from './assets/json/backend.json'

Vue.config.productionTip = false

window.addEventListener('beforeunload', function () {
  var apiUrl = apiConf.api.url.replace('<APP>', process.env.APP).replace(/"/g, '')
  navigator.sendBeacon(apiUrl + 'log/exit')
}, false)

/* eslint-disable no-new */
new Vue({
  el: '#root',
  store,
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})
