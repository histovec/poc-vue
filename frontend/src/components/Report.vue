<template>
<section id="result">
  <!-- breadcrumb start -->
  <div class="breadcrumb-container">
    <div class="container">
      <ol class="breadcrumb">
        <li><i class="fa fa-home pr-10"></i><a href="home">Accueil</a></li>
        <li class="active">Résultats</li>
      </ol>
    </div>
  </div>
  <!-- breadcrumb end -->
  <!-- section -->
<section class="main-container">
  <div class="container">
    <div class="row">
      <!-- section start -->
      <section class="dark-translucent-bg" style="background-image:url(assets/images/poignee_de_main.jpg); background-position: 50% 50%">
        <div class="container">
          <div class="row justify-content-lg-center">
            <div class="col-lg-12">
              <h2 class="text-center mt-4">
                <div v-if="holder"><span class="bold_6">Rassurez</span> vos acheteurs potentiels</div>
                <div v-else><span class="bold_6">Achetez</span> en confiance un <span class="bold_6">véhicule d'occasion</span></div>
              </h2>
              <div class="separator with-icon"><i class="fa fa-car bordered"></i></div>
            </div>
          </div>
        </div>
      </section>
      <!-- section end -->
    </div>
  </div>
</section>
<!-- section -->

  <!-- main-container start -->
  <div class="container" v-if="(this.result === 'ok') || (this.result === 'cached')">
    <div class="row">
      <div class="col-lg-12 mb-20">
        <!-- debut vignette -->
        <div class="row">
          <div class="col-sm-5">
            <div class="alert alert-icon alert-info" role="alert"> <i v-bind:class="'fa fa-' + v.logo_vehicule " ></i> Numéro - Plaque d'immatriculation : {{ v.plaque }}</div>
          </div>
        </div>
        <!-- fin vignette -->
        <!-- debut trait séparation -->
        <div class="separator-2"></div>
        <!-- fin trait séparation -->
        <!-- debut nouvelle info -->
        <!-- Tabs start -->
        <div class="vertical">
          <!-- Nav tabs -->
          <ul class="nav nav-tabs" role="tablist">
            <li :class="[{'active' : tab === 'abstract'}]"><a class="clickable" @click="tab = 'abstract'"><i class="fa fa-refresh pr-10"></i> Synthèse</a></li>
            <li :class="[{'active' : tab === 'vehicle'}]"><a class="clickable" @click="tab = 'vehicle'"><i v-bind:class="'fa fa-' + v.logo_vehicule + ' pr-10'" ></i>Véhicule</a></li>
            <li :class="[{'active' : tab === 'holder'}]"><a class="clickable" @click="tab = 'holder'"><i class="fa fa-address-card pr-10"></i>Titulaire & Titre</a></li>
            <li :class="[{'active' : tab === 'situation'}]"><a class="clickable" @click="tab = 'situation'"><i class="fa fa-clipboard pr-10"></i> Situation administrative</a></li>
            <li :class="[{'active' : tab === 'history'}]"><a class="clickable" @click="tab = 'history'"><i class="fa fa-calculator pr-10"></i> Historique des opérations </a></li>
            <li :class="[{'active' : tab === 'send'}]" v-if="holder"><a class="clickable" @click="tab = 'send'"><i class="fa fa-send pr-10"></i> Transmettre le rapport</a></li>
          </ul>
          <!-- Tab panes -->
          <div class="tab-content">
            <!-- /* ----------------- debut synthese ----------------- */ -->
            <div class="tab-pane fade" :class="[{'in active' : hidden['all_tabs'] || tab === 'abstract'}]">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-7">
                    <h6 class="title p-h-35">Résumé</h6>
                    <p class="small" v-if="hidden['date_update']"> information du ministère de l'Intérieur au {{ v.date_update }}</p>
                  </div>
                  <div class="col-md-4 alert alert-icon alert-info hidden-sm hidden-xs" role="alert"> <i class="fa fa-info-circle blink_me"></i>Informations utiles</div>
                </div>
                <div class="row">
                  <!-- debut voiture  -->
                  <div class="col-sm-1"><i v-bind:class="'fa fa-' + v.logo_vehicule + ' fa-2x'" ></i></div>
                  <div class="col-sm-6"><span class="info_red txt-small-13">{{ v.ctec.marque }} {{ v.ctec.modele }}</span></br>
                  <div v-if="v.ctec.puissance.cv">  <span class="txt-small-13">Puissance fiscale :</span> <span class="info_red txt-small-13">{{ v.ctec.puissance.cv }} ch</span></div> </div>
                  <div class="col-sm-5" v-if="!holder">
                    <span class="color-info_2 bold_4 txt-small-13">Calculez le montant de votre certificat d'immatriculation</span><br/><a href="https://siv.interieur.gouv.fr/map-usg-ui/do/simtax_accueil" class="btn-sm-link pop color-info_2 bold_4 txt-small-12 no-padding" data-container="body" data-toggle="popover" data-placement="top" data-content="Calculez le montant de votre certificat d'immatriculation" data-original-title="Simulateur" title="Simulateur" target="_blank">Accédez au simulateur de calcul<i class="fa fa-external-link pl-10"></i></a>
                  </div>
                    <!-- fin voiture  -->
                </div>
                  <!-- debut trait separation  -->
                <div class="separator-2"></div>
                  <!-- fin trait separation  -->
                <div class="row">
                    <!-- debut proprietaire  -->
                  <div class="col-sm-1"><i class="fa fa-address-card fa-2x pr-10"></i></div>
                  <div class="col-sm-6"><span class="txt-small-13">Propriétaire actuel : </span><span class="info_red txt-small-13">{{ v.titulaire.identite }} depuis {{ v.certificat.depuis }} </span></div>
                  <div class="col-sm-5">
                    <div v-if="(!v.certificat.etranger) && (v.fni !== 'ko')">
                      <div v-if="holder">
                        <span class="color-info_2 bold_4 txt-small-13">Vous êtes le </span>
                        <span class="info_red txt-small-13">{{v.nb_tit}}</span>
                        <sup v-if="v.nb_tit === 1" class="info_red txt-small">er</sup>
                        <sup v-if="v.nb_tit > 1" class="info_red txt-small">ème</sup>
                        <span class="color-info_2 bold_4 txt-small-13"> titulaire de ce véhicule</span>
                      </div>
                      <div v-if="!holder">
                        <span class="color-info_2 bold_4 txt-small-13">Ce véhicule a déjà eu </span>
                        <span class="info_red txt-small-13">{{ v.nb_tit }}</span>
                        <span class="color-info_2 bold_4 txt-small-13">titulaire(s), en l'achetant vous serez le</span>
                        <span class="info_red txt-small-13">{{ v.nb_tit + 1}}</span>
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
                <div class="separator-2"></div>
                <!-- fin trait separation  -->
                <div class="row">
                  <!-- debut immatriculation  -->
                  <div class="col-sm-1"><i class="fa fa-calendar fa-2x pr-10"></i></div>
                  <div class="col-sm-6"><span class="txt-small-13">Première immatriculation le</span> <span class="info_red txt-small-13">{{ v.certificat.premier }}</span><br/><br/></div>
                  <div class="col-sm-5"></div>
                  <!-- fin immatriculation  -->
                </div>
                <!-- debut trait separation  -->
                <div class="separator-2"></div>
                <!-- fin trait separation  -->
                <div v-if="false">
                  <div class="row">
                    <!-- debut releve  -->
                    <div class="col-sm-1"><i class="fa fa-arrows-h fa-2x pr-10"></i></div>
                    <div class="col-sm-6"><span class="info_red txt-small-13">48.210 km</span> <span class="txt-small-13">Relevé au dernier contrôle technique du</span> <span class="info_red txt-small-13">21/04/2016</span> </div>
                    <div class="col-sm-5"><span class="color-info_2 bold_4 txt-small-13">Un contrôle technique de moins de 6 mois doit être fourni</span></div>
                    <!-- fin releve  -->
                  </div>
                  <!-- debut trait separation  -->
                  <div class="separator-2" v-if="false"></div>
                  <!-- fin trait separation  -->
                </div>
                <div v-if="v.etranger !== 'NON'">
                  <div class="row">
                    <!-- debut immatriculer  -->
                    <div class="col-sm-1"><i class="fa fa fa-globe fa-2x pr-10"></i></div>
                    <div class="col-sm-6"><span class="txt-small-13">Ce véhicule a été</span> <span class="info_red txt-small-13">importé</span> </div>
                    <div class="col-sm-5"><span class="color-info_2 bold_4 txt-small-13" v-if="!holder">Vérifier les options incluses qui peuvent être différentes</span></div>
                    <!-- fin immatriculer  -->
                  </div>
                  <!-- debut trait separation  -->
                  <div class="separator-2"></div>
                  <!-- fin trait separation  -->
                </div>
                <div v-if="v.sinistres.length > 0">
                  <div class="row">
                    <!-- debut sinistre  -->
                    <div class="col-sm-1"><i :class="[{'fa fa-thumbs-up fa-2x pr-10' : v.apte !== false},
                                 {'fa fa-exclamation-triangle info_red fa-2x pr-10' : v.apte === false}]"></i></div>
                    <div class="col-sm-6">
                      <!-- état - un seul sinistre !-->
                      <span v-if="v.sinistres_nb === 1">
                        <span class="txt-small-13">Ce véhicule a eu </span> <span class="info_red txt-small-13">un sinistre déclaré</span> <span class="txt-small-13">en {{v.sinistre}}</span></br>
                        <span v-if="v.apte !== false"> <span class="txt-small-13">et</span> <span class="info_red txt-small-13">déclaré apte à circuler</span> <span class="txt-small-13" v-if="v.apte !== true">en {{v.apte}}</span></span>
                      </span>
                      <!-- état - plusieurs sinistres !-->
                      <span v-if="v.sinistres_nb > 1">
                        <span class="txt-small-13">Ce véhicule a eu </span> <span class="info_red txt-small-13">plusieurs sinistres, </span> <span class="txt-small-13">dont le dernier déclaré en {{v.sinistre}}</span></br>
                        <span v-if="v.apte !== false"> <span class="txt-small-13">Le véhicule a été</span> <span class="info_red txt-small-13">déclaré apte à circuler</span> <span class="txt-small-13" v-if="v.apte !== true">en {{v.apte}}</span></span>
                      </span>
                    </div>
                    <div class="col-sm-5">
                      <!-- commentaire: un ou plusieurs sinistres !-->
                      <span class="color-info_2 bold_4 txt-small-13">{{ synthese[(v.apte ? 'fin_ove' : 'ove')].adv }}</span><br/>
                      <span class="color-info_2 bold_4 txt-small-13" v-if="v.sinistres.length > 1">{{ synthese.multi_ove.adv }}</span>
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
                    <div class="col-sm-1"><i class="fa fa-check info_green fa-2x"></i></div>
                    <div class="col-sm-6"><span class="info_red txt-small-13">Rien à signaler</span> <span class="txt-small-13">du point de vue administratif</br>
                          (gages, opposition, vol,...)</span> </div>
                    <div class="col-sm-5" v-if="false"><span class="color-info_2 bold_4 txt-small-13">Demandez au Vendeur un Certificat de Situation Administratif détaillé</span></div>
                    <!-- fin ras  -->
                  </div>
                  <!-- debut trait separation  -->
                  <div class="separator-2"></div>
                  <!-- fin trait separation  -->
                </div>
                <div v-for="(entry, index) in v.administratif.synthese" :key="index">
                  <div class="row info_red">
                    <div class="col-sm-1"><i class="fa fa-2x pr-10" :class="synthese[entry].icon"></i></div>
                    <div class="col-sm-6 txt-small-13"> {{ synthese[entry].text }} </div>
                    <div class="col-sm-5 color-info_2 bold_4 txt-small-13"> {{ synthese[entry].adv }}
                      <br/><a target="_blanck" class="btn-sm-link pop color-info_2 bold_4 txt-small-12 no-padding" v-if="synthese[entry].link !== undefined" :href="synthese[entry].link"> En savoir plus <i class="fa fa-external-link pl-5"></i> </a>
                    </div>
                  </div>
                  <!-- debut trait separation  -->
                  <div class="separator-2"></div>
                  <!-- fin trait separation  -->
                </div>
                <div v-if="v.vignette_numero !== ''">
                  <div class="row">
                    <!-- debut ras  -->
                    <div class="col-sm-1"><img class="img-responsive" v-bind:src="'assets/images/vignettes_crit_air/35_petit/vignette_' + v.vignette_numero + '.png' "></div>
                    <div class="col-sm-6"><span class="txt-small-13"> {{ synthese['critair'].text }} {{ v.vignette_numero }}</span> </div>
                    <div class="col-sm-5 color-info_2 bold_4 txt-small-13">  {{ synthese['critair'].adv }}
                      <br/><a target="_blanck" class="btn-sm-link pop color-info_2 bold_4 txt-small-12 no-padding" v-if="synthese['critair'].link !== undefined" :href="synthese['critair'].link"> En savoir plus <i class="fa fa-external-link pl-5"></i> </a>
                    </div>

                    <!-- fin ras  -->
                  </div>
                </div>
                <div v-if="hidden['all_tabs']"><br/></div>
              </div>
            </div>
            <!-- /* ----------------- fin synthese ----------------- */ -->
            <!-- /* ----------------- debut vehicule ----------------- */ -->
            <div class="tab-pane fade pr-20" :class="[{'in active' : hidden['all_tabs'] || tab === 'vehicle'}]">
              <div class="row">
                <div class="col-md-12">
                  <h6 class="title">Caractéristiques techniques</h6>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6"><span class="txt-small-12">Marque</span></div>
                <div class="col-sm-2"><span class="bold txt-small-12">D.1</span></div>
                <div class="col-sm-4"><span class="info_red txt-small-12">{{ v.ctec.marque }}</span></div>
              </div>
              <div class="separator"></div>
              <div class="row">
                <div class="col-sm-6"><span class="txt-small-12">Tvv</span></div>
                <div class="col-sm-2"><span class="bold txt-small-12">D.2</span></div>
                <div class="col-sm-4"><span class="info_red txt-small-12">{{ v.ctec.tvv }}</span></div>
              </div>
              <div class="separator"></div>
              <div class="row">
                <div class="col-sm-6"><span class="txt-small-12">Nom commercial</span></div>
                <div class="col-sm-2"><span class="bold txt-small-12">D.3</span></div>
                <div class="col-sm-4"><span class="info_red txt-small-12">{{ v.ctec.modele }}</span></div>
              </div>
              <div class="separator"></div>
              <div class="row">
                <div class="col-sm-6"><span class="txt-small-12">Numéro CNIT</span></div>
                <div class="col-sm-2"><span class="bold txt-small-12">D.2.1</span></div>
                <div class="col-sm-4"><span class="info_red txt-small-12">{{ v.ctec.cnit }}</span></div>
              </div>
              <div class="separator"></div>
              <div class="row">
                <div class="col-sm-6"><span class="txt-small-12">Couleur</span></div>
                <div class="col-sm-2"><span class="bold txt-small-12">&nbsp;</span></div>
                <div class="col-sm-4"><span class="info_red txt-small-12">{{ v.ctec.couleur }}</span></div>
              </div>
              <div class="separator"></div>
              <div class="row">
                <div class="col-sm-6"><span class="txt-small-12">Type de reception</span></div>
                <div class="col-sm-2"><span class="bold txt-small-12">&nbsp;</span></div>
                <div class="col-sm-4"><span class="info_red txt-small-12">CE</span></div>
              </div>
              <div class="separator"></div>
              <div class="row">
                <td class="no-trait-left no-trait-right" colspan="3">&nbsp;</td>
              </div>
              <div class="separator"></div>
              <div class="row">
                <div class="col-sm-6"><span class="txt-small-12">Numéro d'identification véhicule</span></div>
                <div class="col-sm-2"><span class="bold txt-small-12">E</span></div>
                <div class="col-sm-4"><span class="info_red txt-small-12">{{ v.ctec.vin }}</span></div>
              </div>
              <div class="separator"></div>
              <div class="row">
                <td colspan="3">&nbsp;</td>
              </div>
              <div class="separator"></div>
              <div v-if="v.ctec.PT.admissible">
                <div class="row">
                  <div class="col-sm-6"><span class="txt-small-12">PT technique admissible (kg)</span></div>
                  <div class="col-sm-2"><span class="bold txt-small-12">F.1</span></div>
                  <div class="col-sm-4"><span class="info_red txt-small-12">{{ v.ctec.PT.admissible }}</span></div>
                </div>
                <div class="separator"></div>
              </div>
              <div v-if="v.ctec.PT.AC">
                <div class="row">
                  <div class="col-sm-6"><span class="txt-small-12">PTAC (kg)</span></div>
                  <div class="col-sm-2"><span class="bold txt-small-12">F.2</span></div>
                  <div class="col-sm-4" v-if><span class="info_red txt-small-12">{{ v.ctec.PT.AC }}</span></div>
                </div>
                <div class="separator"></div>
              </div>
              <div v-if="v.ctec.PT.RA">
                <div class="row">
                  <div class="col-sm-6"><span class="txt-small-12">PTRA (kg)</span></div>
                  <div class="col-sm-2"><span class="bold txt-small-12">F.3</span></div>
                  <div class="col-sm-4"><span class="info_red txt-small-12">{{ v.ctec.PT.RA }}</span></div>
                </div>
                <div class="separator"></div>
              </div>
              <div v-if="v.ctec.PT.admissible || v.ctec.PT.admissible || v.ctec.PT.AC || v.ctec.PT.RA">
                <div class="row">
                  <td colspan="3">&nbsp;</td>
                </div>
                <div class="separator"></div>
              </div>
              <div v-if="v.ctec.PT.service">
                <div class="row">
                  <div class="col-sm-6"><span class="txt-small-12">PT en service (kg)</span></div>
                  <div class="col-sm-2"><span class="bold txt-small-12">G</span></div>
                  <div class="col-sm-4"><span class="info_red txt-small-12">{{ v.ctec.PT.service }}</span></div>
                </div>
                <div class="separator"></div>
              </div>
              <div v-if="v.ctec.PT.AV">
                <div class="row">
                  <div class="col-sm-6"><span class="txt-small-12">PTAV (kg)</span></div>
                  <div class="col-sm-2"><span class="bold txt-small-12">G.1</span></div>
                  <div class="col-sm-4"><span class="info_red txt-small-12">{{ v.ctec.PT.AV }}</span></div>
                </div>
                <div class="separator"></div>
              </div>
              <div v-if="v.ctec.PT.service || v.ctec.PT.AV">
                <div class="row">
                  <td colspan="3">&nbsp;</td>
                </div>
                <div class="separator"></div>
              </div>
              <div v-if="v.ctec.categorie">
                <div class="row">
                  <div class="col-sm-6"><span class="txt-small-12">Catégorie (Ce)</span></div>
                  <div class="col-sm-2"><span class="bold txt-small-12">J</span></div>
                  <div class="col-sm-4"><span class="info_red txt-small-12">{{ v.ctec.categorie }}</span></div>
                </div>
                <div class="separator"></div>
              </div>
              <div v-if="v.ctec.genre">
                <div class="row">
                  <div class="col-sm-6"><span class="txt-small-12">Genre (National)</span></div>
                  <div class="col-sm-2"><span class="bold txt-small-12">J.1</span></div>
                  <div class="col-sm-4"><span class="info_red txt-small-12">{{ v.ctec.genre }}</span></div>
                </div>
                <div class="separator"></div>
              </div>
              <div v-if="v.ctec.carrosserie.ce">
                <div class="row">
                  <div class="col-sm-6"><span class="txt-small-12">Carrosserie (Ce)</span></div>
                  <div class="col-sm-2"><span class="bold txt-small-12">J.2</span></div>
                  <div class="col-sm-4"><span class="info_red txt-small-12">{{ v.ctec.carrosserie.ce }}</span></div>
                </div>
                <div class="separator"></div>
              </div>
              <div v-if="v.ctec.carrosserie.national">
                <div class="row">
                  <div class="col-sm-6"><span class="txt-small-12">Carrosserie (National)</span></div>
                  <div class="col-sm-2"><span class="bold txt-small-12">J.3</span></div>
                  <div class="col-sm-4"><span class="info_red txt-small-12">{{ v.ctec.carrosserie.national }}</span></div>
                </div>
                <div class="separator"></div>
              </div>
              <div class="row">
                <td colspan="3">&nbsp;</td>
              </div>
              <div class="separator"></div>
              <div v-if="v.ctec.reception.numero">
                <div class="row">
                  <div class="col-sm-6"><span class="txt-small-12">Numéro de réception</span></div>
                  <div class="col-sm-2"><span class="bold txt-small-12">K</span></div>
                  <div class="col-sm-4"><span class="info_red txt-small-12">{{ v.ctec.reception.numero }}</span></div>
                </div>
                <div class="separator"></div>
                <div class="row">
                  <td colspan="3">&nbsp;</td>
                </div>
                <div class="separator"></div>
              </div>
              <div v-if="v.ctec.puissance.cylindres">
                <div class="row">
                  <div class="col-sm-6"><span class="txt-small-12">Cylindrée (cm3)</span></div>
                  <div class="col-sm-2"><span class="bold txt-small-12">P.1</span></div>
                  <div class="col-sm-4"><span class="info_red txt-small-12">{{ v.ctec.puissance.cylindres }}</span></div>
                </div>
                <div class="separator"></div>
              </div>
              <div v-if="v.ctec.puissance.nette">
                <div class="row">
                  <div class="col-sm-6"><span class="txt-small-12">Puissance nette max (kW)</span></div>
                  <div class="col-sm-2"><span class="bold txt-small-12">P.2</span></div>
                  <div class="col-sm-4"><span class="info_red txt-small-12">{{ v.ctec.puissance.nette }}</span></div>
                </div>
                <div class="separator"></div>
              </div>
              <div v-if="v.ctec.energie">
                <div class="row">
                  <div class="col-sm-6"><span class="txt-small-12">Energie</span></div>
                  <div class="col-sm-2"><span class="bold txt-small-12">P.3</span></div>
                  <div class="col-sm-4"><span class="info_red txt-small-12">{{ v.ctec.energie }}</span></div>
                </div>
                <div class="separator"></div>
              </div>
              <div v-if="v.ctec.puissance.cv">
                <div class="row">
                  <div class="col-sm-6"><span class="txt-small-12">Puissance CV</span></div>
                  <div class="col-sm-2"><span class="bold txt-small-12">P.6</span></div>
                  <div class="col-sm-4"><span class="info_red txt-small-12">{{ v.ctec.puissance.cv }}</span></div>
                </div>
                <div class="separator"></div>
              </div>
              <div class="row">
                <td colspan="3">&nbsp;</td>
              </div>
              <div class="separator"></div>
              <div v-if="v.ctec.puissance.norm">
                <div class="row">
                  <div class="col-sm-6"><span class="txt-small-12">Puissance / masse (kW/kg)</span></div>
                  <div class="col-sm-2"><span class="bold txt-small-12">Q</span></div>
                  <div class="col-sm-4"><span class="info_red txt-small-12">{{ v.ctec.puissance.norm }}</span></div>
                </div>
                <div class="separator"></div>
                <div class="row">
                  <td colspan="3">&nbsp;</td>
                </div>
                <div class="separator"></div>
              </div>
              <div v-if="v.ctec.places.assis">
                <div class="row">
                  <div class="col-sm-6"><span class="txt-small-12">Places assises</span></div>
                  <div class="col-sm-2"><span class="bold txt-small-12">S.1</span></div>
                  <div class="col-sm-4"><span class="info_red txt-small-12">{{ v.ctec.places.assis }}</span></div>
                </div>
                <div class="separator"></div>
              </div>
              <div v-if="v.ctec.places.debout">
                <div class="row">
                  <div class="col-sm-6"><span class="txt-small-12">Places debout</span></div>
                  <div class="col-sm-2"><span class="bold txt-small-12">S.3</span></div>
                  <div class="col-sm-4"><span class="info_red txt-small-12">{{ v.ctec.places.debout }}</span></div>
                </div>
                <div class="separator"></div>
              </div>
              <div class="row">
                <td colspan="3">&nbsp;</td>
              </div>
              <div class="separator"></div>
              <div v-if="v.ctec.db">
                <div class="row">
                  <div class="col-sm-6"><span class="txt-small-12">Niveau sonore (db(A))</span></div>
                  <div class="col-sm-2"><span class="bold txt-small-12">U.1</span></div>
                  <div class="col-sm-4"><span class="info_red txt-small-12">{{ v.ctec.db }}</span></div>
                </div>
                <div class="separator"></div>
              </div>
              <div v-if="v.ctec.moteur">
                <div class="row">
                  <div class="col-sm-6"><span class="txt-small-12">Vitesse moteur (min-1)</span></div>
                  <div class="col-sm-2"><span class="bold txt-small-12">U.2</span></div>
                  <div class="col-sm-4"><span class="info_red txt-small-12">{{ v.ctec.moteur }}</span></div>
                </div>
                <div class="separator"></div>
              </div>
              <div v-if="v.ctec.db || v.ctec.moteur">
                <div class="row">
                  <td colspan="3">&nbsp;</td>
                </div>
                <div class="separator"></div>
              </div>
              <div v-if="v.ctec.co2">
                <div class="row">
                  <div class="col-sm-6"><span class="txt-small-12">CO2 (g/km)</span></div>
                  <div class="col-sm-2"><span class="bold txt-small-12">V.7</span></div>
                  <div class="col-sm-4"><span class="info_red txt-small-12">{{ v.ctec.co2 }}</span></div>
                </div>
                <div class="separator"></div>
              </div>
              <div v-if="v.ctec.environnement">
                <div class="row">
                  <div class="col-sm-6"><span class="txt-small-12">Classe environnement (CE)</span></div>
                  <div class="col-sm-2"><span class="bold txt-small-12">V.9</span></div>
                  <div class="col-sm-4"><span class="info_red txt-small-12">{{ v.ctec.environnement }}</span></div>
                </div>
                <div class="separator"></div>
              </div>
              <!-- fin tableau v.-->
              <!-- debut tableau controle technique -->
              <!-- <table class="table table-striped table-responsive" v-if="beta">
                <tbody>
                  <tr>
                    <td colspan="4">
                      <h6>Contrôle technique</h6></td>
                  </tr>
                  <tr>
                    <div class="col-sm-2"><span class="bold txt-small-12">OTC</span></div>
                    <div class="col-sm-6"><span class="txt-small-12">Résultat</span></div>
                    <div class="col-sm-6"><span class="txt-small-12"><span class="label label-success">{{ v.controle.otc.resultat }}</span></span></div>
                    <div class="col-sm-6"><span class="txt-small-12">Date du contrôle</span></div>
                    <div class="col-sm-4"><span class="info_red txt-small-12">{{ v.controle.otc.date }}</span></div>
                    <div class="col-sm-6"><span class="txt-small-12">Fin de validité</span></div>
                    <div class="col-sm-4"><span class="info_red txt-small-12">{{ v.controle.otc.validite }}</span></div>
                  </tr>

                  <tr>
                    <div class="col-sm-2"><span class="bold txt-small-12">SIV</span></div>
                    <div class="col-sm-6"><span class="txt-small-12">Résultat</span></div>
                    <div class="col-sm-6"><span class="txt-small-12"><span class="label label-warning">{{ v.controle.siv.resultat }}</span></span></div>
                    <div class="col-sm-6"><span class="txt-small-12">Date du contrôle</span></div>
                    <div class="col-sm-4"><span class="info_red txt-small-12">{{ v.controle.siv.date }}</span></div>
                    <div class="col-sm-6"><span class="txt-small-12">Fin de validité</span></div>
                    <div class="col-sm-4"><span class="info_red txt-small-12">{{ v.controle.siv.validite }}</span></div>
                  </tr>

                </tbody>
              </table> -->
              <!-- fin tableau controle technique -->
              <!-- debut mentions particuliéres : à supprimer ultérieurement ? selon validation comité Histovec -->
              <!-- <table class="table table-striped table-responsive">
                <tbody>
                  <div class="row">
                    <td>
                      <h6>Mentions particulières</h6></td>
                  </div>
                  <div class="separator"></div>

                  <div class="row">
                    <td>
                      <div class="alert alert-info" role="alert">{{ v.mentions }}</div>
                    </td>
                  </div>
                  <div class="separator"></div>

                </tbody>
              </table> -->
              <!-- fin mentions particuliéres -->
            </div>
            <div class="tab-pane fade" :class="[{'in active' : hidden['all_tabs'] || tab === 'holder'}]">
              <h6 class="title">Titulaire</h6>
              <!-- debut titulaire et co-titulaire -->
              <div v-if="v.titulaire.nature !== undefined">
                <div class="row">
                  <div class="col-sm-5"><span class="txt-small-12">Nature</span></div>
                  <div class="col-sm-7"><span class="txt-small-12">{{ v.titulaire.nature }}</span></div>
                </div>
                <div class="separator"></div>
              </div>

              <div class="row">
                <div class="col-sm-5"><span class="txt-small-12">Identité</span></div>
                <div class="col-sm-7"><span class="info_red txt-small-12">{{ v.titulaire.identite }}</span></div>
              </div>
              <div class="separator"></div>

              <div class="row">
                <div class="col-sm-5"><span class="txt-small-12">Code Postal</span></div>
                <div class="col-sm-7"><span class="info_red txt-small-12">{{ v.titulaire.adresse }}</span></div>
              </div>
              <div class="separator"></div>
              <!-- fin tableau titulaire et co-titulaire -->
              <h6 class="title">Carte grise</h6>
              <!-- debut tableau carte grise -->
              <div class="row">
                <div class="col-sm-5"><span class="txt-small-12">Date de première immatriculation</span><span class="txt-small-12" v-if="v.certificat.etranger"> à l'étranger</span></div>
                <div class="col-sm-7"><span class="info_red txt-small-12">{{ v.certificat.premier }}</span></div>
              </div>
              <div class="separator"></div>
              <div v-if="v.certificat.etranger">
                <div class="row" >
                  <div class="col-sm-5"><span class="txt-small-12">Date de première immatriculation en France</span></div>
                  <div class="col-sm-7"><span class="info_red txt-small-12">{{ v.certificat.fr }}</span></div>
                </div>
                <div class="separator"></div>
              </div>
              <div class="row">
                <div class="col-sm-5"><span class="txt-small-12">Date de la carte grise actuelle</span></div>
                <div class="col-sm-7"><span class="info_red txt-small-12">{{ v.certificat.courant }}</span></div>
              </div>
              <div class="separator"></div>
              <!-- debut tableau situation administrative -->
            </div>
            <div class="tab-pane fade" :class="[{'in active' : hidden['all_tabs'] || tab === 'situation'}]">
              <div class="row">
                <div class="col-sm-6">
                  <h6 class="title">Gages</h6>
                  <!-- debut tableau gages -->
                  <div class="col-sm-5"><span class="info_red txt-small-12">{{ v.administratif.gages }}</span>
                    <div class="separator-2"></div>
                  </div>
                </div>
                <div class="col-sm-6">
                  <h6 class="title">Oppositions</h6>
                  <!-- debut tableau oppositions -->
                  <div class="col-sm-12">
                    <span class="info_red txt-small-12">{{ v.administratif.oppositions }} </span>
                    <span class="txt-small-12" v-if="v.administratif.pv && holder"><br/>Appelez le 08 21 08 00 31</span>
                    <div class="separator-2"></div>
                  </div>
                  <!-- fin tableau oppositions -->
                </div>
                <div class="col-sm-6">
                  <h6 class="title">Suspensions</h6>
                  <!-- debut tableau suspensions -->
                  <div class="col-sm-5"><span class="info_red txt-small-12">{{ v.administratif.suspensions }}</span>
                    <div class="separator-2"></div>
                  </div>
                  <!-- fin tableau suspensions -->
                </div>
                <div class="col-sm-6">
                  <h6 class="title">Procédures</h6>
                  <!-- debut tableau procédures -->
                  <div class="col-sm-5"><span class="info_red txt-small-12">{{ v.administratif.procedures }}</span>
                    <div class="separator"></div>
                  </div>
                  <!-- fin tableau procédures -->
                </div>
                <div class="col-sm-6">
                  <h6 class="title">Véhicule</h6>
                  <!-- debut tableau véhicule -->
                  <div class="col-sm-4"><span class="txt-small-12">Etat de vol</span></div>
                  <div class="col-sm-3"><span class="info_red txt-small-12">{{ v.administratif.vol }}</span></div>
                  <!-- fin tableau véhicule -->
                </div>
                <div class="col-sm-6">
                  <h6 class="title">Etat de la carte grise</h6>
                  <!-- debut tableau titre -->
                  <div class="col-sm-5"><span class="txt-small-12">Etat de vol</span></div>
                  <div class="col-sm-5"><span class="info_red txt-small-12">{{ v.administratif.titre.vol }}</span></div>
                  <div class="col-sm-5"><span class="txt-small-12">Etat de perte</span></div>
                  <div class="col-sm-5"><span class="info_red txt-small-12">{{ v.administratif.titre.perte }}</span></div>
                  <div class="col-sm-5"><span class="txt-small-12">Duplicata</span></div>
                  <div class="col-sm-5"><span class="info_red txt-small-12">{{ v.administratif.titre.duplicata }}</span></div>
                </div>
            <!-- <div class="row">
                      <div class="col-sm-6"><span class="txt-small-12">Remise du titre</span></div>
                      <div class="col-sm-4"><span class="info_red txt-small-12">{{ v.administratif.titre.remise }}</span></div>
                    </div>
                  <div class="separator"></div>
              -->
              <!-- debut bouton imprimer csa detaille -->
                <div v-shortkey="['ctrl', 'alt', 'p']" @shortkey="hidden['pdf'] = !hidden['pdf']"></div>
                <div v-shortkey="['ctrl', 'alt', 'm']" @shortkey="hidden['date_update'] = !hidden['date_update']"></div>
                <div v-shortkey="['ctrl', 'alt', 'a']" @shortkey="hidden['all_tabs'] = !hidden['all_tabs']"></div>
                <div class="col-sm-12 pv-20" v-if="holder&&hidden['pdf']">
                  <p class="text-center">
                    L'article R.322-4 du code de la route, précise que la remise du certificat d'immatriculation
                    doit être accompagnée d'un certificat de situation administrative détaillé (CSA), établi depuis moins de quinze jours
                    par le ministre de l'intérieur, attestant à sa date d'édition de la situation administrative du véhicule.
                  </p>
                  <p class="text-center">
                    <button v-on:click="generatePDF" type="button" class="btn btn-animated btn-default btn-sm marg_but pop" data-container="body" data-toggle="popover" data-placement="top" data-content="Le certificat de situation administrative (CSA) est un document délivré par le ministère de l'Intérieur contenant des éléments d'information sur la situation administrative d'un véhicule.<br>Le CSA détaillé fait apparaître l'ensemble des informations relatives à la situation du véhicule."
                    data-original-title="CSA" title="CSA"> Imprimer le CSA<i class="fa fa-print"></i> </button>
                  </p>
                </div>
              <!-- fin bouton imprimer csa detaille -->
              </div>
            </div>
            <div class="tab-pane fade" :class="[{'in active' : hidden['all_tabs'] || tab === 'history'}]">
              <!-- debut tableau operation historique FR -->
              <div>Historique des opérations en France</div>
              <div class="row">
                <div class="col-sm-4"><span class="txt-small-12"><h6>Date</h6></span></div>
                <div class="col-sm-8"><span class="bold txt-small-12"><h6>Opération</h6></span></div>
              </div>
              <div class="separator"></div>

              <div v-for="(entry, index) in v.historique" :key="index">
                <div class="row">
                  <div class="col-sm-4"><span class="txt-small-12">{{ entry.date }}</span></div>
                  <div class="col-sm-8"><span class="info_red txt-small-12">{{ entry.nature }}</span></div>
                </div>
                <div class="separator pv-5"></div>
              </div>
              <!-- fin tableau operation historique FR -->
              <br />
              <div v-if="v.certificat.etranger">Historique des opérations à l'étranger</div>
              <!-- debut tableau operation historique Etranger -->
              <div v-if="v.certificat.etranger">
                <div class="row">
                  <div class="col-sm-4"><span class="txt-small-12"><h6>Date</h6></span></div>
                  <div class="col-sm-8"><span class="bold txt-small-12"><h6>Opération</h6></span></div>
                </div>
                <div class="separator"></div>
                <div>
                  <div class="row">
                    <div class="col-sm-4"><span class="txt-small-12">{{ v.certificat.premier }}</span></div>
                    <div class="col-sm-8"><span class="info_red txt-small-12">Première immatriculation à l'étranger</span></div>
                  </div>
                  <div class="separator pv-5"></div>
                </div>
              </div>

              <!-- fin tableau operation historique Etranger-->
            </div>
            <div class="tab-pane fade" :class="[{'in active' : hidden['all_tabs'] || tab === 'send'}]" v-if="holder">
              <div class="pv-30 ph-20 feature-box bordered_spec text-center" style="background: white">
                <div class="row">
                  <!-- debut alerte verte -->
                  <div class="col-md-12" v-if="notifSuccess">
                    <div class="alert alert-icon alert-success" role="alert"><i class="fa fa-check"></i>Le lien a été copié</div>
                  </div>
                  <!-- fin alerte verte -->
                  <div class="col-md-12 p-h-10">
                    <p>Vous pouvez transmettre à votre acheteur potentiel, le rapport que vous venez de consulter par mail.<br>
                      Ce rapport sera accessible <b> 4 semaines </b> à partir de l'envoi. <br>
                    <p class="text-center">
                      <button v-clipboard:copy="url" v-on:click="showNotifSuccess" class="btn radius-30 btn-dark btn-animated btn">Copier le lien <i class="fa fa-copy"></i></button>
                      <a :href="'mailto:?subject=Rapport%20Histovec&body=' + mailBody" class="btn radius-30 btn-default btn-animated btn">Courriel <i class="fa fa-send"></i></a>
                    </p>
                  </div>
                  <div class="row">
                    <div class="col-md-12">Ou par QR code </div>
                  </div>
                  <div class="separator"></div>
                  <div class="row">
                    <div class="col-md-12" style="fload: none; margin: 0 auto">
                      <qrcode-vue :value="url" :size="150" level="L"></qrcode-vue>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <!-- tabs end -->
        <!-- debut trait de séparation -->
        <hr class="style1">
        <!-- fin trait de séparation -->
      </div>
    </div>
    <!-- row -->
  </div>
  <!-- container -->

  <div class="container" v-if="this.result === 'wait'">
    <div class="row">
      <div class="col-lg-12">
        <div class="alert alert-info text-center" role="alert">  Recherche en cours <i class="fa fa-spinner fa-spin"></i> </div>
      </div>
    </div>
  </div>

  <div class="container" v-if="this.result === 'notFound'">
    <div class="row">
      <div class="col-lg-12">
        <div class="alert alert-icon alert-danger" role="alert"> <i class="fa fa-warning"></i> Désolé, nous n'avons pas trouvé de résultat pour cette recherche. <router-link class="clickable alert-danger" :to="{ name: 'faq'}"><em>Besoin d'aide</em> <b class="fa fa-question-circle fa-lg"></b></router-link></div>
      </div>
    </div>
  </div>

  <div class="container" v-if="this.result === 'invalid'">
    <div class="row">
      <div class="col-lg-12">
        <div class="alert alert-icon alert-danger" role="alert"> <i class="fa fa-warning"></i> Les données entrées sont invalides. Veuillez essayer à nouveau. <router-link class="clickable alert-danger" :to="{ name: 'faq'}"><em>Besoin d'aide</em> <b class="fa fa-question-circle fa-lg"></b></router-link></div>
      </div>
    </div>
  </div>

  <div class="container" v-if="this.result === 'unavailable'">
    <div class="row">
      <div class="col-lg-12">
        <div class="alert alert-icon alert-danger" role="alert"> <i class="fa fa-warning"></i> Le service Histovec n'est pas disponible pour le moment. Veuillez réessayer ultérieurement. <router-link class="clickable alert-danger" :to="{ name: 'faq'}"><em>Besoin d'aide</em> <b class="fa fa-question-circle fa-lg"></b></router-link> </div>
      </div>
    </div>
  </div>

  <div class="container" v-if="this.result === 'tooManyRequests'">
    <div class="row">
      <div class="col-lg-12">
        <div class="alert alert-icon alert-danger" role="alert"> <i class="fa fa-warning"></i> Trop de requêtes pour le moment. Veuillez attendre quelques instants puis réessayez. <router-link class="clickable alert-danger" :to="{ name: 'faq'}"><em>Besoin d'aide</em> <b class="fa fa-question-circle fa-lg"></b></router-link></div>
      </div>
    </div>
  </div>

  <div class="container" v-if="this.result === 'error'">
    <div class="row">
      <div class="col-lg-12">
        <div class="alert alert-icon alert-danger" role="alert"> <i class="fa fa-warning"></i> Erreur inconnue. Si l'erreur persiste, merci de remplir le formulaire. <router-link class="clickable alert-danger" :to="{ name: 'feedback'}"><em>Signaler une erreur</em> <b class="fa fa-exclamation-circle fa-lg"></b></router-link></div>
      </div>
    </div>
  </div>

  <div class="container" v-if="this.result === 'cancelled'">
    <div class="row">
      <div class="col-lg-12">
        <div class="alert alert-icon alert-danger" role="alert"> <i class="fa fa-warning"></i> Le certificat demandé a été annulé. <router-link class="clickable alert-danger" :to="{ name: 'faq'}"><em>Besoin d'aide</em> <b class="fa fa-question-circle fa-lg"></b></router-link></div>
      </div>
    </div>
  </div>

  <div class="container" v-if="this.result === 'invalidKey'">
    <div class="row">
      <div class="col-lg-12">
        <div class="alert alert-icon alert-danger" role="alert"> <i class="fa fa-warning"></i> Le lien transmis est incomplet : veuillez redemander le lien complet à votre vendeur. <router-link class="clickable alert-danger" :to="{ name: 'faq'}"><em>Besoin d'aide</em> <b class="fa fa-question-circle fa-lg"></b></router-link></div>
      </div>
    </div>
  </div>

  <!-- debut modal -->
  <div v-if="modalEval">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" @click="modalEval = false">
                  <span aria-hidden="true">&times;</span>
                  <span class="sr-only">Fermer</span>
                </button>
                <h6 class="modal-title">Votre évaluation</h6>
              </div>
              <form @submit="send" id="evaluation-form-with-recaptcha"  role="form">
                <div class="modal-body">
                  <span class="info_red txt-small-11" v-if="status == 'failed' && errors.length == 0">* Veuillez renseigner les champs obligatoires<br/></span>
                  <label>Comment évaluez-vous HistoVec :  <span class="info_red" title="Ce champ est requis.">*</span></label>
                  <div class="rating position_left p-g-10">
                    <template v-for="n in ratings" >
                      <a v-on:click="setNote((ratings.length+1)-n)"
                         v-on:mouseover="starOver((ratings.length+1)-n)"
                         v-on:mouseout="starOut"
                         v-bind:class="{'is-selected': ((note >= (ratings.length+1)-n) && note != null)}"
                         title="Give star"
                         v-model="note">★</a>
                    </template>
                  </div>
                  <p class="m-h-10">
                    <label>Vos commentaires ou suggestions :</label>
                    <textarea class="form-control" id="message" name="message" rows="2" v-model="message"></textarea>
                  </p>
                  <br />
                  <div class="form-group has-feedback" :class="[{'has-error' : (errors.length > 0 && status !== 'init')}]">
                    <p>
                    <label>Acceptez-vous d'être recontacté pour nous donner votre retour d'expérience ? <i>(L'adresse email ne servira que dans le cadre de cette étude)</i></label>
                    <span class="info_red txt-small-11" v-if="errors.length > 0">{{ errors[0] }}</span>
                    <input class="form-control" id="email" name="email" placeholder="name@example.com" v-model="email">
                    </p>
                  </div>
                </div>
                <div class="modal-footer">
                  <div class="row">
                    <div class="col-md-6 m-h-15 position_left">
                      <label>
                      <input type="checkbox" id="showModal" name="showModal" v-model="notShow">Ne plus afficher</label>
                    </div>
                    <div class="col-md-6">
                      <button class="btn btn-animated btn-default m-h-05">Envoyer
                        <i class="fa" :class="[{'fa-send-o' : (status === 'init')},
                                           {'fa-spin fa-spinner' : (status === 'posting')},
                                           {'fa-check' : (status === 'posted')},
                                           {'fa-exclamation-triangle' : (status === 'failed')}]"></i>
                      </button>
                      <button class="btn btn-animated btn-default" @click="modalEval = false">Fermer <i class="fa fa-close"></i></button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
  <!-- fin modal -->
</section>
</template>

<script>

import CryptoJS from 'crypto-js'
import QrcodeVue from 'qrcode.vue'
import Qr from 'qr.js'
import JsPdf from 'jspdf'

export default {
  components: {
    QrcodeVue
  },
  data () {
    return {
      tab: 'abstract',
      hidden: {
        all_tabs: false,
        pdf: false,
        date_update: false
      },
      default: 'non disponible',
      synthese: {
        'critair': {
          'text': 'Eligible vignette Crit\'Air',
          'adv': 'Consultez le site des vignettes Crit\'Air',
          'link': 'https://www.certificat-air.gouv.fr'
        },
        'fin_ove': {
          'icon': 'fa-exclamation-triangle',
          'text': 'Ce véhicule a eu un sinistre déclaré, et déclaré apte à circuler',
          'adv': 'Demandez le rapport d’expert et la(es) facture(s)',
          'link': 'https://www.service-public.fr/particuliers/vosdroits/F1473'
        },
        'ove': {
          'icon': 'fa-exclamation-triangle',
          'text': 'Ce véhicule a eu un sinistre déclaré',
          'adv': 'Une procédure de réparation contrôlée est en cours',
          'link': 'https://www.service-public.fr/particuliers/vosdroits/F1473'
        },
        'multi_ove': {
          'icon': 'fa-exclamation-triangle',
          'text': 'Ce véhicule a eu plusieurs sinistres déclarés',
          'adv': 'Vous pouvez consulter l\'historique détaillé pour plus de précisions concernant les précédents sinistres',
          'link': 'https://www.service-public.fr/particuliers/vosdroits/F1473'
        },
        'otci': {
          'icon': 'fa-exclamation-triangle',
          'text': 'Le certificat fait l\'objet d\'une opposition temporaire (non liée à un sinistre)',
          'adv': 'Ce véhicule pourra être vendu après levée de l\'opposition',
          'link': 'https://www.service-public.fr/particuliers/vosdroits/F34107'
        },
        'otci_ove': {
          'icon': 'fa-exclamation-triangle',
          'text': 'Le certificat fait l\'objet d\'une opposition temporaire',
          'adv': 'Ce véhicule pourra être vendu après levée de l\'opposition',
          'link': 'https://www.service-public.fr/particuliers/vosdroits/F34107'
        },
        'suspension': {
          'icon': 'fa-minus-circle',
          'text': 'L\'autorisation de circulation de ce véhicule a été suspendue',
          'adv': 'Une levée de suspension est nécessaire pour sa remise en circulation',
          'link': 'https://www.service-public.fr/particuliers/vosdroits/F1754'
        },
        'perte_ci': {
          'icon': 'fa-exclamation-triangle',
          'text': 'La carte grise a fait l\'objet d\'une déclaration de perte',
          'adv': 'La carte grise doit porter la mention "Duplicata" et la date'
        },
        'annulation_ci': {
          'icon': 'fa-minus-circle',
          'text': 'La carte grise a été annulée',
          'adv': 'Ce véhicule ne peut pas être vendu en l\'état'
        },
        'vehicule_vole': {
          'icon': 'fa-minus-circle',
          'text': 'Le véhicule fait l\'objet d\'un signalement pour vol et ne peut être vendu en l\'état',
          'adv': 'Le signalement doit être vérifié dans les plus brefs délais avec le commissariat le plus proche'
        },
        'ci_vole': {
          'icon': 'fa-exclamation-triangle',
          'text': 'La carte grise a fait l\'objet d\'une déclaration de vol',
          'adv': 'Demandez la déclaration de vol. La carte grise fournie doit porter la mention "Duplicata" et la date'
        },
        'saisie': {
          'icon': 'fa-minus-circle',
          'text': 'Le véhicule est saisi',
          'adv': 'Seule une mainlevée du créancier ou un juge peut permettre la vente de ce véhicule'
        },
        'gage': {
          'icon': 'fa-exclamation-triangle',
          'text': 'Le véhicule est gagé',
          'adv': 'Un véhicule gagé peut être acheté, avec transfert du gage'
        },
        'duplicata': {
          'icon': 'fa-copy',
          'text': 'La carte grise est un duplicata',
          'adv': 'La carte grise doit porter la mention "Duplicata" et la date'
        }
      },
      plaque: '',
      vin: '',
      result: 'wait',
      conf: [],
      v: {
        date_update: '25/11/2018',
        ctec: {
          reception: {},
          puissance: {},
          places: {},
          carrosserie: {},
          PT: {}
        },
        titulaire: {},
        certificat: {},
        administratif: {
          synthese: [],
          titre: {}
        }
      },
      modalEval: false,
      errors: [],
      message: '',
      email: '',
      notShow: false,
      status: 'init',
      tempValue: null,
      ratings: [1, 2, 3, 4, 5],
      disabled: false,
      note: null,
      notifSuccess: false,
      timeout: 10000,
      timerModalEval: 60000,
      timerNotifSuccess: 2000
    }
  },
  computed: {
    holder () {
      return (this.$route.params.code !== undefined) || (this.$store.state.code !== undefined)
    },
    mailBody () {
      var text = encodeURI('Un titulaire de véhicule vous transmet un rapport HistoVec\n\nRendez-vous sur le lien suivant pour le consulter: \n')
      return text + this.url.replace('&', '%26')
    },
    smsBody () {
      var text = encodeURI('Un titulaire de véhicule vous transmet un rapport HistoVec.\n\nRendez-vous sur le lien suivant pour le consulter: \n')
      return text + this.url.replace('&', '%26')
    },
    baseurl () {
      // return 'https://histovec.interieur.gouv.fr'
      return window.location.protocol + '//' + window.location.host
    },
    url () {
      return this.baseurl + '/histovec/report?id=' + (this.$store.state.code || this.$route.params.code) + '&key=' + (this.$store.state.key || this.$route.params.key)
    }
  },
  methods: {
    decrypt (key, encrypted) {
      key = CryptoJS.enc.Base64.parse(key)
      var rawData = atob(encrypted)
      let iv = CryptoJS.enc.Base64.parse(btoa(rawData.substring(0, 16)))
      encrypted = btoa(rawData.substring(16))
      var decrypted = CryptoJS.AES.decrypt({
        ciphertext: CryptoJS.enc.Base64.parse(encrypted),
        salt: ''
      },
        key, {
          iv: iv,
          padding: CryptoJS.pad.Pkcs7,
          mode: CryptoJS.mode.CBC
        })
      return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8).replace(/: (0[0-9]+)/g, ': "$1"'))
    },
    pad (n, width, z) {
      z = z || '0'
      n = n + ''
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
    },
    formatDate (isoDate) {
      let date = new Date(isoDate)
      let mm = date.getMonth() + 1 // getMonth() is zero-based
      let dd = date.getDate()

      return [(dd > 9 ? '' : '0') + dd,
        (mm > 9 ? '' : '0') + mm,
        date.getFullYear()
      ].join('/')
    },
    histoFilter (historique) {
      let h = historique.filter(event => this.operations[event.opa_type] !== undefined)
      h = this.$lodash.orderBy(h, ['opa_date'], ['desc'])
      return h.map(event => {
        return {'date': this.formatDate(event.opa_date), 'nature': this.operations[event.opa_type]}
      })
    },
    calcNbTit (historique) {
      let opTit = ['IMMAT_NORMALE', 'IMMAT_NORMALE_PREM_VO', 'CHANG_LOC', 'CHANG_LOC_CVN', 'CHANG_TIT_NORMAL', 'CHANG_TIT_NORMAL_CVN']
      let nbTit = historique.filter(event => opTit.includes(event.opa_type))
      return nbTit.length
    },
    monthDiff (d1, d2) {
      var months
      months = (d2.getFullYear() - d1.getFullYear()) * 12
      months -= d1.getMonth() + 1
      months += d2.getMonth()
      // increment months if d2 comes later in its month than d1 in its month
      if (d2.getDate() >= d1.getDate()) { months++ }
      return months <= 0 ? 0 : months
    },
    calcCertifDepuis (dateStr) {
      let nbMonth = this.monthDiff(new Date(dateStr), new Date())
      if (nbMonth <= 18) {
        return nbMonth + ' mois'
      } else {
        let year = Math.floor(nbMonth / 12)
        let month = nbMonth - 12 * year
        if ((month > 0) && (year < 10)) {
          return (year > 1) ? year + ' ans et ' + month + ' mois' : year + ' an et ' + month + ' mois'
        } else {
          return (year > 1) ? year + ' ans' : year + ' an'
        }
      }
    },
    getVehiculeTypeCarburant (carburant) {
      // Mapping Carburant
      let essence = ['ES', 'EH', 'ET', 'FE', 'FH']
      let diesel = ['GO', 'GA', 'GE', 'GF', 'GG', 'GH', 'PL', 'GQ']
      let electHydro = ['AC', 'EL', 'H2', 'HE', 'HH']
      let gaz = ['EG', 'EN', 'EP', 'EQ', 'FG', 'FN', 'G2', 'GN', 'GP', 'GZ', 'NH', 'PH']
      let hybrideRech = ['EE', 'EM', 'ER', 'FL', 'GL', 'GM', 'NE', 'PE']
      let typeCarburant = ''
      if (essence.includes(carburant)) {
        typeCarburant = 'essence'
      } else if (diesel.includes(carburant)) {
        typeCarburant = 'diesel'
      } else if (electHydro.includes(carburant)) {
        typeCarburant = 'electrique'
      } else if (gaz.includes(carburant)) {
        typeCarburant = 'gaz'
      } else if (hybrideRech.includes(carburant)) {
        typeCarburant = 'hybride'
      }
      return typeCarburant
    },
    getVehiculeLogo (genre) {
      let moto = ['MTL', 'MTT1', 'MTT2', 'MTTE', 'CL']
      let truck = ['CAM', 'Deriv-VP', 'TRA', 'TRR', 'TCP']
      let type = 'car'
      if (moto.includes(genre)) {
        type = 'motorcycle'
      } else if (truck.includes(genre)) {
        type = 'truck'
      }
      return type
    },
    getVignetteNumero (genre, typeCarburant, pollution, dateImmat) {
      let splitDate = dateImmat.split('/')
      let dateImmatEn = new Date(splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0])

      // Mapping Genre
      let motocycle = ['MTL', 'MTT1', 'MTT2', 'MTTE', 'TM', 'QM', 'TQM']
      let cyclomoteur = ['CYCL', 'CL']
      let voiture = ['VP']
      let vehiculeUtilLeger = ['CTTE', 'Deriv-VP', 'VTSU']
      let poidsLourdsCarBus = ['CAM', 'TRA', 'TRR', 'TCP', 'VASP', 'SREM']

      // Mapping Norme Euro
      let normeEuro = (pollution) ? pollution.split('EURO') : ''
      let numeroEuro = (normeEuro !== '' && normeEuro[1] !== undefined) ? normeEuro[1] : ''
      let vignette = ''

      if (typeCarburant === 'gaz' || typeCarburant === 'hybride') {
        vignette = 1
      } else if (typeCarburant === 'electrique') {
        vignette = 'electrique'
      } else {
        if (motocycle.includes(genre) || cyclomoteur.includes(genre)) {
          if (numeroEuro === '4' || (numeroEuro === '' && motocycle.includes(genre) && dateImmatEn >= new Date('2017-01-01')) || (numeroEuro === '' && cyclomoteur.includes(genre) && dateImmatEn >= new Date('2018-01-01'))) {
            vignette = 1
          } else if (numeroEuro === '3' || (numeroEuro === '' && motocycle.includes(genre) && (dateImmatEn >= new Date('2007-01-01') && dateImmatEn <= new Date('2016-12-31'))) || (numeroEuro === '' && cyclomoteur.includes(genre) && (dateImmatEn >= new Date('2007-01-01') && dateImmatEn <= new Date('2017-12-31')))) {
            vignette = 2
          } else if (numeroEuro === '2' || (numeroEuro === '' && dateImmatEn >= new Date('2004-07-01') && dateImmatEn <= new Date('2006-12-31'))) {
            vignette = 3
          } else if (dateImmatEn >= new Date('2000-06-01') && dateImmatEn <= new Date('2004-06-30')) {
            vignette = 4
          }
        } else if (voiture.includes(genre)) {
          if (typeCarburant === 'essence') {
            if (numeroEuro === '5' || numeroEuro === '6' || (numeroEuro === '' && dateImmatEn >= new Date('2011-01-01'))) {
              vignette = 1
            } else if (numeroEuro === '4' || (numeroEuro === '' && dateImmatEn >= new Date('2006-01-01') && dateImmatEn <= new Date('2010-12-31'))) {
              vignette = 2
            } else if (numeroEuro === '2' || numeroEuro === '3' || (numeroEuro === '' && dateImmatEn >= new Date('1997-01-01') && dateImmatEn <= new Date('2005-12-31'))) {
              vignette = 3
            }
          } else if (typeCarburant === 'diesel') {
            if (numeroEuro === '5' || numeroEuro === '6' || (numeroEuro === '' && dateImmatEn >= new Date('2011-01-01'))) {
              vignette = 2
            } else if (numeroEuro === '4' || (numeroEuro === '' && dateImmatEn >= new Date('2006-01-01') && dateImmatEn <= new Date('2010-12-31'))) {
              vignette = 3
            } else if (numeroEuro === '3' || (numeroEuro === '' && dateImmatEn >= new Date('2001-01-01') && dateImmatEn <= new Date('2005-12-31'))) {
              vignette = 4
            } else if (numeroEuro === '2' || (numeroEuro === '' && dateImmatEn >= new Date('1997-01-01') && dateImmatEn <= new Date('2000-12-31'))) {
              vignette = 5
            }
          }
        } else if (vehiculeUtilLeger.includes(genre)) {
          if (typeCarburant === 'essence') {
            if (numeroEuro === '5' || numeroEuro === '6' || (numeroEuro === '' && dateImmatEn >= new Date('2011-01-01'))) {
              vignette = 1
            } else if (numeroEuro === '4' || (numeroEuro === '' && dateImmatEn >= new Date('2006-01-01') && dateImmatEn <= new Date('2010-12-31'))) {
              vignette = 2
            } else if (numeroEuro === '2' || numeroEuro === '3' || (numeroEuro === '' && dateImmatEn >= new Date('1997-01-01') && dateImmatEn <= new Date('2005-12-31'))) {
              vignette = 3
            }
          } else if (typeCarburant === 'diesel') {
            if (numeroEuro === '5' || numeroEuro === '6' || (numeroEuro === '' && dateImmatEn >= new Date('2011-01-01'))) {
              vignette = 2
            } else if (numeroEuro === '4' || (numeroEuro === '' && dateImmatEn >= new Date('2006-01-01') && dateImmatEn <= new Date('2010-12-31'))) {
              vignette = 3
            } else if (numeroEuro === '3' || (numeroEuro === '' && dateImmatEn >= new Date('2001-01-01') && dateImmatEn <= new Date('2005-12-31'))) {
              vignette = 4
            } else if (numeroEuro === '2' || (numeroEuro === '' && dateImmatEn >= new Date('1997-01-01') && dateImmatEn <= new Date('2000-12-31'))) {
              vignette = 5
            }
          }
        } else if (poidsLourdsCarBus.includes(genre)) {
          if (typeCarburant === 'essence') {
            if (numeroEuro === '6' || (numeroEuro === '' && dateImmatEn >= new Date('2014-01-01'))) {
              vignette = 1
            } else if (numeroEuro === '5' || (numeroEuro === '' && dateImmatEn >= new Date('2009-10-01') && dateImmatEn <= new Date('2013-12-31'))) {
              vignette = 2
            } else if (numeroEuro === '3' || numeroEuro === '4' || (numeroEuro === '' && dateImmatEn >= new Date('2001-10-01') && dateImmatEn <= new Date('2009-09-30'))) {
              vignette = 3
            }
          } else if (typeCarburant === 'diesel') {
            if (numeroEuro === '6' || (numeroEuro === '' && dateImmatEn >= new Date('2014-01-01'))) {
              vignette = 2
            } else if (numeroEuro === '5' || (numeroEuro === '' && dateImmatEn >= new Date('2009-10-01') && dateImmatEn <= new Date('2013-12-31'))) {
              vignette = 3
            } else if (numeroEuro === '4' || (numeroEuro === '' && dateImmatEn >= new Date('2006-10-01') && dateImmatEn <= new Date('2009-09-30'))) {
              vignette = 4
            } else if (numeroEuro === '3' || (numeroEuro === '' && dateImmatEn >= new Date('2001-10-01') && dateImmatEn <= new Date('2006-09-30'))) {
              vignette = 5
            }
          }
        }
      }
      return vignette
    },
    generatePDF () {
      let img = new Image()
      var pdf = new JsPdf()
      let self = this
      img.src = 'assets/images/logo_mi_header.png'
      img.onload = function () {
        console.log(img)

        // header with QR code

        let qrcode = Qr(self.url)
        let cells = qrcode.modules

        cells.forEach(function (row, rdx) {
          row.forEach(function (cell, cdx) {
            // console.log(cell, rdx, cdx)
            if (cell === true) {
              pdf.rect(170 + cdx * 0.4, 10 + rdx * 0.4, 0.4, 0.4, 'F')
            }
          })
        })

        pdf.setFont('helvetica')
        pdf.setFontSize(5)
        pdf.text(169, 35, self.baseurl, null, 90)

        pdf.addImage(img, 'PNG', 82, 10, 46, 24)
        pdf.setFontType('bold')
        pdf.setFontSize(20)
        let offset = 20
        pdf.text(105, offset + 30, 'Certificat de situation administrative détaillé', null, null, 'center')
        pdf.setFontType('normal')
        pdf.setFontSize(10)
        pdf.text(105, offset + 35, '(Article R.322-4 du code de la route)', null, null, 'center')

        // identification du véhicule
        pdf.setFontType('bold')
        pdf.setFontSize(12)
        pdf.text(15, offset + 47, 'Identification du véhicule')
        pdf.setFontType('normal')
        pdf.setFontSize(10)
        pdf.text(20, offset + 54, 'Numéro d\'immatriculation du véhicule :')
        pdf.text(100, offset + 54, self.$store.state.plaque)
        pdf.text(20, offset + 61, 'Numéro VIN du véhicule (ou numéro de série) :')
        pdf.text(100, offset + 61, self.v.ctec.vin)
        pdf.text(20, offset + 68, 'Marque :')
        pdf.text(100, offset + 68, self.v.ctec.marque)

        // situation administrative
        pdf.setFontType('bold')
        pdf.setFontSize(12)
        pdf.text(15, offset + 80, 'Situation administrative du véhicule')
        pdf.setFontType('normal')
        pdf.setFontSize(10)
        pdf.setFontType('bold')
        pdf.text(20, offset + 87, '- Opposition au transfert du certificat d\'immatriculation (OTCI)')
        pdf.setFontType('normal')
        pdf.text(25, offset + 92, self.v.administratif.otci)
        pdf.setFontType('bold')
        pdf.text(20, offset + 99, '- Procédure de réparation contrôlée')
        pdf.setFontType('normal')
        pdf.text(25, offset + 104, self.v.administratif.ove)
        pdf.setFontType('bold')
        pdf.text(20, offset + 111, '- Déclaration valant saisie')
        pdf.setFontType('normal')
        pdf.text(25, offset + 116, self.v.administratif.saisie === 'NON' ? 'Non' : 'Oui')
        pdf.setFontType('bold')
        pdf.text(20, offset + 123, '- Gage')
        pdf.setFontType('normal')
        pdf.text(25, offset + 128, self.v.administratif.gage === 'NON' ? 'Non' : 'Oui')

        // autres elements de situation
        pdf.setFontType('bold')
        pdf.text(20, offset + 140, '- Immatriculation suspendue')
        pdf.setFontType('normal')
        pdf.text(25, offset + 145, self.v.administratif.suspension)
        pdf.setFontType('bold')
        pdf.text(20, offset + 152, '- Immatriculation annulée')
        pdf.setFontType('normal')
        pdf.text(25, offset + 157, self.v.administratif.annulation)
        pdf.setFontType('bold')
        pdf.text(20, offset + 164, '- Véhicule volé')
        pdf.setFontType('normal')
        pdf.text(25, offset + 169, self.v.administratif.vol === 'NON' ? 'Non' : 'Oui')
        pdf.setFontType('bold')
        pdf.text(20, offset + 176, '- Certificat d\'immatriculation volé')
        pdf.setFontType('normal')
        pdf.text(25, offset + 181, self.v.administratif.titre.vol === 'NON' ? 'Non' : 'Oui')
        pdf.setFontType('bold')
        pdf.text(20, offset + 187, '- Certificat d\'immatriculation perdu')
        pdf.setFontType('normal')
        pdf.text(25, offset + 192, self.v.administratif.titre.perte === 'NON' ? 'Non' : 'Oui')

        pdf.setFontType('bold')
        pdf.setFontSize(12)
        pdf.text(15, offset + 204, 'Historique du véhicule')
        pdf.setFontType('normal')
        pdf.setFontSize(10)
        self.v.historique.forEach(function (o) {
          pdf.text(20, offset + 211, o.date)
          pdf.text(40, offset + 211, o.nature)
          offset = offset + 5
        })

        pdf.setFontType('bold')
        pdf.setFontSize(12)
        pdf.text(15, offset + 223, 'Certificat attestant la situation administrative au :')
        pdf.setFontSize(10)
        pdf.setFontType('normal')
        var date = new Date()
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        pdf.text(20, offset + 230, date.toLocaleDateString('fr-FR', options) + ' à ' + self.pad(date.getHours(), 2) + 'h' + self.pad(date.getMinutes(), 2))

        pdf.setFontType('italic')
        pdf.setFontSize(8)
        pdf.text(15, offset + 242, 'Le QR code en haut de ce certificat, et référant au site ' + self.baseurl + ' permet vous assurer de la conformité des informations')
        pdf.text(15, offset + 247, 'retranscrites. Ce code sera disponible jusqu\'au changement de titulaire et au plus tard jusqu\'à la fin du mois suivant l\'édition de ce certificat.')
        pdf.text(15, offset + 252, 'La valeur du certificat de situation administrative détaillé ne saurait excéder 15 jours.')

        pdf.save('rapport.pdf')
      }
    },
    send (e) {
      this.status = 'posting'
      if (this.note || this.notShow) {
        let data = {'message': this.message, 'email': this.email, 'note': this.note, 'date': new Date().toUTCString()}
        if (!this.note && this.notShow) {
          this.$cookie.set('evaluation', true, 1)
          this.status = 'posted'
          this.modalEval = false
        } else {
          if (this.email && !this.isEmailValid()) {
            this.errors.push('L\'adresse email n\'est pas valide')
            this.status = 'failed'
          } else {
            this.$http.post(this.apiUrl + 'feedback/', data)
            .then(response => {
              this.status = 'posted'
              this.modalEval = false
              this.$cookie.set('evaluation', true, 1)
            }, () => {
              this.status = 'failed'
            }
            )
          }
        }
      } else {
        this.status = 'failed'
      }
      e.preventDefault()
    },
    isEmailValid () {
      let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return reg.test(this.email)
    },
    setNote (value) {
      if (!this.disabled) {
        this.tempValue = value
        this.note = value
      }
    },
    starOver (value) {
      if (!this.disabled) {
        this.tempValue = this.note
        this.note = value
      }
    },
    starOut () {
      if (!this.disabled) {
        this.note = this.tempValue
      }
    },
    showNotifSuccess () {
      this.notifSuccess = true
      setTimeout(() => {
        this.notifSuccess = false
      }, this.timerNotifSuccess)
    },
    showModalEval () {
      if (this.$cookie.get('evaluation') === 'false' || this.$cookie.get('evaluation') === null) {
        setTimeout(() => {
          this.modalEval = true
          this.$http.put(this.apiUrl + 'log/feedback').then(response => {}, () => {})
        }, this.timerModalEval)
      }
    }
  },
  created () {
    setTimeout(() => {
      if (this.result === 'wait') {
        this.result = 'error'
      }
      this.$http.put(this.apiUrl + 'log/' + this.$route.path.replace(/^\/\w+\//, '') + '/' + this.result).then(response => {}, () => {})
    }, this.timeout)

    this.$http.put(this.apiUrl + 'log/' + this.$route.path.replace(/^\/\w+\//, '') + '/' + (this.holder ? 'holder' : 'buyer')).then(response => {}, () => {})
    if (this.$store.state.v) {
      this.v = this.$store.state.v
      this.showModalEval()
      this.result = 'cached'
      this.$http.put(this.apiUrl + 'log/' + this.$route.path.replace(/^\/\w+\//, '') + '/' + this.result).then(response => {}, () => {})
    } else {
      if (!this.holder && this.$route.query.key === undefined && this.$route.query.id !== undefined) {
        // Cas des liens acheteur sans KEY
        this.result = 'invalidKey'
        this.$http.put(this.apiUrl + 'log/' + this.$route.path.replace(/^\/\w+\//, '') + '/' + this.result).then(response => {}, () => {})
        return
      }
      if ((this.holder ? this.$route.params.id : this.$route.query.id) === undefined) {
        this.result = 'invalid'
        this.$http.put(this.apiUrl + 'log/' + this.$route.path.replace(/^\/\w+\//, '') + '/' + this.result).then(response => {}, () => {})
      } else {
        this.$http.get(this.apiUrl + 'id/' + (this.holder ? this.$route.params.id : this.$route.query.id))
          .then(response => {
            console.log(response)
            if (response.body.hits.hits.length === 0) {
              this.result = 'notFound'
              this.$http.put(this.apiUrl + 'log/' + this.$route.path.replace(/^\/\w+\//, '') + '/' + this.result).then(response => {}, () => {})
              return
            }
            this.showModalEval()
            var encrypted = response.body.hits.hits[0]._source.v.replace(/-/g, '+').replace(/_/g, '/')
            var key = ((this.$route.params.key !== undefined) ? this.$route.params.key : this.$route.query.key).replace(/-/g, '+').replace(/_/g, '/')
            try {
              var veh = this.decrypt(key, encrypted)
            } catch (err) {
              console.log(err)
              this.result = 'error'
              this.$http.put(this.apiUrl + 'log/' + this.$route.path.replace(/^\/\w+\//, '') + '/' + this.result).then(response => {}, () => {})
              return
            }
            console.log(veh)

            if (veh.annulation_ci !== 'NON') {
              this.result = 'cancelled'
              this.$http.put(this.apiUrl + 'log/' + this.$route.path.replace(/^\/\w+\//, '') + '/' + this.result).then(response => {}, () => {})
              return
            } else {
              this.result = 'error'
            }
            try {
              // filtre l'historique des opérations annulées
              veh.historique = (veh.historique === undefined) ? [] : veh.historique.filter(event => event.ope_date_annul === undefined)
              // réordonne l'historique des opérations
              veh.historique = this.$lodash.orderBy(veh.historique, ['opa_date'])
              this.v.date_update = veh.date_update || this.v.date_update
              this.vin = veh.vin
              this.v.ctec.vin = veh.vin
              this.plaque = veh.plaq_immat
              this.v.plaque = veh.plaq_immat
              this.v.ctec.couleur = veh.couleur || this.default
              this.v.ctec.cnit = veh.num_cnit
              this.v.ctec.tvv = veh.tvv
              this.v.ctec.reception.type = veh.type_reception
              this.v.ctec.reception.numero = veh.cveh_num_reception
              this.v.ctec.puissance.cylindres = veh.CTEC_CYLINDREE
              this.v.ctec.puissance.nette = veh.CTEC_PUISS_NETTE
              this.v.ctec.puissance.cv = veh.CTEC_PUISS_CV
              this.v.ctec.puissance.norm = veh.CTEC_RAPPORT_PUIS_MASSE
              this.v.ctec.places.assis = veh.CTEC_PLACES_ASSISES
              this.v.ctec.places.debout = veh.CTEC_PLACES_DEBOUT
              this.v.ctec.db = veh.CTEC_NIVEAU_SONORE
              this.v.ctec.co2 = veh.CTEC_CO2
              this.v.ctec.moteur = veh.CTEC_VITESSE_MOTEUR
              this.v.ctec.marque = veh.marque
              this.v.ctec.modele = veh.nom_commercial
              this.v.ctec.genre = veh.CTEC_RLIB_GENRE
              this.v.ctec.categorie = veh.CTEC_RLIB_CATEGORIE
              this.v.ctec.carrosserie.national = veh.CTEC_RLIB_CARROSSERIE_NAT
              this.v.ctec.carrosserie.ce = veh.CTEC_RLIB_CARROSSERIE_CE
              this.v.ctec.environnement = veh.CTEC_RLIB_POLLUTION
              this.v.ctec.energie = veh.CTEC_RLIB_ENERGIE
              this.v.ctec.PT.admissible = veh.pt_tech_adm_f1
              this.v.ctec.PT.AC = veh.ptac_f2
              this.v.ctec.PT.RA = veh.ptra_f3
              this.v.ctec.PT.service = veh.pt_service_g
              this.v.ctec.PT.AV = veh.ptav_g1
              this.v.titulaire.identite = [veh.pers_raison_soc_tit, veh.pers_siren_tit, veh.pers_nom_naissance_tit, veh.pers_prenom_tit].join(' ')
              this.v.titulaire.adresse = this.pad(veh.adr_code_postal_tit, 5)
              this.v.certificat.premier = veh.date_premiere_immat || this.default
              this.v.certificat.etranger = (veh.historique !== undefined) ? veh.historique.some(e => e.opa_type === 'IMMAT_NORMALE_PREM_VO') : undefined
              this.v.certificat.siv = veh.date_premiere_immat_siv || this.default
              this.v.certificat.fr = (this.v.certificat.etranger && (veh.historique !== undefined)) ? this.formatDate(veh.historique[0].opa_date) : this.v.certificat.premier
              this.v.fni = ((veh.dos_date_conversion_siv !== undefined) && (veh.historique !== undefined)) ? ((veh.historique[0].opa_type === 'IMMAT_NORMALE') ? 'ok' : 'ko') : false
              this.v.certificat.courant = veh.date_emission_CI || this.default
              this.v.certificat.depuis = this.calcCertifDepuis(this.$lodash.orderBy(veh.historique.filter(e => (e.opa_type === 'IMMAT_NORMALE' || e.opa_type === 'IMMAT_NORMALE_PREM_VO' || e.opa_type === 'CHANG_TIT_NORMAL' || e.opa_type === 'CHANG_TIT_NORMAL_CVN')), ['opa_date'], ['desc'])[0].opa_date)

              if ((this.v.certificat.fr !== this.v.certificat.siv) && ((veh.historique === undefined) || (!veh.historique.some(e => e.opa_type.match(/(CONVERSION_DOSSIER_FNI|.*_CVN)/))))) {
                let tmp = veh.historique
                tmp.push({opa_date: this.v.certificat.siv.replace(/^(..)\/(..)\/(....)$/, '$3-$2-$1'), opa_type: 'CONVERSION_DOSSIER_FNI'})
                this.v.historique = (veh.historique !== undefined) ? this.histoFilter(tmp) : []
              } else {
                this.v.historique = (veh.historique !== undefined) ? this.histoFilter(veh.historique) : []
              }
              this.v.nb_proprietaires = veh.nb_proprietaire
              this.v.nb_tit = (veh.historique !== undefined) ? this.calcNbTit(veh.historique) : undefined
              this.v.age_veh = veh.age_annee
              this.v.logo_vehicule = this.getVehiculeLogo(veh.CTEC_RLIB_GENRE)
              this.v.vignette_numero = this.getVignetteNumero(veh.CTEC_RLIB_GENRE, this.getVehiculeTypeCarburant(veh.CTEC_RLIB_ENERGIE), veh.CTEC_RLIB_POLLUTION, veh.date_premiere_immat)

              this.v.administratif.gages = veh.gage || this.default
              this.v.administratif.suspension = (veh.suspension === 'NON') ? 'Non' : 'Oui'
              this.v.administratif.annulation = (veh.annulation_ci === 'NON') ? 'Non' : 'Oui'
              this.v.administratif.suspensions = (veh.suspension === 'NON') ? ((veh.suspension === 'NON') ? 'NON' : 'certificat annulé') : ((veh.annulation_ci === 'NON') ? 'certificat suspendu' : 'certificat suspendu et annulé') // mapping à valider
              // opposition et procédure à valider
              this.v.administratif.otci = (veh.otci === 'NON') ? 'Aucune' : ((veh.otci_pv === 'OUI') ? 'opposition temporaire (PV en attente)' : 'opposition temporaire')
              this.v.administratif.ove = (veh.ove === 'NON') ? 'Aucune' : 'Oui'
              this.v.administratif.oppositions = (veh.ove === 'NON') ? ((veh.otci === 'NON') ? 'NON' : (veh.otci_pv === 'OUI') ? 'Opposition temporaire (PV en attente)' : 'opposition temporaire') : ((veh.otci === 'NON') ? 'procédure de réparation contrôlée' : 'opposition temporaire, véhicule endommagé') // mapping à valider
              this.v.administratif.pv = (veh.otci_pv === 'OUI')
              // pour l'instant aucun véhicule saisi dans les échantillons
              this.v.administratif.saisie = (veh.saisie === 'NON') ? 'Aucune' : 'Oui'
              this.v.administratif.gage = (veh.gage === 'NON') ? 'Aucun' : 'Oui'
              this.v.administratif.procedures = (veh.saisie === 'NON') ? ((veh.gage === 'NON') ? 'NON' : 'véhicule gagé') : ((veh.annulation_ci === 'NON') ? 'véhicule saisi' : 'véhicule gagé et saisi') // mapping à valider
              this.v.administratif.vol = veh.vehicule_vole || this.default

              // vol : les informations viennent-elles de foves ?
              this.v.administratif.titre.vol = veh.ci_vole || this.default
              this.v.administratif.titre.perte = veh.perte_ci || this.default
              this.v.administratif.titre.duplicata = (veh.perte_ci === 'OUI') ? 'OUI' : veh.duplicata

              this.v.administratif.synthese = [ 'saisie', 'vehicule_vole', 'gage', 'suspension', 'perte_ci', 'ci_vole', 'annulation_ci', 'duplicata' ].filter(e => veh[e] === 'OUI')
              if (veh['otci'] === 'OUI') {
                this.v.administratif.synthese.push(veh['ove'] === 'OUI' ? 'otci_ove' : 'otci')
              }
              this.v.etranger = (veh.import === 'NON') ? (this.v.certificat.etranger ? 'OUI' : 'NON') : [veh.import, veh.imp_imp_immat, veh.pays_import]
              // ci-dessous : interprétation à confirmer
              this.v.sinistres = (veh.historique !== undefined) ? (this.$lodash.orderBy(veh.historique.filter(e => (e.opa_type === 'INSCRIRE_OVE') || (e.opa_type === 'DEC_VE')), ['opa_date'], ['desc']).map(e => e.opa_date.replace(/-.*/, ''))) : []
              this.v.sinistres_nb = (veh.historique !== undefined) ? (this.$lodash.orderBy(veh.historique.filter(e => (e.opa_type === 'INSCRIRE_OVE') || (e.opa_type === 'DEC_VE')), ['opa_date'], ['desc']).map(e => ((e.opa_type === 'INSCRIRE_OVE') ? 10 : 1))) : []
              this.v.sinistres_nb = this.v.sinistres_nb.length === 0 ? 0 : this.v.sinistres_nb.reduce((a, b) => a + b)
              this.v.sinistres_nb = Math.max(this.v.sinistres_nb % 10, ((this.v.sinistres_nb - (this.v.sinistres_nb % 10)) / 10))
              console.log(this.v.sinistres_nb)
              this.v.sinistre = this.v.sinistres[0]
              this.v.aptes = (veh.historique !== undefined) ? (this.$lodash.orderBy(veh.historique.filter(e => (e.opa_type === 'LEVER_OVE') || (e.opa_type === 'SEC_RAP_VE')), ['opa_date'], ['desc']).map(e => e.opa_date.replace(/-.*/, ''))) : []
              this.v.apte = (veh.historique !== undefined) ? ((this.v.aptes[0] > this.v.sinistres[0]) || ((veh.suspension === 'NON') && (veh.ove === 'NON'))) : undefined
              this.result = 'ok'
              console.log(this.v)
              this.$store.commit('updateV', this.v)
              this.$store.commit('updateCode', this.$route.params.code)
              this.$store.commit('updateKey', this.$route.params.key)
              this.$store.commit('updateId', this.$route.params.id)
            } catch (err) {
              console.log(err)
            }
            this.$http.put(this.apiUrl + 'log/' + this.$route.path.replace(/^\/\w+\//, '') + '/' + this.result).then(response => {}, () => {})
          }, (error) => {
            this.result = 'error'
            if (error.status === 404) {
              this.result = 'invalid'
            }
            if (error.status === 429) {
              this.result = 'tooManyRequests'
            }
            if (error.status === 502) {
              this.result = 'unavailable'
            }
            this.$http.put(this.apiUrl + 'log/' + this.$route.path.replace(/^\/\w+\//, '') + '/' + this.result).then(response => {}, () => {})
          }
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
