import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    typePersonne: 'particulier',
    nom: '',
    raisonSociale: '',
    prenom: '',
    dateNaissance: '',
    plaque: '',
    siren: '',
    formule: '',
    key: undefined,
    code: undefined,
    v: undefined,
    cookie: undefined,
    id: undefined
  },
  mutations: {
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
    updatePlaque (state, plaque) {
      state.plaque = plaque
    },
    updateFormule (state, formule) {
      state.formule = formule
    },
    updateTypePersonne (state, typePersonne) {
      state.typePersonne = typePersonne
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
