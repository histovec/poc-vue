<template>
    <div>
        <!-- breadcrumb start -->
        <div class="breadcrumb-container">
            <div class="container">
                <ol class="breadcrumb">
                    <li><i class="fa fa-home pr-10"></i><a href="home">Accueil</a></li>
                    <li class="active">Acheteur</li>
                </ol>
            </div>
        </div>
        <!-- breadcrumb end -->
        <!-- section start -->
        <section class="dark-translucent-bg" style="background-image:url(assets/images/poignee_de_main.jpg); background-position: 50% 50%">
          <div class="container">
            <div class="row justify-content-lg-center">
              <div class="col-lg-12">
                <h2 class="text-center mt-4">
                  <div><span class="bold_6">Achetez</span> en confiance un <span class="bold_6">véhicule d'occasion</span></div>
                </h2>
                <div class="separator with-icon"><i class="fa fa-car bordered"></i></div>
              </div>
            </div>
          </div>
        </section>
        <!-- section end -->

        <!-- main-container start -->
        <section class="main-container">
            <div class="container">
                <div class="row">
                    <!-- main start -->
                    <div class="main col-md-12">
                        <!-- page-title start -->
                        <h3 class="title"><span class="text-defaut">A</span>cheteur</h3>
                        <div class="separator-2"></div>
                        <!-- page-title end -->
                    </div>
                    <!-- main end -->
                </div>
            </div>
        </section>
        <div class="container">
            <div class="row">
                <div class="col-lg-12 mb-20">
                    Vous souhaitez acquérir un véhicule d’occasion, vous avez fait une sélection parmi des annonces, demandez au vendeur de partager l'historique de son véhicule.
                    <br /><br />
                    HistoVec permet au vendeur de partager avec un acheteur intéressé l’historique des faits marquants du véhicule enregistrés dans le fichier national du SIV (Système d’Immatriculation des Véhicules), notamment :
                    <ul>
                        <li>date de mise en circulation</li>
                        <li>changements de propriétaire</li>
                        <li>sinistres à réparation contrôlée</li>
                        <li>situation administrative (gage, opposition, vol, …) etc.</li>
                    </ul>
                    En acheteur éclairé, vous pourrez prendre votre décision en toute quiétude.
                    <!-- accordion end -->
                </div>
            </div>
            <!-- row -->
            <div class="col-md-12 p-h-10">
              <p>Vous pouvez envoyer un courriel au vendeur en utilisant le bouton ci-dessous. Il s'agit d'un modèle qui peut vous aider, mais vous pouvez utiliser d'autres moyens pour lui faire part de votre demande.</p>
              <p>Cette option ne fonctionne que si votre navigateur est configuré pour ouvrir les liens couriel. <br>
              <p class="text-center">
                <a :href="'mailto:?subject=Rapport%20Histovec&body=' + mailBody" class="btn radius-30 btn-default btn-animated btn">Demander le rapport histovec <i class="fa fa-send"></i></a>
              </p>
            </div>
        <!-- container -->
        </div>
    </div>
</template>

<script>
  export default {
    computed: {
      mailBody () {
        var text = encodeURI('Bonjour,\n\nVous vendez un véhicule que je souhaiterais acquérir. Serait-il possible de me communiquer son historique. Vous pourrez obtenir cet historique en vous connectant sur le service histovec du Ministère de l\'Intérieur. Un lien vous sera alors fourni pour que vous puissiez prouver votre bonne foi auprès d\'acheteurs comme moi.\n\nCe service est disponible en cliquant sur le lien suivant : ')
        return text + this.url.replace('&', '%26')
      },
      url () {
        return window.location.protocol + '//' + window.location.host + '/histovec/'
      }
    },
    created () {
      this.$http.put(this.apiUrl + 'log/' + this.$route.path.replace(/^\/\w+\//, '')).then(response => {}, () => {})
    }
  }
  </script>
