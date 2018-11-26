<template>
  <div>
  <!-- breadcrumb start -->
  <div class="breadcrumb-container">
    <div class="container">
      <ol class="breadcrumb">
        <li><i class="fa fa-home pr-10"></i><a href="home">Accueil</a></li>
        <li class="active">Contact</li>
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
  <!-- ================ -->
  <section class="main-container">
    <div class="container">
      <div class="row">
        <!-- main start -->
        <!-- ================ -->
        <div class="main col-md-9">
          <!-- page-title start -->
          <!-- ================ -->
          <h3 class="page-title"><span class="text-defaut">C</span>ontactez-nous</h3>
          <div class="separator-2"></div>
          <!-- page-title end -->
          <div class="contact-form">
            <form @submit="send" id="contact-form-with-recaptcha" class="margin-clear row" role="form">
              <div class="col-md-4">
                <div class="form-group has-feedback" :class="[{'has-error' : (nom === '' && status !== 'init')}]">
                  <label for="name">Nom <span class="color-danger">*</span></label>
                  <input type="text" class="form-control" id="name" name="name" placeholder="" v-model="nom">
                  <i class="fa fa-user form-control-feedback"></i>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group has-feedback" :class="[{'has-error' : (prenom === '' && status !== 'init')}]">
                  <label for="prenom">Prénom <span class="color-danger">*</span></label>
                  <input type="text" class="form-control" id="prenom" name="prenom" placeholder="" v-model="prenom">
                  <i class="fa fa-user form-control-feedback"></i>
                </div>
              </div>
              <div class="col-md-4">
                <div class="form-group has-feedback" :class="[{'has-error' : (email === '' && status !== 'init')}]">
                  <label for="email">Courriel <span class="color-danger">*</span></label>
                  <input type="email" class="form-control" id="email" name="email" placeholder="" v-model="email">
                  <i class="fa fa-envelope form-control-feedback"></i>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group has-feedback" :class="[{'has-error' : (object === '' && status !== 'init')}]">
                  <label for="subject">Objet <span class="color-danger">*</span></label>
                  <input type="text" class="form-control" id="subject" name="subject" placeholder="" v-model="object">
                  <i class="fa fa-navicon form-control-feedback"></i>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group has-feedback" :class="[{'has-error' : (message === '' && status !== 'init')}]">
                  <label for="message">Message <span class="color-danger">*</span></label>
                  <textarea class="form-control" rows="6" id="message" name="message" placeholder="" v-model="message"></textarea>
                  <i class="fa fa-pencil form-control-feedback"></i>
                </div>
              </div>
              <div class="col-md-12 centered">
                <button type="submit" class="btn btn-animated btn-default">Envoyer
                  <i class="fa" :class="[{'fa-send-o' : (status === 'init')},
                                         {'fa-spin fa-spinner' : (status === 'posting')},
                                         {'fa-check' : (status === 'posted')},
                                         {'fa-exclamation-triangle' : (status === 'failed')}]"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
        <!-- main end -->
      </div>
    </div>
  </section>
  <!-- main-container end -->
</div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      nom: '',
      prenom: '',
      object: '',
      email: '',
      message: '',
      status: 'init'
    }
  },
  computed: {
  },
  created () {
    this.$http.put(this.apiUrl + 'log/' + this.$route.path.replace(/^\/\w+\//, '')).then(response => {}, () => {})
  },
  methods: {
    send: function (e) {
      this.status = 'posting'
      if (this.nom && this.prenom && this.object && this.email && this.message) {
        let data = {'nom': this.nom, 'prenom': this.prenom, 'object': this.object, 'email': this.email, 'message': this.message}
        this.$http.post(this.apiUrl + 'contact/', data)
          .then(response => {
            this.status = 'posted'
          }, () => {
            this.status = 'failed'
          })
      } else { this.status = 'failed' }
      e.preventDefault()
    }
  }
}
</script>
