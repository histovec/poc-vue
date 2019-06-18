<template>
  <div id="app">
    <!-- debut entete -->
    <div
      v-for="(entry, index) in $store.state.configEnabler"
      :key="index"
    >
      <div
        v-shortkey="$store.state.configEnabler[index]"
        @shortkey="$store.commit('toggleConfig', index)"
      >
      </div>
    </div>
    <div class="header-container">
      <header class="header">
        <div class="container">
          <div class="row">
            <div class="col-md-8">
              <div class="header-left clearfix">
                <!-- debut bandeau -->
                <div class="logo">
                  <router-link
                    :to="{ name: 'home' }"
                  >
                    <img
                      alt="accueil"
                      src="assets/images/histovec-header-mobile.png"
                      class="img-responsive"
                      width="548"
                      height="98"
                      @click="show = !show"
                    >
                  </router-link>
                </div>
                <!-- fin bandeau -->
              </div>
            </div>
            <!-- debut beta -->
            <div
              v-if="$store.state.config['beta']"
              id="no-boot"
              class="col-xs-1"
            >
              <img
                alt="version beta"
                src="assets/images/beta.png"
                class="img-responsive"
                width="100"
                height="100"
              >
            </div>
            <!-- fin beta -->
          </div>
        </div>
      </header>
    </div>
    <modal-form>
    </modal-form>
    <!-- fin entete -->
    <router-view></router-view>
    <!-- footer start -->
    <footer
      id="footer"
      class="clearfix dark"
    >
      <!-- .footer start -->
      <div class="footer">
        <div class="container">
          <div class="footer-inner">
            <div class="row">
              <div class="col-md-4">
                <div class="footer-content">
                  <h4 class="title">
                    Liens utiles
                  </h4>
                  <div class="separator-2"></div>
                  <!-- debut -->
                  <div class="media margin-clear">
                    <nav>
                      <ul class="nav nav-pills nav-stacked">
                        <li>
                          <router-link
                            :to="{ name: 'faq' }"
                          >
                            Besoin d'aide
                          </router-link>
                        </li>
                        <li>
                          <a
                            :href="$store.state.config.v1 ? undefined : contactEmail"
                            title="Contact"
                            @click="toggleModalForm()"
                          >
                            Contact
                          </a>
                        </li>
                        <li>
                          <a
                            :href="$store.state.config.v1 ? undefined : reportErrorEmail"
                            title="Signaler une erreur"
                            @click="toggleModalForm(contact.mode.contact, contact.subject.error)"
                          >
                            Signaler une erreur
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <!-- fin -->
                </div>
              </div>
              <div class="col-md-4">
                <div class="footer-content">
                  <h4 class="title">
                    Un service proposé par
                  </h4>
                  <div class="separator-2"></div>
                  <div class="row grid-space-12">
                    <div class="col-md-3 p-b-10 p-g-17">
                      <div class="overlay-container">
                        <img
                          class="img-responsive"
                          src="assets/images/logos_metiers/logo_mi.png"
                          alt="Ministère de l'Intérieur"
                        >
                        <a
                          href="https://www.interieur.gouv.fr/"
                          target="_blank"
                          class="overlay-link small"
                        >
                        </a>
                      </div>
                    </div>
                    <div class="col-md-6 p-b-10 m-h-17">
                      <div class="overlay-container">
                        <img
                          class="img-responsive"
                          src="assets/images/logos_metiers/securite_routiere_120.png"
                          alt="sécurité routière, tous responsables"
                        >
                        <a
                          href="http://www.securite-routiere.gouv.fr/la-securite-routiere/actualites"
                          target="_blank"
                          class="overlay-link small"
                        >
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="footer-content">
                  <h4 class="title">
                    Réseaux sociaux
                  </h4>
                  <div class="separator-2"></div>
                  <ul class="social-links circle animated-effect-1">
                    <li class="facebook">
                      <a
                        href="https://www.facebook.com/Histovec/"
                        target="_blank"
                        title="facebook"
                      >
                        <i class="fa fa-facebook"></i>
                      </a>
                    </li>
                    <li class="twitter">
                      <a
                        href="https://twitter.com/histovec"
                        target="_blank"
                        title="twitter"
                      >
                        <i class="fa fa-twitter"></i>
                      </a>
                    </li>
                  </ul>
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
                <p class="text-center">
                  {{ appName }} version bêta {{ appVersion }} - copyright &copy; 2018
                  <a href="legal">Mentions légales</a>
                </p>
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
import operations from './assets/json/operations.json'
import usages from './assets/json/usages.json'
import synthese from './assets/json/synthese.json'
import statusMessages from './assets/json/status.json'
import contact from './assets/json/contact.json'
import verbatims from './assets/json/verbatims.json'
import VueTheMask from 'vue-the-mask'
import VueClipboard from 'vue-clipboard2'
import ModalForm from './components/forms/ModalForm.vue'

import { mailTo } from './utils/mail.js'
import { CONTACT_MAIL, REPORT_ERROR_MAIL } from './constants/mail.js'

Vue.use(VueTheMask)
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
      apiFutureUrl: apiConf.api.futureUrl.replace('<APP>', process.env.APP).replace(/"/g, ''),
      localization: localization,
      operations: operations,
      usages: usages,
      synthese: synthese,
      statusMessages: statusMessages,
      contact: contact,
      verbatims: verbatims,
      lang: localization.default,
      show: false
    }
  },
  created () {
    if (localStorage.getItem('userId') === null) {
      localStorage.setItem('userId', this.guid(), 1)
    }
    window.bus.$on('langChange', value => {
      this.lang = value
    })

    this.contactEmail = mailTo(CONTACT_MAIL)
    this.reportErrorEmail = mailTo(REPORT_ERROR_MAIL)
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
  name: 'App',
  components: {
    ModalForm
  },
  data () {
    return {
      modalFormShow: false
    }
  },
  methods: {
    toggleModalForm (mode = contact.mode.contact, subject = contact.subject.contact) {
      if (this.$store.state.config.v1) {
        this.$store.dispatch('toggleModalForm', { mode: mode, subject: subject })
      }
    }
  }

}
</script>

<style lang="scss" src="./assets/scss/style.scss"></style>
