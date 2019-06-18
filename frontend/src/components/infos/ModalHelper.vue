<template>
  <transition name="modal">
    <div class="modal-mask">
      <div
        v-if="typeImmatriculation === 'siv' || !fniMode"
        class="modal-wrapper"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="close"
                @click="close()"
              >
                <span aria-hidden="true">&times;</span><span class="sr-only">Fermer</span>
              </button>
              <h6 class="modal-title">
                Information n° de formule
              </h6>
            </div>
            <div
              class="modal-body"
              style="height: 250px; overflow-y: auto;"
            >
              <img
                alt="Indication localisation numéro de formule : sous le numéro d'immatriculation ou dans la bande MRZ ou sur la première page de la carte grise"
                src="assets/images/n-formule.jpg"
                class="img-responsive"
                style="margin: 0 auto;"
              >
            </div>
            <div class="modal-footer">
              <a
                class="btn radius-30 btn btn-animated btn-default"
                @click="close()"
              >
                Fermer <i class="fa fa-close"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="typeImmatriculation === 'fni'"
        class="modal-wrapper"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="close"
                @click="close()"
              >
                <span aria-hidden="true">&times;</span><span class="sr-only">Fermer</span>
              </button>
              <h6 class="modal-title">
                Information date du certificat d'immatriculation
              </h6>
            </div>
            <div
              class="modal-body"
              style="height: 250px; overflow-y: auto;"
            >
              <h4 class="text-danger bold_6">
                Carte grise après 2004
              </h4>
              <img
                src="assets/images/nouvelle_carte_grise.jpg"
                class="img-responsive"
              >
              <br />
              <h4 class="text-danger bold_6">
                Carte grise avant 2004
              </h4>
              <img
                src="assets/images/carte_grise_avant_2004.jpg"
                class="img-responsive"
              >
              <br />
              <h4 class="text-danger bold_6">
                Carte grise 1970
              </h4>
              <img
                src="assets/images/carte_grise_1970.jpg"
                class="img-responsive"
              >
            </div>
            <div class="modal-footer">
              <a
                class="btn radius-30 btn btn-animated btn-default"
                @click="close()"
              >
                Fermer
                <i class="fa fa-close"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    fniMode: Boolean,
    typeImmatriculation: {
      type: String,
      default: 'siv'
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>
