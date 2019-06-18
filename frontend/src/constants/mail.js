const HISTOVEC_SUPPORT_EMAIL = 'histovec@interieur.gouv.fr'

const DEFAULT_MAIL_TEMPLATE = `Bonjour,

L'équipe HistoVec vous remercie d'avoir utilisé le service HistoVec. Ce service permet au titulaire du certificat d'immatriculation de transmettre l'historique administratif à un acheteur potentiel et de télécharger le certificat de situation administrative détaillé. Il ne traite pas les questions liées aux démarches de cession, procédures d'immatriculation et certificats d'immatriculation qui sont gérées par l'ANTS (Agence Nationale des Titres Sécurisés).

Pour un usage optimal, nous conseillons l'utilisation de versions récentes de Firefox ou Chrome.

Afin de vous aider plus rapidement dans vos démarches, merci de nous communiquer les informations suivantes :

Nom :
Prénom(s) :
Date de naissance :
Plaque d'immatriculation :
Numéro de formule (pour les plaques du type AA-123-AA) ou date du certificat (pour les plaques du type 123 ABC 45) :
Description du problème :
Bien cordialement,

L'équipe HistoVec.`

export const CONTACT_MAIL = {
  recipients: [HISTOVEC_SUPPORT_EMAIL],
  subject: 'Contact Histovec',
  body: DEFAULT_MAIL_TEMPLATE
}

export const REPORT_ERROR_MAIL = {
  recipients: [HISTOVEC_SUPPORT_EMAIL],
  subject: 'Signaler une erreur',
  body: DEFAULT_MAIL_TEMPLATE
}
