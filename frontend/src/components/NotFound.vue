<template>
  <div>
  <!-- breadcrumb start -->
  <div class="breadcrumb-container">
    <div class="container">
      <ol class="breadcrumb">
        <li><i class="fa fa-home pr-10"></i><a href="home">Accueil</a></li>
        <li class="active">Mentions légales</li>
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
                  <div><span class="bold_6">Achetez</span> en confiance un <span class="bold_6">véhicule d'occasion</span></div>
                </h2>
                <div class="separator with-icon"><i class="fa fa-car bordered"></i></div>
              </div>
            </div>
          </div>
        </section>
        <!-- section end -->
        <!-- debut image fixe
        <div class="col-md-12"> <img src="assets/images/corporate-1-slider-slide-2.jpg" class="img-responsive" alt="slidebg2" data-bgposition="center top" data-bgrepeat="no-repeat" data-bgfit="cover"></div>
  <!-- fin image fixe -->
      </div>
    </div>
  </section>
  <!-- section -->
  <!-- main-container start -->
  <section class="main-container">
    <div class="container">
      <div class="row">
        <!-- main start -->
        <div class="main col-md-12">
          <!-- page-title start -->
          <h3 class="title"><span class="text-defaut">404</span></h3>
          <div class="separator-2"></div>
          <!-- page-title end -->
        </div>
        <!-- main end -->
        <div class="container">
          <!-- debut image fixe
          <div class="col-md-12"> <img src="assets/images/panneau-impasse.svg" class="img-responsive" alt="panneau voie sans issue" data-bgposition="center top" data-bgrepeat="no-repeat"></div>
    <!-- fin image fixe -->
          <div class="row">
            <div class="col-lg-12 no-margin">
              <p>La page que vous cherchez ne semble pas exister.</p>
              <p>Nous vous invitons à revenir en arrière et d'essayer une autre route.</p>
            </div>
          </div>
          <!-- row -->
        </div>
        <!-- container -->
      </div>
    </div>
  </section>
</div>
</template>

<script>
export default {
  created () {
    this.$http.put(this.apiUrl + 'log/404/' + this.$cookie.get('userId') + '/' + this.$route.path.replace(/^\/\w+\//, '')).then(response => {}, () => {})
  }
}
</script>
