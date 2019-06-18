<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <h6 class="title">
          Caractéristiques techniques
        </h6>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-6">
        <span class="txt-small-12">Marque</span>
      </div>
      <div class="col-sm-2">
        <span class="bold txt-small-12">D.1</span>
      </div>
      <div class="col-sm-4">
        <span class="info_red txt-small-12">{{ v.ctec.marque }}</span>
      </div>
    </div>
    <div class="separator"></div>
    <div class="row">
      <div class="col-sm-6">
        <span class="txt-small-12">Type variante version</span>
      </div>
      <div class="col-sm-2">
        <span class="bold txt-small-12">D.2</span>
      </div>
      <div class="col-sm-4">
        <span class="info_red txt-small-12">{{ v.ctec.tvv }}</span>
      </div>
    </div>
    <div class="separator"></div>
    <div class="row">
      <div class="col-sm-6">
        <span class="txt-small-12">Nom commercial</span>
      </div>
      <div class="col-sm-2">
        <span class="bold txt-small-12">D.3</span>
      </div>
      <div class="col-sm-4">
        <span class="info_red txt-small-12">{{ v.ctec.modele }}</span>
      </div>
    </div>
    <div class="separator"></div>
    <div class="row">
      <div class="col-sm-6">
        <span class="txt-small-12">Numéro CNIT</span>
      </div>
      <div class="col-sm-2">
        <span class="bold txt-small-12">D.2.1</span>
      </div>
      <div class="col-sm-4">
        <span class="info_red txt-small-12">{{ v.ctec.cnit }}</span>
      </div>
    </div>
    <div class="separator"></div>
    <div class="row">
      <div class="col-sm-6">
        <span class="txt-small-12">Couleur</span>
      </div>
      <div class="col-sm-2">
        <span class="bold txt-small-12">&nbsp;</span>
      </div>
      <div class="col-sm-4">
        <span class="info_red txt-small-12">{{ v.ctec.couleur }}</span>
      </div>
    </div>
    <div class="separator"></div>
    <div class="row">
      <div class="col-sm-6">
        <span class="txt-small-12">Type de reception</span>
      </div>
      <div class="col-sm-2">
        <span class="bold txt-small-12">&nbsp;</span>
      </div>
      <div class="col-sm-4">
        <span class="info_red txt-small-12">CE</span>
      </div>
    </div>
    <div class="separator"></div>
    <div class="row">
      <td
        class="no-trait-left no-trait-right"
        colspan="3"
      >
        &nbsp;
      </td>
    </div>
    <div class="separator"></div>
    <div class="row">
      <div class="col-sm-6">
        <span class="txt-small-12">Numéro d'identification véhicule</span>
      </div>
      <div class="col-sm-2">
        <span class="bold txt-small-12">E</span>
      </div>
      <div class="col-sm-4">
        <span class="info_red txt-small-12">{{ v.ctec.vin }}</span>
      </div>
    </div>
    <div class="separator"></div>
    <div class="row">
      <td colspan="3">
        &nbsp;
      </td>
    </div>
    <div class="separator"></div>
    <div v-if="v.ctec.PT.admissible">
      <div class="row">
        <div class="col-sm-6">
          <span class="txt-small-12">PT technique admissible (kg)</span>
        </div>
        <div class="col-sm-2">
          <span class="bold txt-small-12">F.1</span>
        </div>
        <div class="col-sm-4">
          <span class="info_red txt-small-12">{{ v.ctec.PT.admissible }}</span>
        </div>
      </div>
      <div class="separator"></div>
    </div>
    <div v-if="v.ctec.PT.AC">
      <div class="row">
        <div class="col-sm-6">
          <span class="txt-small-12">PTAC (kg)</span>
        </div>
        <div class="col-sm-2">
          <span class="bold txt-small-12">F.2</span>
        </div>
        <div class="col-sm-4">
          <span class="info_red txt-small-12">{{ v.ctec.PT.AC }}</span>
        </div>
      </div>
      <div class="separator"></div>
    </div>
    <div v-if="v.ctec.PT.RA">
      <div class="row">
        <div class="col-sm-6">
          <span class="txt-small-12">PTRA (kg)</span>
        </div>
        <div class="col-sm-2">
          <span class="bold txt-small-12">F.3</span>
        </div>
        <div class="col-sm-4">
          <span class="info_red txt-small-12">{{ v.ctec.PT.RA }}</span>
        </div>
      </div>
      <div class="separator"></div>
    </div>
    <div v-if="v.ctec.PT.admissible || v.ctec.PT.admissible || v.ctec.PT.AC || v.ctec.PT.RA">
      <div class="row">
        <td colspan="3">
          &nbsp;
        </td>
      </div>
      <div class="separator"></div>
    </div>
    <div v-if="v.ctec.PT.service">
      <div class="row">
        <div class="col-sm-6">
          <span class="txt-small-12">PT en service (kg)</span>
        </div>
        <div class="col-sm-2">
          <span class="bold txt-small-12">G</span>
        </div>
        <div class="col-sm-4">
          <span class="info_red txt-small-12">{{ v.ctec.PT.service }}</span>
        </div>
      </div>
      <div class="separator"></div>
    </div>
    <div v-if="v.ctec.PT.AV">
      <div class="row">
        <div class="col-sm-6">
          <span class="txt-small-12">PTAV (kg)</span>
        </div>
        <div class="col-sm-2">
          <span class="bold txt-small-12">G.1</span>
        </div>
        <div class="col-sm-4">
          <span class="info_red txt-small-12">{{ v.ctec.PT.AV }}</span>
        </div>
      </div>
      <div class="separator"></div>
    </div>
    <div v-if="v.ctec.PT.service || v.ctec.PT.AV">
      <div class="row">
        <td colspan="3">
          &nbsp;
        </td>
      </div>
      <div class="separator"></div>
    </div>
    <div v-if="v.ctec.categorie">
      <div class="row">
        <div class="col-sm-6">
          <span class="txt-small-12">Catégorie (Ce)</span>
        </div>
        <div class="col-sm-2">
          <span class="bold txt-small-12">J</span>
        </div>
        <div class="col-sm-4">
          <span class="info_red txt-small-12">{{ v.ctec.categorie }}</span>
        </div>
      </div>
      <div class="separator"></div>
    </div>
    <div v-if="v.ctec.genre">
      <div class="row">
        <div class="col-sm-6">
          <span class="txt-small-12">Genre (National)</span>
        </div>
        <div class="col-sm-2">
          <span class="bold txt-small-12">J.1</span>
        </div>
        <div class="col-sm-4">
          <span class="info_red txt-small-12">{{ v.ctec.genre }}</span>
        </div>
      </div>
      <div class="separator"></div>
    </div>
    <div v-if="v.ctec.carrosserie.ce">
      <div class="row">
        <div class="col-sm-6">
          <span class="txt-small-12">Carrosserie (Ce)</span>
        </div>
        <div class="col-sm-2">
          <span class="bold txt-small-12">J.2</span>
        </div>
        <div class="col-sm-4">
          <span class="info_red txt-small-12">{{ v.ctec.carrosserie.ce }}</span>
        </div>
      </div>
      <div class="separator"></div>
    </div>
    <div v-if="v.ctec.carrosserie.national">
      <div class="row">
        <div class="col-sm-6">
          <span class="txt-small-12">Carrosserie (National)</span>
        </div>
        <div class="col-sm-2">
          <span class="bold txt-small-12">J.3</span>
        </div>
        <div class="col-sm-4">
          <span class="info_red txt-small-12">{{ v.ctec.carrosserie.national }}</span>
        </div>
      </div>
      <div class="separator"></div>
    </div>
    <div class="row">
      <td colspan="3">
        &nbsp;
      </td>
    </div>
    <div class="separator"></div>
    <div v-if="v.ctec.reception.numero">
      <div class="row">
        <div class="col-sm-6">
          <span class="txt-small-12">Numéro de réception</span>
        </div>
        <div class="col-sm-2">
          <span class="bold txt-small-12">K</span>
        </div>
        <div class="col-sm-4">
          <span class="info_red txt-small-12">{{ v.ctec.reception.numero }}</span>
        </div>
      </div>
      <div class="separator"></div>
      <div class="row">
        <td colspan="3">
          &nbsp;
        </td>
      </div>
      <div class="separator"></div>
    </div>
    <div v-if="v.ctec.puissance.cylindres">
      <div class="row">
        <div class="col-sm-6">
          <span class="txt-small-12">Cylindrée (cm3)</span>
        </div>
        <div class="col-sm-2">
          <span class="bold txt-small-12">P.1</span>
        </div>
        <div class="col-sm-4">
          <span class="info_red txt-small-12">{{ v.ctec.puissance.cylindres }}</span>
        </div>
      </div>
      <div class="separator"></div>
    </div>
    <div v-if="v.ctec.puissance.nette">
      <div class="row">
        <div class="col-sm-6">
          <span class="txt-small-12">Puissance nette max (kW)</span>
        </div>
        <div class="col-sm-2">
          <span class="bold txt-small-12">P.2</span>
        </div>
        <div class="col-sm-4">
          <span class="info_red txt-small-12">{{ v.ctec.puissance.nette }}</span>
        </div>
      </div>
      <div class="separator"></div>
    </div>
    <div v-if="v.ctec.energie">
      <div class="row">
        <div class="col-sm-6">
          <span class="txt-small-12">Energie</span>
        </div>
        <div class="col-sm-2">
          <span class="bold txt-small-12">P.3</span>
        </div>
        <div class="col-sm-4">
          <span class="info_red txt-small-12">{{ v.ctec.energie }}</span>
        </div>
      </div>
      <div class="separator"></div>
    </div>
    <div v-if="v.ctec.puissance.cv">
      <div class="row">
        <div class="col-sm-6">
          <span class="txt-small-12">Puissance CV</span>
        </div>
        <div class="col-sm-2">
          <span class="bold txt-small-12">P.6</span>
        </div>
        <div class="col-sm-4">
          <span class="info_red txt-small-12">{{ v.ctec.puissance.cv }}</span>
        </div>
      </div>
      <div class="separator"></div>
    </div>
    <div class="row">
      <td colspan="3">
        &nbsp;
      </td>
    </div>
    <div class="separator"></div>
    <div v-if="v.ctec.puissance.norm">
      <div class="row">
        <div class="col-sm-6">
          <span class="txt-small-12">Puissance / masse (kW/kg)</span>
        </div>
        <div class="col-sm-2">
          <span class="bold txt-small-12">Q</span>
        </div>
        <div class="col-sm-4">
          <span class="info_red txt-small-12">{{ v.ctec.puissance.norm }}</span>
        </div>
      </div>
      <div class="separator"></div>
      <div class="row">
        <td colspan="3">
          &nbsp;
        </td>
      </div>
      <div class="separator"></div>
    </div>
    <div v-if="v.ctec.places.assis">
      <div class="row">
        <div class="col-sm-6">
          <span class="txt-small-12">Places assises</span>
        </div>
        <div class="col-sm-2">
          <span class="bold txt-small-12">S.1</span>
        </div>
        <div class="col-sm-4">
          <span class="info_red txt-small-12">{{ v.ctec.places.assis }}</span>
        </div>
      </div>
      <div class="separator"></div>
    </div>
    <div v-if="v.ctec.places.debout">
      <div class="row">
        <div class="col-sm-6">
          <span class="txt-small-12">Places debout</span>
        </div>
        <div class="col-sm-2">
          <span class="bold txt-small-12">S.3</span>
        </div>
        <div class="col-sm-4">
          <span class="info_red txt-small-12">{{ v.ctec.places.debout }}</span>
        </div>
      </div>
      <div class="separator"></div>
    </div>
    <div class="row">
      <td colspan="3">
        &nbsp;
      </td>
    </div>
    <div class="separator"></div>
    <div v-if="v.ctec.db">
      <div class="row">
        <div class="col-sm-6">
          <span class="txt-small-12">Niveau sonore (db(A))</span>
        </div>
        <div class="col-sm-2">
          <span class="bold txt-small-12">U.1</span>
        </div>
        <div class="col-sm-4">
          <span class="info_red txt-small-12">{{ v.ctec.db }}</span>
        </div>
      </div>
      <div class="separator"></div>
    </div>
    <div v-if="v.ctec.moteur">
      <div class="row">
        <div class="col-sm-6">
          <span class="txt-small-12">Vitesse moteur (min-1)</span>
        </div>
        <div class="col-sm-2">
          <span class="bold txt-small-12">U.2</span>
        </div>
        <div class="col-sm-4">
          <span class="info_red txt-small-12">{{ v.ctec.moteur }}</span>
        </div>
      </div>
      <div class="separator"></div>
    </div>
    <div v-if="v.ctec.db || v.ctec.moteur">
      <div class="row">
        <td colspan="3">
          &nbsp;
        </td>
      </div>
      <div class="separator"></div>
    </div>
    <div v-if="v.ctec.co2">
      <div class="row">
        <div class="col-sm-6">
          <span class="txt-small-12">CO2 (g/km)</span>
        </div>
        <div class="col-sm-2">
          <span class="bold txt-small-12">V.7</span>
        </div>
        <div class="col-sm-4">
          <span class="info_red txt-small-12">{{ v.ctec.co2 }}</span>
        </div>
      </div>
      <div class="separator"></div>
    </div>
    <div v-if="v.ctec.environnement">
      <div class="row">
        <div class="col-sm-6">
          <span class="txt-small-12">Classe environnement (CE)</span>
        </div>
        <div class="col-sm-2">
          <span class="bold txt-small-12">V.9</span>
        </div>
        <div class="col-sm-4">
          <span class="info_red txt-small-12">{{ v.ctec.environnement }}</span>
        </div>
      </div>
      <div class="separator"></div>
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
    this.$store.dispatch('log', `${this.$route.path}/vehicle`)
  }
}

</script>
