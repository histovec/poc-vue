import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    typePersonne: 'particulier',
    typeImmatriculation: '',
    nom: '',
    raisonSociale: '',
    prenom: '',
    dateNaissance: '',
    dateCertificat: '',
    plaque: '',
    siren: '',
    formule: '',
    fniMode: false,
    key: undefined,
    code: undefined,
    v: undefined,
    cookie: undefined,
    id: undefined
  },
  mutations: {
    updateFniMode (state, fniMode) {
      state.fniMode = fniMode
    },
    updateNom (state, nom) {
      state.nom = nom
    },
    updatePrenom (state, prenom) {
      state.prenom = prenom
    },
    updateRaisonSociale (state, raisonSociale) {
      state.raisonSociale = raisonSociale
    },
    updateSiren (state, siren) {
      state.siren = siren
    },
    updateDateNaissance (state, dateNaissance) {
      state.dateNaissance = dateNaissance
    },
    updateDateCertificat (state, dateCertificat) {
      state.dateCertificat = dateCertificat
    },
    updatePlaque (state, plaque) {
      state.plaque = plaque
    },
    updateFormule (state, formule) {
      state.formule = formule
    },
    updateTypePersonne (state, typePersonne) {
      state.typePersonne = typePersonne
    },
    updateTypeImmatriculation (state, typeImmatriculation) {
      state.typeImmatriculation = typeImmatriculation
    },
    updateV (state, v) {
      state.v = v
    },
    updateCode (state, code) {
      state.code = code
    },
    updateKey (state, key) {
      state.key = key
    },
    updateCookie (state, cookie) {
      state.cookie = cookie
    },
    updateId (state, id) {
      state.id = id
    }
  }
})
