<template>
  <div>
    <div class="row">
      <div class="col-sm-6">
        <h6 class="title">
          Gages
        </h6>
        <!-- debut tableau gages -->
        <div class="col-sm-12">
          <span class="info_red txt-small-12">{{ v.administratif.gages }}</span>
          <div class="separator-2"></div>
        </div>
      </div>
      <div class="col-sm-6">
        <h6 class="title">
          Oppositions
        </h6>
        <!-- debut tableau oppositions -->
        <div class="col-sm-12">
          <span class="info_red txt-small-12">{{ v.administratif.oppositions }} </span>
          <span
            v-if="v.administratif.pv && holder"
            class="txt-small-12"
          >
            <br />
            Appelez le 08 21 08 00 31
          </span>
          <div class="separator-2"></div>
        </div>
        <!-- fin tableau oppositions -->
      </div>
      <div class="col-sm-6">
        <h6 class="title">
          Suspensions
        </h6>
        <!-- debut tableau suspensions -->
        <div class="col-sm-12">
          <div
            v-for="(suspension, index) in v.administratif.suspensions"
            :key="index"
          >
            <span class="info_red txt-small-12">{{ suspension }}</span>
          </div>
          <div class="separator-2"></div>
        </div>
        <!-- fin tableau suspensions -->
      </div>
      <div class="col-sm-6">
        <h6 class="title">
          Procédures
        </h6>
        <!-- debut tableau procédures -->
        <div class="col-sm-12">
          <span class="info_red txt-small-12">{{ v.administratif.procedures }}</span>
          <div class="separator-2"></div>
        </div>
        <!-- fin tableau procédures -->
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <h6 class="title">
          Véhicule
        </h6>
        <!-- debut tableau véhicule -->
        <div class="col-sm-4">
          <span class="txt-small-12">Etat de vol</span>
        </div>
        <div class="col-sm-3">
          <span class="info_red txt-small-12">{{ v.administratif.vol }}</span>
        </div>
        <!-- fin tableau véhicule -->
      </div>
      <div class="col-sm-6">
        <h6 class="title">
          Etat de la carte grise
        </h6>
        <!-- debut tableau titre -->
        <div class="col-sm-5">
          <span class="txt-small-12">Etat de vol</span>
        </div>
        <div class="col-sm-5">
          <span class="info_red txt-small-12">{{ v.administratif.titre.vol }}</span>
        </div>
        <div class="col-sm-5">
          <span class="txt-small-12">Etat de perte</span>
        </div>
        <div class="col-sm-5">
          <span class="info_red txt-small-12">{{ v.administratif.titre.perte }}</span>
        </div>
        <div class="col-sm-5">
          <span class="txt-small-12">Duplicata</span>
        </div>
        <div class="col-sm-5">
          <span class="info_red txt-small-12">{{ v.administratif.titre.duplicata }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    v: {
      type: Object,
      default: () => {}
    },
    holder: Boolean
  },
  mounted () {
    this.$store.dispatch('log', `${this.$route.path}/administrative-status`)
  }
}

</script>
