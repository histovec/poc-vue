import Vue from 'vue'
import VueShortkey from 'vue-shortkey'
import VueScrollTo from 'vue-scrollto'

Vue.use(VueShortkey)
Vue.use(VueScrollTo, {
  offset: -5,
  duration: 1000,
})
