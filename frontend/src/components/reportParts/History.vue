<template>
  <div>
    <div>
      Historique des opérations en France
    </div>
    <div class="row">
      <div class="col-sm-4">
        <span class="txt-small-12"><h6>Date</h6></span>
      </div>
      <div class="col-sm-8">
        <span class="bold txt-small-12"><h6>Opération</h6></span>
      </div>
    </div>
    <div class="separator"></div>

    <div
      v-for="(entry, index) in v.historique"
      :key="index"
    >
      <div class="row">
        <div class="col-sm-4">
          <span class="txt-small-12">{{ entry.date }}</span>
        </div>
        <div class="col-sm-8">
          <span class="info_red txt-small-12">{{ entry.nature }}</span>
        </div>
      </div>
      <div class="separator pv-5"></div>
    </div>
    <div v-if="v.certificat.incertain">
      <div class="row">
        <div class="col-sm-4">
          <span class="txt-small-12">{{ v.certificat.fr }}</span>
        </div>
        <div class="col-sm-8">
          <span class="info_red txt-small-12"> Première immatriculation (source incertaine)</span>
        </div>
      </div>
      <div class="separator pv-5"></div>
    </div>
    <!-- fin tableau operation historique FR -->
    <br />
    <div v-if="v.certificat.etranger">
      Historique des opérations à l'étranger
    </div>
    <!-- debut tableau operation historique Etranger -->
    <div v-if="v.certificat.etranger">
      <div class="row">
        <div class="col-sm-4">
          <span class="txt-small-12"><h6>Date</h6></span>
        </div>
        <div class="col-sm-8">
          <span class="bold txt-small-12"><h6>Opération</h6></span>
        </div>
      </div>
      <div class="separator"></div>
      <div>
        <div class="row">
          <div class="col-sm-4">
            <span class="txt-small-12">{{ v.certificat.premier }}</span>
          </div>
          <div class="col-sm-8">
            <span class="info_red txt-small-12">Première immatriculation à l'étranger</span>
          </div>
        </div>
        <div class="separator pv-5"></div>
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
    }
  },
  mounted () {
    this.$store.dispatch('log', `${this.$route.path}/history`)
  }
}

</script>
