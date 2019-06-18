<template>
  <div>
    <h6 class="title">
      Titulaire
    </h6>
    <!-- debut titulaire et co-titulaire -->
    <div v-if="v.titulaire.nature !== undefined">
      <div class="row">
        <div class="col-sm-5">
          <span class="txt-small-12">Nature</span>
        </div>
        <div class="col-sm-7">
          <span class="txt-small-12">{{ v.titulaire.nature }}</span>
        </div>
      </div>
      <div class="separator"></div>
    </div>

    <div class="row">
      <div class="col-sm-5">
        <span class="txt-small-12">Identité</span>
      </div>
      <div class="col-sm-7">
        <span class="info_red txt-small-12">{{ v.titulaire.identite }}</span>
      </div>
    </div>
    <div class="separator"></div>

    <div class="row">
      <div class="col-sm-5">
        <span class="txt-small-12">Code Postal</span>
      </div>
      <div class="col-sm-7">
        <span class="info_red txt-small-12">{{ v.titulaire.adresse }}</span>
      </div>
    </div>
    <div class="separator"></div>
    <!-- fin tableau titulaire et co-titulaire -->
    <h6 class="title">
      Carte grise
    </h6>
    <!-- debut tableau carte grise -->
    <div class="row">
      <div class="col-sm-5">
        <span class="txt-small-12">Date de première immatriculation</span>
        <span
          v-if="v.certificat.etranger"
          class="txt-small-12"
        >
          à l'étranger
        </span>
      </div>
      <div class="col-sm-7">
        <span class="info_red txt-small-12">{{ v.certificat.premier }}</span>
      </div>
    </div>
    <div class="separator"></div>
    <div v-if="v.certificat.etranger">
      <div class="row">
        <div class="col-sm-5">
          <span class="txt-small-12">Date de première immatriculation en France</span>
        </div>
        <div class="col-sm-7">
          <span class="info_red txt-small-12">{{ v.certificat.fr }}</span>
        </div>
      </div>
      <div class="separator"></div>
    </div>
    <div class="row">
      <div class="col-sm-5">
        <span class="txt-small-12">Date de la carte grise actuelle</span>
      </div>
      <div class="col-sm-7">
        <span class="info_red txt-small-12">{{ v.certificat.courant }}</span>
      </div>
    </div>
    <div class="separator"></div>
  </div>
</template>

<script>

export default {
  props: {
    v: {
      type: Object,
      default: () => {}
    }
  },
  mounted () {
    this.$store.dispatch('log', `${this.$route.path}/holder`)
  }
}

</script>
