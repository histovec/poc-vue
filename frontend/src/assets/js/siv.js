import moment from 'moment'
import orderBy from 'lodash.orderby'
import operations from '../json/operations.json'
import suspensions from '../json/suspensions.json'


export default { siv }

const missing = 'non disponible'

function pad (n, width, z) {
  z = z || '0'
  n = n + ''
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
}

function formatDate (isoDate) {
  let date = new Date(isoDate)
  let mm = date.getMonth() + 1 // getMonth() is zero-based
  let dd = date.getDate()

  return [(dd > 9 ? '' : '0') + dd,
    (mm > 9 ? '' : '0') + mm,
    date.getFullYear()
  ].join('/')
}

function calcCertifDepuis (dateStr) {
  // Si on détecte que la date est au format FR alors on l'a converti
  if (moment(dateStr, 'DD/MM/YYYY', true).isValid()) {
    dateStr = moment(dateStr, 'DD/MM/YYYY').format('YYYY-MM-DD')
  }
  let nbMonth = Math.floor(moment(new Date()).diff(new Date(dateStr), 'months', true))

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
}

function getVehiculeTypeCarburant (carburant) {
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
}

function getVehiculeLogo (genre) {
  let moto = ['MTL', 'MTT1', 'MTT2', 'MTTE', 'CL']
  let truck = ['CAM', 'Deriv-VP', 'TRA', 'TRR', 'TCP']
  let type = 'car'
  if (moto.includes(genre)) {
    type = 'motorcycle'
  } else if (truck.includes(genre)) {
    type = 'truck'
  }
  return type
}

function getVignetteNumero (genre, categorie, typeCarburant, pollution, datePremImmat) {
  let splitDate = datePremImmat.split('/')
  let dateImmatEn = new Date(splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0])
  let vignette = ''
  // Mapping Norme Euro
  let normeEuro = (pollution) ? pollution.split('EURO') : ''
  let numeroEuro = (normeEuro !== '' && normeEuro[1] !== undefined) ? normeEuro[1] : ''
  let voitureParticuliere = []
  let vehiculeUtilitaireLegers = []
  let motocycle = []
  let cyclomoteur = []
  let poidsLourdsAutobusAutocar = []
  if (typeCarburant === 'gaz' || typeCarburant === 'hybride') {
    vignette = 1
  } else if (typeCarburant === 'electrique') {
    vignette = 'electrique'
  } else {
    // Mapping Categorie
    if ((categorie !== '' && categorie !== undefined)) {
      let categ = categorie.split('-')
      categorie = categ[0] // Cas des categories qui contiennent des sous catégories (ex: L3e-A1) on récupère uniquement la première categorie
      voitureParticuliere = ['M1']
      vehiculeUtilitaireLegers = ['N1']
      motocycle = ['L3e', 'L4e', 'L5e', 'L7e']
      cyclomoteur = ['L1e', 'L2e', 'L6e']
      poidsLourdsAutobusAutocar = ['M2', 'M3', 'N2', 'N3']
    } else if (genre !== '') {
      categorie = genre // Uniquement si la catégorie n'est pas remplie on remplace par genre
      voitureParticuliere = ['VP']
      vehiculeUtilitaireLegers = ['CTTE']
      motocycle = ['QM', 'TM', 'MTL', 'MTT1', 'MTT2', 'MTTE']
      cyclomoteur = ['CYCL', 'CL']
      poidsLourdsAutobusAutocar = ['CAM', 'TCP']
    } else {
      return vignette
    }

    if (motocycle.includes(categorie) || cyclomoteur.includes(categorie)) {
      if (numeroEuro === '4' || (numeroEuro === '' && motocycle.includes(categorie) && dateImmatEn >= new Date('2017-01-01')) || (numeroEuro === '' && cyclomoteur.includes(categorie) && dateImmatEn >= new Date('2018-01-01'))) {
        vignette = 1
      } else if (numeroEuro === '3' || (numeroEuro === '' && motocycle.includes(categorie) && (dateImmatEn >= new Date('2007-01-01') && dateImmatEn <= new Date('2016-12-31'))) || (numeroEuro === '' && cyclomoteur.includes(categorie) && (dateImmatEn >= new Date('2007-01-01') && dateImmatEn <= new Date('2017-12-31')))) {
        vignette = 2
      } else if (numeroEuro === '2' || (numeroEuro === '' && dateImmatEn >= new Date('2004-07-01') && dateImmatEn <= new Date('2006-12-31'))) {
        vignette = 3
      } else if (dateImmatEn >= new Date('2000-06-01') && dateImmatEn <= new Date('2004-06-30')) {
        vignette = 4
      }
    } else if (voitureParticuliere.includes(categorie)) {
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
    } else if (vehiculeUtilitaireLegers.includes(categorie)) {
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
    } else if (poidsLourdsAutobusAutocar.includes(categorie)) {
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
}

function histoFilter (historique) {
  let h = historique.filter(event => operations[event.opa_type] !== undefined)
  h = orderBy(h, ['opa_date'], ['desc'])
  return h.map(event => {
    return {'date': formatDate(event.opa_date), 'nature': operations[event.opa_type]}
  })
}

function calcNbTit (historique) {
  let opTit = ['IMMAT_NORMALE', 'IMMAT_NORMALE_PREM_VO', 'CHANG_LOC', 'CHANG_LOC_CVN', 'CHANG_TIT_NORMAL', 'CHANG_TIT_NORMAL_CVN']
  let nbTit = historique.filter(event => opTit.includes(event.opa_type))
  return nbTit.length
}

function siv (veh) {
  if (veh === undefined) {
    return false
  } else if (veh.annulation_ci === 'OUI') {
    return veh
  }
  /* eslint-disable-next-line no-console */
  console.log(veh)
  let v = {
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
  }
  // filtre l'historique des opérations annulées
  let historique = veh.historique
  historique = (historique === undefined) ? [] : historique.filter(event => event.ope_date_annul === undefined)
  // réordonne l'historique des opérations
  historique = orderBy(historique, ['opa_date'])
  v.date_update = veh.date_update || v.date_update
  v.ctec.vin = veh.vin
  v.plaque = veh.plaq_immat
  v.ctec.couleur = veh.couleur || missing
  v.ctec.cnit = veh.num_cnit
  v.ctec.tvv = veh.tvv
  v.ctec.reception.type = veh.type_reception
  v.ctec.reception.numero = veh.cveh_num_reception
  v.ctec.puissance.cylindres = veh.CTEC_CYLINDREE
  v.ctec.puissance.nette = veh.CTEC_PUISS_NETTE
  v.ctec.puissance.cv = veh.CTEC_PUISS_CV
  v.ctec.puissance.norm = veh.CTEC_RAPPORT_PUIS_MASSE
  v.ctec.places.assis = veh.CTEC_PLACES_ASSISES
  v.ctec.places.debout = veh.CTEC_PLACES_DEBOUT
  v.ctec.db = veh.CTEC_NIVEAU_SONORE
  v.ctec.co2 = veh.CTEC_CO2
  v.ctec.moteur = veh.CTEC_VITESSE_MOTEUR
  v.ctec.marque = veh.marque
  v.ctec.modele = veh.nom_commercial
  v.ctec.genre = veh.CTEC_RLIB_GENRE
  v.ctec.categorie = veh.CTEC_RLIB_CATEGORIE
  v.ctec.carrosserie.national = veh.CTEC_RLIB_CARROSSERIE_NAT
  v.ctec.carrosserie.ce = veh.CTEC_RLIB_CARROSSERIE_CE
  v.ctec.environnement = veh.CTEC_RLIB_POLLUTION
  v.ctec.energie = veh.CTEC_RLIB_ENERGIE
  v.ctec.PT.admissible = veh.pt_tech_adm_f1
  v.ctec.PT.AC = veh.ptac_f2
  v.ctec.PT.RA = veh.ptra_f3
  v.ctec.PT.service = veh.pt_service_g
  v.ctec.PT.AV = veh.ptav_g1
  v.titulaire.identite = [veh.pers_raison_soc_tit, veh.pers_siren_tit, veh.pers_nom_naissance_tit, veh.pers_prenom_tit].join(' ')
  v.titulaire.adresse = (veh.adr_code_postal_tit !== undefined) ? pad(veh.adr_code_postal_tit, 5) : missing
  v.certificat.premier = veh.date_premiere_immat || missing
  // véhicule importé: changement de règle de gestion #406
  v.certificat.etranger = (veh.import === 'OUI')
  v.certificat.siv = veh.date_premiere_immat_siv || missing
  v.certificat.fr = (v.certificat.etranger && (historique.length > 0)) ? formatDate(historique[0].opa_date) : v.certificat.premier
  v.fni = ((veh.dos_date_conversion_siv !== undefined) && (historique.length > 0)) ? ((historique[0].opa_type === 'IMMAT_NORMALE') ? 'converti' : 'converti_incertain') : (veh.date_premiere_immat_siv === undefined)
  v.certificat.incertain = !v.certificat.etranger && (v.certificat.siv !== v.certificat.fr) && ((historique.length === 0) || (historique[0].opa_type !== 'IMMAT_NORMALE'))
  v.certificat.courant = veh.date_emission_CI || missing
  v.certificat.depuis = calcCertifDepuis((orderBy(historique.filter(e => (e.opa_type === 'IMMAT_NORMALE' || e.opa_type === 'IMMAT_NORMALE_PREM_VO' || e.opa_type === 'CHANG_TIT_NORMAL' || e.opa_type === 'CHANG_TIT_NORMAL_CVN')), ['opa_date'], ['desc'])[0] || {'opa_date': veh.date_premiere_immat}).opa_date)

  if ((v.fni !== true) && (v.certificat.fr !== v.certificat.siv) && ((historique === undefined) || (!historique.some(e => e.opa_type.match(/(CONVERSION_DOSSIER_FNI|.*_CVN)/))))) {
    let tmp = historique
    tmp.push({opa_date: v.certificat.siv.replace(/^(..)\/(..)\/(....)$/, '$3-$2-$1'), opa_type: 'CONVERSION_DOSSIER_FNI'})
    v.historique = (historique !== undefined) ? histoFilter(tmp) : []
  } else {
    v.historique = (historique !== undefined) ? histoFilter(historique) : []
  }
  v.nb_proprietaires = veh.nb_proprietaire
  v.nb_tit = (historique !== undefined) ? (calcNbTit(historique) + (v.certificat.incertain ? 1 : 0)) : undefined
  v.age_veh = veh.age_annee
  v.logo_vehicule = getVehiculeLogo(veh.CTEC_RLIB_GENRE)
  v.vignette_numero = getVignetteNumero(veh.CTEC_RLIB_GENRE, veh.CTEC_RLIB_CATEGORIE, getVehiculeTypeCarburant(veh.CTEC_RLIB_ENERGIE), veh.CTEC_RLIB_POLLUTION, veh.date_premiere_immat)

  v.administratif.gages = veh.gage || missing
  v.administratif.suspension = (veh.suspension === 'NON') ? 'Non' : 'Oui'
  v.administratif.annulation = (veh.annulation_ci === 'NON') ? 'Non' : 'Oui'
  v.administratif.suspensions = (veh.suspension === 'NON') ? ['NON'] : ((veh.suspensions === undefined) ? ['certificat annulé'] : veh.suspensions.map(s => suspensions[s]))
  // v.administratif.suspensions = (veh.suspension === 'NON') ? ((veh.suspension === 'NON') ? 'NON' : 'certificat annulé') : ((veh.annulation_ci === 'NON') ? 'certificat suspendu' : 'certificat suspendu et annulé') // mapping à valider
  // opposition et procédure à valider
  v.administratif.otci = (veh.otci === 'NON') ? 'Aucune' : ((veh.otci_pv === 'OUI') ? 'opposition temporaire (PV en attente)' : 'opposition temporaire')
  v.administratif.ove = (veh.ove === 'NON') ? 'Aucune' : 'Oui'
  v.administratif.oppositions = (veh.ove === 'NON') ? ((veh.otci === 'NON') ? 'NON' : (veh.otci_pv === 'OUI') ? 'Opposition temporaire (PV en attente)' : 'opposition temporaire') : ((veh.otci === 'NON') ? 'Procédure de réparation contrôlée' : 'opposition temporaire, véhicule endommagé') // mapping à valider
  v.administratif.pv = (veh.otci_pv === 'OUI')
  // pour l'instant aucun véhicule saisi dans les échantillons
  v.administratif.saisie = (veh.saisie === 'NON') ? 'Aucune' : 'Oui'
  v.administratif.gage = (veh.gage === 'NON') ? 'Aucun' : 'Oui'
  v.administratif.procedures = (veh.saisie === 'NON') ? ((veh.gage === 'NON') ? 'NON' : 'véhicule gagé') : ((veh.annulation_ci === 'NON') ? 'véhicule saisi' : 'véhicule gagé et saisi') // mapping à valider
  v.administratif.vol = veh.vehicule_vole || missing

  // vol : les informations viennent-elles de foves ?
  v.administratif.titre.vol = veh.ci_vole || missing
  v.administratif.titre.perte = veh.perte_ci || missing
  v.administratif.titre.duplicata = (veh.perte_ci === 'OUI') ? 'OUI' : veh.duplicata

  v.administratif.synthese = [ 'saisie', 'vehicule_vole', 'gage', 'suspension', 'perte_ci', 'ci_vole', 'annulation_ci', 'duplicata' ].filter(e => (e !== 'duplicata') ? veh[e] === 'OUI' : ((veh['perte_ci'] === 'OUI') || (veh['ci_vole'] === 'OUI') ? false : veh[e] === 'OUI'))
  if (veh['otci'] === 'OUI') {
    v.administratif.synthese.push(veh['ove'] === 'OUI' ? 'otci_ove' : 'otci')
  }
  // véhicule importé : changement de règle de gestion #406
  v.etranger = (veh.import === 'NON') ? 'NON' : [veh.import, veh.imp_imp_immat, veh.pays_import]
  // ci-dessous : interprétation à confirmer
  v.sinistres = (historique !== undefined) ? (orderBy(historique.filter(e => (e.opa_type === 'INSCRIRE_OVE') || (e.opa_type === 'DEC_VE')), ['opa_date'], ['desc']).map(e => e.opa_date.replace(/-.*/, ''))) : []
  v.sinistres_nb = (historique !== undefined) ? (orderBy(historique.filter(e => (e.opa_type === 'INSCRIRE_OVE') || (e.opa_type === 'DEC_VE')), ['opa_date'], ['desc']).map(e => ((e.opa_type === 'INSCRIRE_OVE') ? 10 : 1))) : []
  v.sinistres_nb = v.sinistres_nb.length === 0 ? 0 : v.sinistres_nb.reduce((a, b) => a + b)
  v.sinistres_nb = Math.max(v.sinistres_nb % 10, ((v.sinistres_nb - (v.sinistres_nb % 10)) / 10))
  // console.log(v.sinistres_nb)
  v.sinistre = v.sinistres[0]
  v.aptes = (historique !== undefined) ? (orderBy(historique.filter(e => (e.opa_type === 'LEVER_OVE') || (e.opa_type === 'SEC_RAP_VE')), ['opa_date'], ['desc']).map(e => e.opa_date.replace(/-.*/, ''))) : []
  v.apte = (historique !== undefined) ? ((v.aptes[0] > v.sinistres[0]) || ((veh.suspension === 'NON') && (veh.ove === 'NON'))) : undefined
  try {
    if (typeof veh.usage === 'string') {
      v.usage = JSON.parse(veh.usage)
    } else {
      v.usage = veh.usage
    }
  } catch (e) {
    v.usage = undefined
  }
  /* eslint-disable-next-line no-console */
  console.log(v)
  return v
}
