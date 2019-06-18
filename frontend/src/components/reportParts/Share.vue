<template>
  <div
    class="pv-30 ph-20 feature-box bordered_spec text-center"
    style="background: white"
  >
    <div class="row">
      <!-- debut alerte verte -->
      <div
        v-show="notifSuccess"
        class="col-md-12"
      >
        <div
          class="alert alert-icon alert-success"
          role="alert"
        >
          <i class="fa fa-check"></i>Le lien a été copié
        </div>
      </div>
      <!-- fin alerte verte -->
      <div class="col-md-12 p-h-10">
        <p>
          Vous pouvez transmettre à votre acheteur potentiel, le rapport que vous venez de consulter par mail.
          <br />
          Ce rapport sera accessible jusqu'au {{ validityDate }}
          <br />
        </p>
        <p class="text-center">
          <button
            v-clipboard:copy="url"
            class="btn radius-30 btn-dark btn-animated btn"
            @click="showNotifSuccess"
          >
            Copier le lien
            <i class="fa fa-copy"></i>
          </button>
          <a
            :href="'mailto:?subject=Rapport%20Histovec&body=' + mailBody"
            class="btn radius-30 btn-default btn-animated btn"
            @click="logReportMailDispatch"
          >
            Courriel
            <i class="fa fa-send"></i>
          </a>
        </p>
      </div>
      <div class="row">
        <div class="col-md-12">
          Ou par QR code
          <p></p>
        </div>
      </div>
      <!-- <div class="separator"></div> -->
      <div class="row">
        <div
          class="col-md-12"
          style="fload: none; margin: 0 auto"
        >
          <qrcode-vue
            :value="url"
            :size="150"
            level="L"
          >
          </qrcode-vue>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import QrcodeVue from 'qrcode.vue'
import moment from 'moment'

export default {
  components: {
    QrcodeVue
  },
  props: {
    v: {
      type: Object,
      default: () => {}
    },
    url: {
      type: String,
      default: ''
    },
    baseurl: {
      type: String,
      default: ''
    },
    holder: Boolean
  },
  data () {
    return {
      notifSuccess: false,
      timerNotifSuccess: 2000
    }
  },
  computed: {
    validityDate () {
      return moment().add(-7, 'days').add(2, 'months').date(0).format('DD/MM/YYYY')
    },
    mailBody () {
      var text = encodeURI('Un titulaire de véhicule vous transmet un rapport HistoVec\n\nRendez-vous sur le lien suivant pour le consulter: \n')
      return text + this.url.replace('&', '%26')
    }
  },
  mounted () {
    this.$store.dispatch('log', `${this.$route.path}/share`)
  },
  methods: {
    logReportMailDispatch () {
      this.$store.dispatch('log', `${this.$route.path}/share/mail`)
    },
    showNotifSuccess () {
      this.$store.dispatch('log', `${this.$route.path}/share/copy`)

      this.notifSuccess = true
      setTimeout(() => {
        this.notifSuccess = false
      }, this.timerNotifSuccess)
    }
  }
}

</script>