<template>
    <main role="main">
      <!-- section start -->
<div class="banner banner-big-height padding-bottom-clear" style="background-image:url('assets/images/accueil_4.jpg'); background-size: 1200px; background-position: 50% -100px;">
  <div class="container">
    <div class="row justify-content-lg-center">
      <div class="col-lg-12 text-center pv-20 pvm0">
        <h1 class="title color-white">Jouez la transparence</h1>
        <p class="text-center color-white txt-small-20">En partageant l'historique du véhicule</p>
      </div>
    </div>
  </div>
</div>
<!-- section end -->

      <!-- section start -->
      <section class="light-gray-bg pv-20 clearfix">
        <div class="container">
          <div class="row">
            <div class="col-lg-6" >
              <div class="pv-20 ph-20 feature-box bordered_spec shadow_spec text-center">
                <!-- debut bouton vendeur -->
                <router-link class="btn radius-30 btn-default btn-animated btn-lg" :to="{ name: 'search', params: {t: 'particulier'}}">Vendeur <i class="fa fa-handshake-o"></i></router-link>
                <!-- fin bouton vendeur -->
                <div class="separator clearfix"></div>
                <p>Rassurez vos acheteurs potentiels.</p>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="pv-20 ph-20 feature-box bordered_spec shadow_spec text-center ">
                <!-- debut bouton acheteur -->
                <router-link class="btn radius-30 btn-warning btn-animated btn-lg" :to="{ name: 'buyer' }">Acheteur <i class="fa fa-users"></i></router-link>
                <!-- fin bouton acheteur -->
                <div class="separator clearfix"></div>
                <p>Achetez en confiance : demandez au vendeur le rapport.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- section end -->
      <!-- section start -->
      <div class="row">
        <div class="col-lg-12 text-center">
          <h1 class="title large">Comment ça <span class="text-defaut">marche</span> </h1>
          <div class="separator"></div>
        </div>
        <div class="col-md-4 ">
          <div class="pv-20 ph-20 feature-box-2 light-gray-bg boxed shadow object-non-visible animated object-visible"> <span class="icon without-bg"><i class="fa fa-drivers-license-o"></i></span>
            <div class="body">
              <h4 class="title m-g-10"><span class="text-defaut-g">1</span> - Identifiez-vous</h4>
              <p class="m-g-10">Le vendeur renseigne son identité et les informations d’identification du véhicule.</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 ">
          <div class="pv-20 ph-20 feature-box-2 light-gray-bg boxed shadow object-non-visible animated object-visible"> <span class="icon without-bg"><i class="fa fa-search"></i></span>
            <div class="body">
              <h4 class="title m-g-10"><span class="text-defaut-g">2</span> - Générez le rapport...</h4>
              <p class="m-g-10">Le vendeur consulte son rapport HistoVec et partage le lien à l'acheteur.</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 ">
          <div class="pv-20 ph-20 feature-box-2 light-gray-bg boxed shadow object-non-visible animated object-visible"> <span class="icon without-bg"><i class="fa fa-share"></i></span>
            <div class="body">
              <h4 class="title m-g-10"><span class="text-defaut-g">3</span> - Partagez-le !</h4>
              <p class="m-g-10">L’acheteur consulte le rapport HistoVec sur le site officiel de l’administration.</p>
            </div>
          </div>
        </div>
      </div>
      <!-- section end -->
      <!-- section start -->
      <div class="dark-bg default-hovered footer-top animated-text">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="call-to-action text-center">
                <div class="row">
                  <div class="col-sm-8">
                    <h2>Consulter un exemple de rapport...</h2>
                    <h6><img src="assets/images/exemple_rapport.png" width="1044" height="113" alt="type véhicule, puissance fiscale, propriétaire actuel, depuis quelle année, nombre de propriétaires"> </h6>
                  </div>
                  <div class="col-sm-4">
                    <p class="mt-10"><button @click="modal = true" class="btn btn-animated btn-lg btn-gray">Voir un exemple<i class="fa fa-file-text-o pl-20"></i></button></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- section end -->
      <!-- section start -->
      <section class="light-gray-bg pv-30 clearfix">
        <div class="container">
          <div class="row justify-content-md-center">
            <div class="col-lg-12">
              <h2 class="text-center">Nos <strong>garanties !</strong></h2>
              <div class="separator"></div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-4">
              <div class="pv-30 ph-20 feature-box bordered shadow text-center object-non-visible animated object-visible fadeInDownSmall" data-animation-effect="fadeInDownSmall" data-effect-delay="100"> <span class="icon default-bg circle"><i class="fa fa-thumbs-o-up"></i></span>
                <h3>Officiel</h3>
                <div class="separator clearfix"></div>
                <p>Données officielles du <span class="text-defaut text-defaut-i-g">Ministère de l’Intérieur</span> issues du <a target="_blank" title="Système d'Immatriculation des Véhicules" href="https://immatriculation.ants.gouv.fr/Tout-savoir-sur-le-SIV/Le-Systeme-d-Immatriculation-des-Vehicules-SIV">SIV</a></p>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="pv-30 ph-20 feature-box bordered shadow text-center object-non-visible animated object-visible fadeInDownSmall" data-animation-effect="fadeInDownSmall" data-effect-delay="150"> <span class="icon default-bg circle"><i class="fa fa-lock"></i></span>
                <h3>Confidentiel</h3>
                <div class="separator clearfix"></div>
                <p>Seul le <span class="text-defaut text-defaut-i-g">propriétaire</span> peut partager ses informations avec un acheteur potentiel.</p>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="pv-30 ph-20 feature-box bordered shadow text-center object-non-visible animated object-visible fadeInDownSmall" data-animation-effect="fadeInDownSmall" data-effect-delay="200"> <span class="icon default-bg circle"><i class="fa fa-euro"></i></span>
                <h3>Gratuit</h3>
                <div class="separator clearfix"></div>
                <p>Un service public <span class="text-defaut text-defaut-i-g">gratuit</span> pour les propriétaires et les acheteurs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- section end -->
      <div class="container">
  <div class="row justify-content-lg-center">
    <div class="col-lg-12">
      <h2 class="text-center mt-4">L’administration</span> agit pour la sécurité routière</h2>
      <p class="large text-center">Ce site est mis en oeuvre par le ministère de l’intérieur dans le cadre de la mesure 16 décidée par le Gouvernement en janvier 2018 afin de mieux protéger les acheteurs de véhicules d’occasion (cf. <a href="https://www.gouvernement.fr/sites/default/files/document/document/2018/01/dossier_de_presse_-_comite_interministeriel_de_la_securite_routiere_-_mardi_9_janvier_2018.pdf" target="_blank">dossier de presse</a>) </p>
    </div>
  </div>
</div>

      <!-- section start -->
      <section class="dark-translucent-bg fixed-bg" style="background-image:url(assets/images/clavier.jpg);">
        <div class="container">
          <div class="row justify-content-lg-center">
            <div class="col-lg-12">
           <h2 class="text-center pv-10">Les <strong>usagers</strong> en parlent</h2>
              <div class="separator"></div>
                <div class="testimonial text-center">
                  <h3><transition name="slide-fade"><span v-if="verbatim"> {{ verbatims[i].name }}</span></transition></h3>
                  <div class="testimonial-body">
                      <p><transition name="slide-fade"><span v-if="verbatim"><blockquote> {{ verbatims[i].comment }} </blockquote></span></transition></p>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </section>
      <!-- section end -->
      <br>
      <!-- section start -->
      <section class="light-gray-bg pv-20 clearfix">
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <div class="pv-20 ph-20 feature-box bordered_spec shadow_spec text-center ">
                <!-- debut bouton vendeur -->
                <router-link class="btn radius-30 btn-default btn-animated btn-lg" :to="{ name: 'search', params: {t: 'particulier'}}">Vendeur <i class="fa fa-handshake-o"></i></router-link>
                <!-- fin bouton vendeur -->
                <div class="separator clearfix"></div>
                <p>Rassurez vos acheteurs potentiels.</p>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="pv-20 ph-20 feature-box bordered_spec shadow_spec text-center ">
                <!-- debut bouton acheteur -->
                <router-link class="btn radius-30 btn-warning btn-animated btn-lg" :to="{ name: 'buyer' }">Acheteur <i class="fa fa-users"></i></router-link>
                <!-- fin bouton acheteur -->
                <div class="separator clearfix"></div>
                <p>Achetez en confiance : demandez au vendeur le rapport.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- section end --><!-- #BeginLibraryItem "/Library/footer.lbi" --><!-- footer start -->
      <!-- debut modal -->
      <div v-if="modal">
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-dialog modal-lg">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" @click="modal = false"><span aria-hidden="true">&times;</span><span class="sr-only">Fermer</span></button>
                    <h6 class="modal-title">Exemple de rapport</h6>
                  </div>
                  <div class="modal-body" style="height: 350px; overflow-y: auto;"> <img src="assets/images/exemple_rapport_g.png" class="img-responsive" style="margin: 0 auto;"> </div>
                  <div class="modal-footer"> <a href="#" class="btn radius-30 btn btn-animated btn-default" @click="modal = false">Fermer <i class="fa fa-close"></i></a> </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <!-- fin modal -->
    </main>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      modal: false,
      i: 0,
      verbatim: true
    }
  },
  created () {
    this.$http.put(this.apiUrl + 'log/' + this.$route.path.replace(/^\/\w+\//, '')).then(response => {}, () => {})
    setInterval(() => {
      this.verbatim = false
      this.i = (this.i + 1) % this.verbatims.length
      setTimeout(() => {
        this.verbatim = true
      }, 800)
    }, 5000)
  }
}
</script>
