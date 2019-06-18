import Vue from 'vue'

export default {
  state: {
    formOptions: undefined,
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
    fniMode: true
  },
  mutations: {
    clearIdentity (state) {
      state.nom = ''
      state.raisonSociale = ''
      state.prenom = ''
      state.dateNaissance = ''
      state.dateCertificat = ''
      state.plaque = ''
      state.siren = ''
      state.formule = ''
    },
    initFormOptions (state, formOptions) {
      state.formOptions = formOptions
    },
    updateFormOptions (state, update) {
      Object.keys(update).forEach( keyPathString => {
        let o = state.formOptions
        const value = update[keyPathString]
        let keyPathArray = keyPathString.split('.')
        for (let i = 0, n = keyPathArray.length - 1; i < n; ++i) {
          let k = keyPathArray[i]
          if (k in o) {
            o = o[k]
          } else {
            throw new Error(`updateFormOptions error: path ${keyPathString} not found in formOptions`)
          }
        }
        Vue.set(o, keyPathArray[keyPathArray.length - 1], value)
      })
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
    }
  }
}