<template>
  <div id="app">
    <!-- debut entete -->
    <div class="header-container">
      <header class="header">
        <div class="container">
          <div class="row">
            <div class="col-md-8">
              <div class="header-left clearfix">
                <!-- debut bandeau -->
                <div class="logo"><a href="home"><img alt="accueil" @click="show = !show" src="assets/images/histovec-header-mobile.png" class="img-responsive" width="548" height="98"> </a></div>
                <!-- fin bandeau -->
              </div>
            </div>
            <!-- debut beta -->
            <div id="no-boot" class="col-xs-1"> <img alt="version beta" src="assets/images/beta.png" class="img-responsive" width="100" height="100"></div>
            <!-- fin beta -->
          </div>
        </div>
      </header>
    </div>
    <!-- fin entete -->
    <router-view></router-view>
    <!-- footer start -->
    <footer id="footer" class="clearfix dark">
      <!-- .footer start -->
      <div class="footer">
        <div class="container">
          <div class="footer-inner">
            <div class="row">
              <div class="col-md-6">
                <div class="footer-content">
                  <h4 class="title">Liens utiles</h4>
                  <div class="separator-2"></div>
                  <!-- debut -->
                  <div class="media margin-clear">
                    <nav>
                      <ul class="nav nav-pills nav-stacked">
                        <li><a href="faq">Besoin d'aide</a></li>
                        <li><a :href="'mailto:histovec@interieur.gouv.fr?subject=Contact%20Histovec'">CONTACT</a></li>
                        <li><a :href="'mailto:histovec@interieur.gouv.fr?subject=Signaler%20une%20erreur'">Signaler une erreur</a></li>
                      </ul>
                    </nav>
                  </div>
                  <!-- fin -->
                </div>
              </div>
              <div class="col-md-6">
                <div class="footer-content">
                  <h4 class="title">Un service proposé par</h4>
                  <div class="separator-2"></div>
                  <div class="row grid-space-12">
                    <div class="col-md-2 p-b-10">
                      <div class="overlay-container"> <img class="img-responsive" src="assets/images/logos_metiers/logo_mi.png" alt="Ministère de l'Intérieur"> <a href="https://www.interieur.gouv.fr/" target="_blank" class="overlay-link small"></a> </div>
                    </div>
                    <div class="col-md-6 p-b-10">
                      <div class="overlay-container"><img class="img-responsive" src="assets/images/logos_metiers/securite_routiere_120.png" alt="sécurité routière, tous responsables"> <a href="http://www.securite-routiere.gouv.fr/la-securite-routiere/actualites" target="_blank" class="overlay-link small"></a></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- .footer end -->
      <!-- .subfooter start -->
      <div class="subfooter">
        <div class="container">
          <div class="subfooter-inner">
            <div class="row">
              <div class="col-md-12">
                <p class="text-center">{{ appName }} version {{ appVersion }} - copyright &copy; 2018 <a href="legal">Mentions légales</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- .subfooter end -->
    </footer>
    <!-- footer end -->
  </div>
</template>

<script>
import Vue from 'vue'

import npmConf from '../package.json'
import apiConf from './assets/json/backend.json'
import localization from './assets/json/lang.json'
import operations from './assets/json/libelle_operations.json'
import verbatims from './assets/json/verbatims.json'

import VueClipboard from 'vue-clipboard2'

Vue.use(VueClipboard)

import lodash from 'lodash'

Vue.prototype.$lodash = lodash

window.bus = new Vue()

Vue.mixin({
  data () {
    return {
      appName: process.env.APP,
      appVersion: npmConf.version,
      apiUrl: apiConf.api.url.replace('<APP>', process.env.APP).replace(/"/g, ''),
      localization: localization,
      operations: operations,
      verbatims: verbatims,
      lang: localization.default,
      show: false
    }
  },
  mounted () {
    if (this.$cookie.get('userId') === null) {
      this.$cookie.set('userId', this.guid(), 1)
      this.$store.commit('updateCookie', this.$cookie.get('userId'))
    }
    window.bus.$on('langChange', value => {
      this.lang = value
    })
  },
  methods: {
    guid () {
      return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4()
    },
    s4 () {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    }
  }
})

export default {
  name: 'app'
}
</script>

<style lang="scss" src="./assets/scss/style.scss"></style>
