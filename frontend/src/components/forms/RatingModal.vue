<template>
  <div v-if="$store.state.isRatingModalVisible">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  type="button"
                  class="close"
                  @click="close()"
                >
                  <span aria-hidden="true">&times;</span>
                  <span class="sr-only">Fermer</span>
                </button>
                <h5 class="modal-title">
                  Votre évaluation
                </h5>
              </div>
              <div class="modal-body">
                <div class="content">
                  <div class="row">
                    <div class="p-g-17 text-center">
                      <h6>
                        <b>Vous pouvez donner votre avis sur le service HistoVec :</b>
                      </h6>
                    </div>
                  </div>
                  <br>
                  <div class="row">
                    <div class="col-sm-8 p-g-17">
                      <img
                        :src="logoMinistereInterieur"
                        class="img-responsive img-inline"
                        width="140px"
                        alt="Logo voxusagers.numerique.gouv.fr"
                      >
                      <span>
                        <b>voxusagers.</b><i>numerique.gouv.fr</i>
                      </span>
                    </div>
                  </div>
                  <br />
                  <div class="row">
                    <a
                      href="https://voxusagers.numerique.gouv.fr/Demarches/1867?&view-mode=formulaire-avis&nd_mode=en-ligne-enti%C3%A8rement&nd_source=button&key=8a933f17a9df32bb39598522e6d48688"
                      target="_blank"
                      @click="setEvaluation"
                    >
                      <img
                        width="140px"
                        src="https://voxusagers.numerique.gouv.fr/static/bouton-blanc.svg"
                        alt="Je donne mon avis"
                        title="Je donne mon avis sur cette démarche"
                        class="img-responsive img-center"
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <div class="row">
                  <div class="col-md-6 m-h-15 position_left">
                    <label>
                      <input
                        id="showModal"
                        v-model="notShow"
                        name="showModal"
                        type="checkbox"
                        @change="persistNotShow"
                      >
                      Ne plus afficher
                    </label>
                  </div>
                  <div class="col-md-6">
                    <button
                      class="btn btn-animated btn-default"
                      @click="close()"
                    >
                      Fermer
                      <i class="fa fa-close"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

import logoMinistereInterieur from '@/assets/img/logo_mi.png'

export default {
  data () {
    return {
      notShow: localStorage.getItem('notShow') === 'true',

      // images
      logoMinistereInterieur,
    }
  },
  methods: {
    close () {
      this.$store.dispatch('toggleRatingModal')
      return
    },
    persistNotShow ({ target: { checked } }) {
      localStorage.setItem('notShow', checked)
    },
    setEvaluation () {
      localStorage.setItem('evaluation', true)
    }
  }
}

</script>

