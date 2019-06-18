<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-7">
        <h6 class="title p-h-35">
          Résumé
        </h6>
        <p
          v-if="$store.state.config.updateDate"
          class="small"
        >
          information du ministère de l'Intérieur au {{ v.date_update }}
        </p>
      </div>
      <div
        class="col-md-4 alert alert-icon alert-info hidden-sm hidden-xs"
        role="alert"
      >
        <i class="fa fa-info-circle blink_me"></i>Informations utiles
      </div>
    </div>
    <div class="row">
      <!-- debut voiture  -->
      <div class="col-sm-1">
        <i :class="'fa fa-' + v.logo_vehicule + ' fa-2x'"></i>
      </div>
      <div class="col-sm-6">
        <span class="info_red txt-small-13">{{ v.ctec.marque }} {{ v.ctec.modele }}</span>
        <br />
        <div v-if="v.ctec.puissance.cv">
          <span class="txt-small-13">Puissance fiscale :</span>
          <span class="info_red txt-small-13">{{ v.ctec.puissance.cv }} ch</span>
        </div>
      </div>
      <div
        v-if="!holder"
        class="col-sm-5"
      >
        <span class="color-info_2 bold_4 txt-small-13">Calculez le montant de votre certificat d'immatriculation</span>
        <br />
        <a
          href="https://siv.interieur.gouv.fr/map-usg-ui/do/simtax_accueil"
          class="btn-sm-link pop color-info_2 bold_4 txt-small-12 no-padding"
          title="Simulateur"
          target="_blank"
        >
          Accédez au simulateur de calcul
          <i class="fa fa-external-link pl-10"></i>
        </a>
      </div>
      <!-- fin voiture  -->
    </div>
    <!-- debut trait separation  -->
    <div class="separator-2">
    </div>
    <!-- fin trait separation  -->
    <!-- debut trait separation  -->
    <div v-if="v.usage">
      <div
        v-for="(entry, index) in v.usage"
        :key="index"
      >
        <div
          v-if="usages[entry]"
          class="row"
        >
          <!-- debut voiture  -->
          <div class="col-sm-1">
            <i :class="'fa ' + usages[entry].icon + ' fa-2x'"></i>
          </div>
          <div class="col-sm-6">
            <span class="txt-small-13">Usage:</span>
            <span class="info_red txt-small-13"> {{ usages[entry].text }} </span>
            <br />
          </div>
          <div
            v-if="usages[entry].adv"
            class="col-sm-5"
          >
            <span class="color-info_2 bold_4 txt-small-13">{{ usages[entry].adv }}</span>
            <br />
            <a
              v-if="usages[entry].adv"
              :href="usages[entry].link"
              class="btn-sm-link pop color-info_2 bold_4 txt-small-12 no-padding"
              :title="usages[entry].adv"
              target="_blank"
            >
              En savoir plus
              <i class="fa fa-external-link pl-10"></i>
            </a>
          </div>
          <!-- fin voiture  -->
        </div>
        <div
          v-if="usages[entry]"
          class="separator-2"
        >
        </div>
      </div>
    </div>
    <!-- fin trait separation  -->
    <div class="row">
      <!-- debut proprietaire  -->
      <div class="col-sm-1">
        <i class="fa fa-address-card fa-2x pr-10"></i>
      </div>
      <div class="col-sm-6">
        <span class="txt-small-13">Propriétaire actuel : </span><span class="info_red txt-small-13">{{ v.titulaire.identite }} depuis {{ v.certificat.depuis }} </span>
      </div>
      <div class="col-sm-5">
        <div v-if="(!v.certificat.etranger) && (v.fni !== 'ko')">
          <div v-if="holder">
            <span class="color-info_2 bold_4 txt-small-13">Vous êtes le </span>
            <span class="info_red txt-small-13">{{ v.nb_tit }}</span><sup class="info_red txt-small">{{ (v.nb_tit === 1) ? 'er' : 'ème' }}</sup>
            <span class="color-info_2 bold_4 txt-small-13"> titulaire de ce véhicule</span>
          </div>
          <div v-if="!holder">
            <span class="color-info_2 bold_4 txt-small-13">Ce véhicule a déjà eu </span>
            <span class="info_red txt-small-13">{{ v.nb_tit }}</span>
            <span class="color-info_2 bold_4 txt-small-13">titulaire(s), en l'achetant vous serez le</span>
            <span class="info_red txt-small-13">{{ v.nb_tit + 1 }}</span>
            <sup class="info_red txt-small">ème</sup>
          </div>
        </div>
        <!-- <div v-if="(v.fni === 'ko')">
          <span class="color-info_2 bold_4 txt-small-13">Le nombre exact de titulaires ne peut être calculé avec précision</span>
          <span class="color-info_2 bold_4 txt-small-12">(immatriculation avant 2009)</span>
        </div> -->
        <div v-if="v.certificat.etranger">
          <span class="color-info_2 bold_4 txt-small-13">Le nombre exact de titulaires ne peut être calculé avec précision</span>
          <span class="color-info_2 bold_4 txt-small-12">(première immatriculation à l'étranger)</span>
        </div>
      </div>
      <!-- fin proprietaire  -->
    </div>
    <!-- debut trait separation  -->
    <div class="separator-2">
    </div>
    <!-- fin trait separation  -->
    <div class="row">
      <!-- debut immatriculation  -->
      <div class="col-sm-1">
        <i class="fa fa-calendar fa-2x pr-10"></i>
      </div>
      <div class="col-sm-6">
        <span class="txt-small-13">Première immatriculation le</span>
        <span class="info_red txt-small-13">{{ v.certificat.premier }}</span>
        <br />
        <br />
      </div>
      <div class="col-sm-5"></div>
      <!-- fin immatriculation  -->
    </div>
    <!-- debut trait separation  -->
    <div class="separator-2">
    </div>
    <!-- fin trait separation  -->
    <div v-if="false">
      <div class="row">
        <!-- debut releve  -->
        <div class="col-sm-1">
          <i class="fa fa-arrows-h fa-2x pr-10"></i>
        </div>
        <div class="col-sm-6">
          <span class="info_red txt-small-13">48.210 km</span> <span class="txt-small-13">Relevé au dernier contrôle technique du</span> <span class="info_red txt-small-13">21/04/2016</span>
        </div>
        <div class="col-sm-5">
          <span class="color-info_2 bold_4 txt-small-13">Un contrôle technique de moins de 6 mois doit être fourni</span>
        </div>
        <!-- fin releve  -->
      </div>
    </div>
    <div v-if="v.etranger !== 'NON'">
      <div class="row">
        <!-- debut immatriculer  -->
        <div class="col-sm-1">
          <i class="fa fa fa-globe fa-2x pr-10"></i>
        </div>
        <div class="col-sm-6">
          <span class="txt-small-13">Ce véhicule a été</span> <span class="info_red txt-small-13">importé</span>
        </div>
        <div class="col-sm-5">
          <span
            v-if="!holder"
            class="color-info_2 bold_4 txt-small-13"
          >
            Vérifier les options incluses qui peuvent être différentes
          </span>
        </div>
        <!-- fin immatriculer  -->
      </div>
      <!-- debut trait separation  -->
      <div class="separator-2"></div>
      <!-- fin trait separation  -->
    </div>
    <div v-if="(v.sinistres.length > 0) || ($store.state.siv.v.suspensions && $store.state.siv.v.suspensions.includes('PVE'))">
      <div class="row">
        <!-- debut sinistre  -->
        <div class="col-sm-1">
          <i
            :class="[{'fa fa-thumbs-up fa-2x pr-10' : v.apte !== false},
                     {'fa fa-exclamation-triangle info_red fa-2x pr-10' : v.apte === false}]"
          >
          </i>
        </div>
        <div class="col-sm-6">
          <!-- état - un seul sinistre !-->
          <span v-if="v.sinistres_nb === 1 || ((v.sinistres_nb === 0) && $store.state.siv.v.suspensions && $store.state.siv.v.suspensions.includes('PVE'))">
            <span class="txt-small-13">Ce véhicule a eu </span>
            <span class="info_red txt-small-13">un sinistre déclaré</span>
            <span
              v-if="v.sinistres_nb === 1"
              class="txt-small-13"
            >
              en {{ v.sinistre }}
            </span>
            <br />
            <span v-if="v.apte !== false">
              <span class="txt-small-13">et</span>
              <span class="info_red txt-small-13">déclaré apte à circuler</span>
              <span
                v-if="v.apte !== true"
                class="txt-small-13"
              >
                en {{ v.apte }}
              </span>
            </span>
          </span>
          <!-- état - plusieurs sinistres !-->
          <span v-if="v.sinistres_nb > 1">
            <span class="txt-small-13">Ce véhicule a eu </span>
            <span class="info_red txt-small-13">plusieurs sinistres, </span>
            <span class="txt-small-13">dont le dernier déclaré en {{ v.sinistre }}</span>
            <br />
            <span v-if="v.apte !== false">
              <span class="txt-small-13">Le véhicule a été</span>
              <span class="info_red txt-small-13">déclaré apte à circuler</span>
              <span
                v-if="v.apte !== true"
                class="txt-small-13"
              >
                en {{ v.apte }}
              </span>
            </span>
          </span>
        </div>
        <div class="col-sm-5">
          <!-- commentaire: un ou plusieurs sinistres !-->
          <span class="color-info_2 bold_4 txt-small-13">{{ synthese[(v.apte ? 'fin_ove' : 'ove')].adv }}</span>
          <br />
          <span
            v-if="v.sinistres.length > 1"
            class="color-info_2 bold_4 txt-small-13"
          >
            {{ synthese.multi_ove.adv }}
          </span>
        </div>
        <!-- fin sinistre  -->
      </div>
      <!-- debut trait separation  -->
      <div class="separator-2"></div>
      <!-- fin trait separation  -->
    </div>
    <div v-if="(v.administratif.synthese.length === 0) && (v.sinistre === undefined)">
      <div class="row">
        <!-- debut ras  -->
        <div class="col-sm-1">
          <i class="fa fa-check info_green fa-2x"></i>
        </div>
        <div class="col-sm-6">
          <span class="info_red txt-small-13">Rien à signaler</span>
          <span class="txt-small-13">du point de vue administratif
            <br />
            (gages, opposition, vol,...)
          </span>
        </div>
        <div
          v-if="false"
          class="col-sm-5"
        >
          <span class="color-info_2 bold_4 txt-small-13">Demandez au Vendeur un Certificat de Situation Administratif détaillé</span>
        </div>
        <!-- fin ras  -->
      </div>
      <!-- debut trait separation  -->
      <div class="separator-2"></div>
      <!-- fin trait separation  -->
    </div>
    <div
      v-for="(entry, index) in v.administratif.synthese"
      :key="index"
    >
      <div class="row info_red">
        <div class="col-sm-1">
          <i
            class="fa fa-2x pr-10"
            :class="synthese[entry].icon"
          >
          </i>
        </div>
        <div class="col-sm-6 txt-small-13">
          {{ synthese[entry].text }}
        </div>
        <div class="col-sm-5 color-info_2 bold_4 txt-small-13">
          {{ synthese[entry].adv }}
          <br />
          <a
            v-if="synthese[entry].link !== undefined"
            :href="synthese[entry].link"
            target="_blanck"
            class="btn-sm-link pop color-info_2 bold_4 txt-small-12 no-padding"
          >
            En savoir plus
            <i class="fa fa-external-link pl-5"></i>
          </a>
        </div>
      </div>
      <!-- debut trait separation  -->
      <div class="separator-2"></div>
      <!-- fin trait separation  -->
    </div>
    <div>
      <div
        v-if="v.vignette_numero !== ''"
        class="row"
      >
        <!-- debut ras  -->
        <div class="col-sm-1">
          <img
            class="img-responsive"
            :src="'assets/images/vignettes_crit_air/35_petit/vignette_' + v.vignette_numero + '.png'"
          >
        </div>
        <div class="col-sm-6">
          <span class="txt-small-13"> {{ synthese['critair'].text }} {{ v.vignette_numero }}</span>
        </div>
        <div class="col-sm-5 color-info_2 bold_4 txt-small-13">
          {{ synthese['critair'].adv }}
          <br />
          <a
            v-if="synthese['critair'].link !== undefined"
            :href="synthese['critair'].link"
            target="_blanck"
            class="btn-sm-link pop color-info_2 bold_4 txt-small-12 no-padding"
          >
            En savoir plus
            <i class="fa fa-external-link pl-5"></i>
          </a>
        </div>
        <!-- fin ras  -->
      </div>
      <div
        v-if="(v.vignette_numero === '') && !(v.usage && v.usage.includes('COL'))"
        class="row"
      >
        <!-- debut pas de critair  -->
        <div class="col-sm-1">
          <i class="fa fa-ban fa-2x"></i>
        </div>
        <div class="col-sm-6">
          <span class="txt-small-13">Votre véhicule ne répond pas aux critères retenus pour l'attribution d'une vignette Crit'air ou les informations dont nous disposons sont insuffisantes</span>
        </div>
        <div class="col-sm-5 color-info_2 bold_4 txt-small-13">
          {{ synthese['critair'].adv }}
          <br />
          <a
            v-if="synthese['critair'].link !== undefined"
            :href="synthese['critair'].link"
            target="_blanck"
            class="btn-sm-link pop color-info_2 bold_4 txt-small-12 no-padding"
          >
            En savoir plus
            <i class="fa fa-external-link pl-5"></i>
          </a>
        </div>
        <!-- fin ras  -->
      </div>
    </div>
    <div v-if="$store.state.config.allTabs">
      <br />
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
    this.$store.dispatch('log', `${this.$route.path}/synthesis`)
  }
}

</script>
