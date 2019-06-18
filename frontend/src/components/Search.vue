<template>
  <div>
    <!-- breadcrumb start -->
    <div class="breadcrumb-container">
      <div class="container">
        <ol class="breadcrumb">
          <li>
            <i class="fa fa-home pr-10"></i>
            <router-link
              :to="{ name: 'home' }"
            >
              Accueil
            </router-link>
          </li>
          <li class="active">
            Recherche
          </li>
        </ol>
      </div>
    </div>
    <!-- breadcrumb end -->
    <!-- section -->
    <section class="main-container">
      <div class="container">
        <div class="row">
          <!-- section start -->
          <section
            class="dark-translucent-bg"
            style="background-image:url(assets/images/poignee_de_main.jpg); background-position: 50% 50%"
          >
            <div class="container">
              <div class="row justify-content-lg-center">
                <div class="col-lg-12">
                  <h2 class="text-center mt-4">
                    <span class="bold_6">Rassurez</span>
                    vos acheteurs potentiels
                  </h2>
                  <div class="separator with-icon">
                    <i class="fa fa-car bordered"></i>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <!-- section end -->
        </div>
      </div>
    </section>
    <!-- section -->
    <section class="main-container">
      <div class="container">
        <div class="row">
          <div
            v-if="typeImmatriculation === ''"
            class="col-md-12"
          >
            <div class="col-md-1"></div>
            <div class="col-md-10">
              <div
                class="alert alert-warning alert-icon text-center"
                role="alert"
              >
                <i class="fa fa-exclamation-triangle"></i>
                Histovec établit l'historique des véhicules à partir des données enregistrées dans le système d'immatriculation des véhicules (SIV).
              </div>
            </div>
          </div>
          <div
            v-if="$store.state.config.fniMode"
            class="col-md-12"
          >
            <div
              class="text-center"
              role="alert"
            >
              <h4 class="title p-b-25">
                Veuillez sélectionner le format d'immatriculation de votre véhicule
              </h4>
            </div>
          </div>
          <div
            v-if="$store.state.config.fniMode"
            class="col-xs-6 col-sm-6"
          >
            <a
              class="clickable"
              title="Immatriculation après 2009"
              @click="typeImmatriculation = 'siv'"
            >
              <img
                class="img-responsive pull-right"
                :class="{'opacity-plaque': typeImmatriculation === 'fni' }"
                src="assets/images/nouvelle_plaque_immatriculation_fd_transp_txt.png"
                width="200"
                height="44"
              >
            </a>
          </div>
          <div
            v-if="$store.state.config.fniMode"
            class="col-xs-6 col-sm-6"
          >
            <a
              class="clickable"
              title="Immatriculation avant 2009"
              @click="typeImmatriculation = 'fni'"
            >
              <img
                class="img-responsive pull-left"
                :class="{'opacity-plaque': typeImmatriculation === 'siv' }"
                src="assets/images/ancienne_plaque_immatriculation_fd_transp_txt.png"
                width="200"
                height="44"
              >
            </a>
          </div>
          <div
            v-if="typeImmatriculation === 'siv' || typeImmatriculation === 'fni' || !$store.state.config.fniMode"
            class="col-md-12 col-xs-12 p-h-25"
          >
            <!-- tabs start -->
            <!-- ================ -->
            <!-- Nav tabs -->
            <ul
              class="nav nav-tabs style-2"
              role="tablist"
            >
              <li :class="[{'in active' : typePersonne === 'particulier'}]">
                <a
                  class="clickable"
                  @click="typePersonne = 'particulier'"
                >
                  <i class="fa fa-user pr-10"></i>
                  Particulier
                </a>
              </li>
              <li :class="[{'in active' : typePersonne === 'pro'}]">
                <a
                  class="clickable"
                  @click="typePersonne = 'pro'"
                >
                  <i class="fa fa-building-o pr-10"></i>
                  Entreprise
                </a>
              </li>
            </ul>
            <!-- Tab panes -->
            <div class="tab-content">
              <div
                id="h2tab1"
                class="tab-pane in active"
              >
                <div class="row">
                  <div class="col-md-12">
                    <span
                      v-if="(status == 'failed') && (!checkFields)"
                      class="info_red txt-small-11"
                    >
                      * Veuillez renseignez les champs obligatoires
                    </span>
                    <fieldset>
                      <legend>
                        <span class="color-default">Titulaire</span>
                      </legend>
                      <form role="form">
                        <div
                          v-if="typePersonne === 'particulier'"
                          class="row"
                        >
                          <div
                            :class="{
                              'col-md-4': ($store.state.config.id.dateNaissance) && (typeImmatriculation === 'siv' || !$store.state.config.fniMode),
                              'col-md-6': (!$store.state.config.id.dateNaissance) && (typeImmatriculation === 'siv' || !$store.state.config.fniMode),
                              'col-md-8' : ($store.state.config.id.dateNaissance) && (typeImmatriculation === 'fni'),
                              'col-md-12' : (!$store.state.config.id.dateNaissance) && (typeImmatriculation === 'fni')
                            }"
                          >
                            <div
                              class="form-group has-feedback"
                              :class="[{'has-error' : (nom === '' && status !== 'init')}]"
                            >
                              <label
                                v-if="typeImmatriculation === 'siv' || !$store.state.config.fniMode"
                                class="control-label"
                              >
                                Nom de naissance
                                <span
                                  class="info_red"
                                  title="Ce champ est requis."
                                >
                                  *
                                </span>
                              </label>
                              <label
                                v-if="typeImmatriculation === 'fni'"
                                class="control-label"
                              >
                                Nom(s) et Prénom(s)
                                <span
                                  class="info_red"
                                  title="Ce champ est requis."
                                >
                                  *
                                </span>
                              </label>
                              <input
                                id="lastname"
                                ref="nom"
                                v-model="nom"
                                v-focus
                                name="nom"
                                required="required"
                                type="text"
                                class="form-control"
                                tabindex="1"
                                @input="nom = $event.target.value.replace(/\t.*/,'')"
                                @paste="onPaste"
                              >
                              <i class="fa fa-user form-control-feedback"></i>
                            </div>
                          </div>
                          <div
                            v-if="typeImmatriculation === 'siv' || !$store.state.config.fniMode"
                            :class="$store.state.config.id.dateNaissance ? 'col-md-4' : 'col-md-6'"
                          >
                            <div
                              class="form-group has-feedback"
                              :class="[{'has-error' : (prenom === '' && status !== 'init')}]"
                            >
                              <label class="control-label">
                                Prénom(s)
                                <span
                                  class="info_red"
                                  title="Ce champ est requis."
                                >
                                  *
                                </span>
                              </label>
                              <input
                                id="firstname"
                                v-model="prenom"
                                type="text"
                                required="required"
                                class="form-control"
                                tabindex="2"
                              >
                              <i class="fa fa-user form-control-feedback"></i>
                            </div>
                          </div>
                          <div
                            v-if="$store.state.config.id.dateNaissance"
                            class="col-md-4"
                          >
                            <field
                              form-id="dateNaissance"
                              :option="typeImmatriculation"
                              :active="status !== 'init'"
                            >
                            </field>
                          </div>
                        </div>
                        <div
                          v-if="typePersonne === 'pro'"
                          class="row"
                        >
                          <div class="col-md-8">
                            <div
                              class="form-group has-feedback"
                              :class="[{'has-error' : (raisonSociale === '' && status !== 'init')}]"
                            >
                              <label class="control-label">
                                Raison sociale
                                <span
                                  class="info_red"
                                  title="Ce champ est requis."
                                >
                                  *
                                </span>
                              </label>
                              <input
                                id="organization"
                                v-model="raisonSociale"
                                name="raisonSociale"
                                type="text"
                                required="required"
                                class="form-control"
                                tabindex="1"
                                @input="raisonSociale = $event.target.value.replace(/\t.*/,'')"
                                @paste="onPaste"
                              >
                              <i class="fa fa-user form-control-feedback"></i>
                            </div>
                          </div>
                          <div class="col-md-4">
                            <field
                              form-id="siren"
                              :option="typeImmatriculation"
                              :active="status !== 'init'"
                            >
                            </field>
                          </div>
                        </div>
                      </form>
                    </fieldset>
                    <fieldset>
                      <legend><span class="color-default">Carte grise</span></legend>
                      <form role="form">
                        <div class="row">
                          <div class="col-md-6">
                            <field
                              form-id="plaque"
                              :option="typeImmatriculation"
                              :active="status !== 'init'"
                            >
                            </field>
                          </div>
                          <div class="col-md-6">
                            <div
                              class="form-group has-feedback plan position_left"
                              :class="[{'has-error' : ((!checkFormule && !checkDateCertificat) && status !== 'init')}]"
                            >
                              <div v-if="typeImmatriculation === 'siv' || !$store.state.config.fniMode">
                                <label
                                  for="input"
                                  class="control-label"
                                >
                                  N° de formule
                                  <span
                                    class="info_red"
                                    title="Ce champ est requis."
                                  >
                                    *
                                  </span>
                                </label>
                                <a
                                  class="clickable text-info btn-sm-link"
                                  @click="modal = true"
                                >
                                  Où le trouver
                                  <i class="fa fa-info-circle fa-lg"></i>
                                </a>
                                <input
                                  id="formule"
                                  v-model="formule"
                                  v-mask="'####AA#####'"
                                  type="text"
                                  required="required"
                                  class="form-control"
                                  placeholder="2013BZ80335"
                                  tabindex="5"
                                >
                                <i class="fa fa-pencil-square-o form-control-feedback"></i>
                              </div>
                              <div v-if="typeImmatriculation === 'fni' && $store.state.config.fniMode">
                                <label
                                  for="input"
                                  class="control-label"
                                >
                                  Date du certificat d'immatriculation
                                  <span
                                    class="info_red"
                                    title="Ce champ est requis."
                                  >
                                    *
                                  </span>
                                </label>
                                <a
                                  class="clickable text-info btn-sm-link"
                                  @click="modal = true"
                                >
                                  Où la trouver
                                  <i class="fa fa-info-circle fa-lg"></i>
                                </a>
                                <input
                                  id="dateCertificat"
                                  v-model="dateCertificat"
                                  v-mask="'##/##/####'"
                                  type="text"
                                  required="required"
                                  class="form-control"
                                  placeholder="xx/xx/xxxx"
                                  tabindex="5"
                                >
                                <i class="fa fa-calendar form-control-feedback"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </fieldset>
                    <div class="form-group">
                      <div class="row">
                        <div class="col-sm-3">
                        </div>
                        <div class="col-sm-2">
                          <button
                            class="btn btn-animated btn-default btn-sm btn-block"
                            tabindex="6"
                            @click="onSubmit"
                          >
                            <i
                              class="fa"
                              :class="[{'fa-search' : (status === 'init')},
                                       {'fa-spin fa-spinner' : (status === 'posting')},
                                       {'fa-exclamation-triangle' : (status === 'failed')}]"
                            >
                            </i>
                            Rechercher
                          </button>
                        </div>
                        <div class="col-sm-2">
                          <button
                            class="btn btn-animated btn-default btn-sm btn-block"
                            @click="clearAll()"
                          >
                            Effacer
                            <i class="fa fa-close"></i>
                          </button>
                        </div>
                        <div class="col-sm-2">
                          <router-link
                            class="btn btn-animated btn-default btn-sm btn-block"
                            :to="{ name: 'faq',hash:'#i' }"
                          >
                            <i class="fa fa-question"></i>
                            Besoin d'aide
                          </router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- tabs end -->
        </div>
      </div>
    </section>
    <!-- section end -->
    <div class="container">
      <div class="row">
      </div>
    </div>
    <!-- debut modal -->
    <modal-helper
      v-if="modal"
      :fni-mode="$store.state.config.fniMode"
      :type-immatriculation="typeImmatriculation"
      @close="modal = false"
    >
    </modal-helper>
    <!-- fin modal -->
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
import Shake from 'shake.js'
import moment from 'moment'
import ModalHelper from './infos/ModalHelper.vue'
import Field from './forms/Field.vue'

const formInitialOptions = {
  default: {
    required: true,
    requiredTitle: 'Ce champ est requis.',
    maskTitle: 'désactiver le contrôle',
    maskTitleAlt: 'ré-activer le contrôle',
    type: 'text'
  },
  siren: {
    siv: {
      label: 'N° SIREN (9 caractères)',
      model: 'siren',
      masked: true,
      mask: '#########',
      check: /^(\d{9})$/,
      placeholder: '123456789',
      tabindex: '2'
    },
    fni: {
      label: 'N° SIREN (9 caractères)',
      model: 'siren',
      masked: true,
      mask: '#########',
      check: /^[0-9]{9}$/,
      placeholder: '123456789',
      tabindex: '2'
    }
  },
  plaque: {
    siv: {
      label: 'Plaque d\'immatriculation',
      model: 'plaque',
      masked: true,
      mask: 'plaqueSiv',
      maskAlt: 'XXXXXXX',
      maskTitle: 'désactiver le contrôle pour les plaques particulières',
      check: /^[a-zA-Z]{1,2}(-|\s+)?[0-9]{2,3}(-|\s+)?[a-zA-Z]{1,2}$/,
      placeholder: 'AA-123-AA',
      placeholderAlt: 'AA123AA ou A123A ou AA123A',
      icon: 'fa-drivers-license-o',
      tabindex: '4'
    },
    fni: {
      label: 'Plaque d\'immatriculation',
      model: 'plaque',
      masked: true,
      mask: 'plaqueFni',
      maskAlt: 'XXXXXXXX',
      maskTitle: 'désactiver le contrôle pour les plaques particulières',
      check: /^\s*[0-9]{2,4}(-|\s+)?[a-zA-Z]{2,3}(-|\s+)?([0-9]{2,3}|2A|2B)\s*$/,
      placeholder: '123 ABC 45',
      placeholderAlt: '1234ABC45 ou 123ABC45 ou 12ABC45 ou 12AB45',
      icon: 'fa-drivers-license-o',
      tabindex: '4'
    }
  },
  dateNaissance: {
    siv: {
      label: 'Date de naissance',
      model: 'dateNaissance',
      masked: true,
      mask: '##/##/####',
      maskAlt: '####',
      check: /^([0-3][0-9](\/|-|\s+)?[0-1][0-9](\/|-|\s+)?[1-2][0-9]{3}|[1-2][0-9]{3})$/,
      maskTitle: 'désactiver le contrôle si année de naissnce seule',
      placeholder: 'xx/xx/xxxx',
      placeholderAlt: '19xx',
      tabindex: '3'
    },
    fni: {
      label: 'Date de naissance',
      model: 'dateNaissance',
      masked: true,
      mask: '##/##/####',
      maskAlt: '####',
      check: /^([0-3][0-9](\/|-|\s+)?[0-1][0-9](\/|-|\s+)?[1-2][0-9]{3}|[1-2][0-9]{3})$/,
      maskTitle: 'désactiver le contrôle si année de naissnce seule',
      placeholder: 'xx/xx/xxxx',
      placeholderAlt: '19xx',
      tabindex: '2'
    }
  }
}

export default {
  components: {
    ModalHelper,
    Field
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  data () {
    return {
      modal: false,
      status: 'init'
    }
  },
  computed: {
    formOptions: {
      get () {
        return this.$store.state.identity.formOptions
      },
      set (value) {
        this.$store.commit('initFormOptions', value)
      }
    },
    nom: {
      get () {
        return this.$store.state.identity.nom
      },
      set (value) {
        this.$store.commit('updateNom', value)
      }
    },
    prenom: {
      get () {
        return this.$store.state.identity.prenom
      },
      set (value) {
        this.$store.commit('updatePrenom', value)
      }
    },
    dateNaissance: {
      get () {
        return this.$store.state.identity.dateNaissance
      },
      set (value) {
        this.$store.commit('updateDateNaissance', value)
      }
    },
    raisonSociale: {
      get () {
        return this.$store.state.identity.raisonSociale
      },
      set (value) {
        this.$store.commit('updateRaisonSociale', value)
      }
    },
    siren: {
      get () {
        return this.$store.state.identity.siren
      },
      set (value) {
        this.$store.commit('updateSiren', value)
      }
    },
    plaque: {
      get () {
        return this.$store.state.identity.plaque
      },
      set (value) {
        this.$store.commit('updatePlaque', value)
      }
    },
    formule: {
      get () {
        return this.$store.state.identity.formule
      },
      set (value) {
        this.$store.commit('updateFormule', value)
      }
    },
    typePersonne: {
      get () {
        return this.$store.state.identity.typePersonne
      },
      set (value) {
        this.$store.commit('updateTypePersonne', value)
      }
    },
    typeImmatriculation: {
      get () {
        return this.$store.state.identity.typeImmatriculation
      },
      set (value) {
        this.$store.commit('updateTypeImmatriculation', value)
      }
    },
    dateCertificat: {
      get () {
        return this.$store.state.identity.dateCertificat
      },
      set (value) {
        this.$store.commit('updateDateCertificat', value)
      }
    },
    checkDateNaissance () {
      return (!this.$store.state.config.id.dateNaissance) || this.dateNaissance.match(/^([0-3][0-9](\/|-|\s+)?[0-1][0-9](\/|-|\s+)?[1-2][0-9]{3}|[1-2][0-9]{3})$/)
    },
    checkDateCertificat () {
      return this.dateCertificat.match(/^[0-3][0-9](\/|-|\s+)?[0-1][0-9](\/|-|\s+)?[1-2][0-9]{3}$/)
    },
    checkPlaque () {
      if (this.typeImmatriculation === 'fni') {
        return this.plaque.match(/^\s*[0-9]{2,4}(-|\s+)?[a-zA-Z]{2,3}(-|\s+)?([0-9]{2,3}|2A|2B)\s*$/)
      } else {
        return this.plaque.match(/^[a-zA-Z]{1,2}(-|\s+)?[0-9]{2,3}(-|\s+)?[a-zA-Z]{1,2}$/)
      }
    },
    checkFormule () {
      return this.formule.match(/^(\d{2,4}[a-zA-Z]{2}\d{5})$/)
    },
    checkSiren () {
      return this.siren.match(/^\d{9}$/)
    },
    checkFields () {
      return ((this.nom && (this.prenom || this.typeImmatriculation === 'fni') && this.checkDateNaissance) || (this.raisonSociale && this.checkSiren)) && this.checkPlaque && (this.checkFormule || this.checkDateCertificat)
    },
    currentMonthNumber () {
      var date = new Date()
      date = moment().add(-7, 'days').format('YYYYMM')
      return date
    },
    pers_id () {
      if (this.typePersonne === 'particulier') {
        return this.nom + (this.typeImmatriculation === 'siv' ? this.prenom : '') + this.dateNaissance
      } else {
        return this.raisonSociale + this.siren
      }
    },
    veh_id () {
      if (this.typeImmatriculation === 'siv') {
        return this.plaque + this.formule
      } else {
        return this.plaque + this.dateCertificat
      }
    },
    id () {
      return this.$store.state.config.id.code ? this.code : this.hash(this.pers_id + this.veh_id)
    },
    code () {
      return this.$store.state.config.id.strongCode ? this.hash(this.pers_id + this.veh_id + this.currentMonthNumber) : this.hash(this.veh_id + this.currentMonthNumber)
    },
    key () {
      return this.hash(this.veh_id)
    }
  },
  created () {
    if (this.typeImmatriculation === undefined) {
      this.typeImmatriculation = 'siv'
    }
    if (this.formOptions === undefined) {
      this.formOptions = formInitialOptions
    }

    this.$store.dispatch('log', this.$route.path)
    let myShakeEvent = new Shake({
      threshold: 15,
      timeout: 1000
    })
    myShakeEvent.start()
    window.addEventListener('shake', () => { this.active = true }, false)
    if (!window.location.host.match(/(histovec.fr|.gouv.fr$)/)) {
      this.active = true
    }
    this.typePersonne = this.$store.state.identity.typePersonne || this.$route.params.t || 'particulier'
  },
  methods: {
    onPaste (evt) {
      let data = evt.clipboardData.getData('Text').replace(/\s*$/, '').split(/\t+/)
      if (data.length > 1) {
        if (evt.target.name === 'nom') {
          if (this.typeImmatriculation === 'siv' || !this.$store.state.config.fniMode) {
            // this.nom = data[0]
            this.prenom = data[1]
            this.dateNaissance = data[2]
            this.plaque = data[3]
            this.formule = data[4]
          }
          if (this.typeImmatriculation === 'fni') {
            // this.nom = data[0]
            this.dateNaissance = data[1]
            this.plaque = data[2]
            this.dateCertificat = data[3]
          }
        }
        if (evt.target.name === 'raisonSociale') {
          // this.raisonSociale = data[0]
          this.siren = data[1]
          this.plaque = data[2]
          if (this.typeImmatriculation === 'siv' || !this.$store.state.config.fniMode) {
            this.formule = data[3]
          }
          if (this.typeImmatriculation === 'fni') {
            this.dateCertificat = data[3]
          }
        }
      }
    },
    async clearReports () {
      await this.$store.commit('clearSIV')
      await this.$store.commit('clearUTAC')
    },
    async clearAll () {
      await this.$store.commit('clearIdentity')
      this.clearReports()
    },
    normalize (string) {
      try {
        return string.normalize('NFD')
      } catch (e) {
        return string.replace(/[\u0300-\u036f]*/g, '')
      }
    },
    hash (string) {
      var hash = string
      hash = this.normalize(hash).toLowerCase().replace(/[^0-9a-z]/g, '')
      hash = CryptoJS.SHA256(hash).toString(CryptoJS.enc.Base64)
      hash = hash.replace(/\+/g, '-').replace(/\//g, '_')
      return hash
    },
    async onSubmit () {
      this.status = 'posting'
      if (this.checkFields) {
        if (this.id !== this.$store.state.siv.id) {
          this.clearReports()
        }
        this.$router.push({name: 'report', params: {id: this.id, key: this.key, code: this.code}})
      } else {
        this.status = 'failed'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
