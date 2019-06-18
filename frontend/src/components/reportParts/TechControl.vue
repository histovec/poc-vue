<template>
  <div>
    <div>
      Contrôles techniques
    </div>
    <div class="row">
      <div class="col-sm-2">
        <span class="txt-small-12"><h6>Date</h6></span>
      </div>
      <div class="col-sm-4">
        <span class="bold txt-small-12"><h6>Nature</h6></span>
      </div>
      <div class="col-sm-4">
        <span class="bold txt-small-12"><h6>Résultat</h6></span>
      </div>
      <div class="col-sm-2">
        <span class="bold txt-small-12"><h6>Km</h6></span>
      </div>
    </div>
    <div class="separator"></div>

    <div
      v-for="(entry, index) in controlesTechniques"
      :key="index"
    >
      <div class="row">
        <div class="col-sm-2">
          <span class="txt-small-12">{{ entry.date }}</span>
        </div>
        <div class="col-sm-4">
          <span class="info_red txt-small-12">{{ entry.nature }}</span>
        </div>
        <div class="col-sm-4">
          <span class="info_red txt-small-12">{{ entry.resultat }}</span>
        </div>
        <div class="col-sm-2">
          <span class="info_red txt-small-12">{{ entry.km }}</span>
        </div>
      </div>
      <div class="separator pv-5"></div>
    </div>
    <!-- fin tableau operation historique FR -->
  </div>
</template>

<script>

import labels from '@/assets/json/techControl.json'
import orderBy from 'lodash.orderby'
import moment from 'moment'

export default {
  props: {
    ct: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    controlesTechniques () {
      if (this.ct.length > 0) {
        return orderBy(this.ct, ['ct_date'], ['desc']).map((controle) => this.labelize(controle))
      } else {
        return []
      }
    },
  },
  mounted () {
    this.$store.dispatch('log', `${this.$route.path}/technical-control`)
  },
  methods: {
    labelize (controle) {
      return {
        date: moment(controle.ct_date, 'YYYY-MM-DD').format('DD/MM/YYYY'),
        nature: labels.nature[controle.ct_nature],
        resultat: labels.resultat[controle.ct_resultat],
        km: controle.ct_km
      }
    }
  }
}

</script>
