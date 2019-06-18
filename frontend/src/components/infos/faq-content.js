// import slugify from '@sindresorhus/slugify'
import slugify from '@/assets/js/slugify.js'

import aideSIV from '@/assets/img/aide_siv.jpg'
import aideFNI from '@/assets/img/aide_fni.jpg'
import store from '@/store'
import contact from '@/assets/json/contact.json'


const contactHook = (id, mode = contact.mode.contact, subject = contact.subject.contact, mailBody = undefined) => {
  /* eslint-disable-next-line */
  console.log(id, mode, subject)
  return {
    [id]: (e) => {
      if (store.state.config.v1) {
        e.removeAttribute('href')
        e.onclick = async () => {
          /* eslint-disable-next-line */
          console.log(mode, subject)
          await store.dispatch('toggleModalForm', { mode: mode, subject: subject })
        }
      } else {
        if (mailBody) {
          e.href = `mailto:histovec@interieur.gouv.fr?subject=${encodeURIComponent(subject)}&body=${mailBody}`
        } else {
          e.href = `mailto:histovec@interieur.gouv.fr?subject=${encodeURIComponent(subject)}`
        }
        e.onclick = () => { return }
      }
    }
  }
}

export default function (mailBody) {
  let id = 0
  var faqContent = [
    {
      title: 'Comment utiliser HistoVec ?',
      body: `
        <dl>
          <dt>Vous êtes vendeur :</dt>
          <dd>
            <ol>
              <li>
                sur la page vendeur, remplissez le formulaire pour vous
                identifier avec les informations demandées, et validez.
                <p class="indented">
                  Note : s’il s’agit d’un véhicule d’entreprise, cliquez
                  sur l’onglet “Entreprise”
                </p>
              </li>
              <li>
                le rapport du véhicule est affiché. Vous pouvez consulter
                les différentes sections sur le menu de gauche.
              </li>
              <li>
                vous pouvez transmettre le lien vers le rapport à un tiers
                en cliquant sur le menu “Transmettre le rapport”.
              </li>
            </ol>
          </dd>
          <dt>Vous êtes acheteur :</dt>
          <dd>
            <p class="indented">
              Demandez au vendeur de vous transmettre le lien vers le
              rapport en le générant sur le site Histovec.
            </p>
          </dd>
        </dl>
      `,
    },
    {
      title: 'Comment retrouver mon rapport HistoVec ultérieurement ?',
      body: `
        <p class="indented">
          Le rapport généré est consultable le mois en cours et le
          mois suivant sa génération, grâce au lien qui a été fourni
          par le vendeur.
        </p>
      `,
    },
    {
      title: 'A qui s’adresse HistoVec ?',
      body: `
        <dl>
          <dt>Je vends mon véhicule d’occasion :</dt>
          <dd>
            <p class="indented">
              HistoVec vous permet de valoriser votre offre en
              fournissant gratuitement un rapport d’historique
              officiel qui rassurera vos acheteurs potentiels.
            </p>
          </dd>
          <dt>J’achète un véhicule d’occasion :</dt>
          <dd>
            <p class="indented">
              HistoVec vous permet de vous informer, de faire un choix
              éclairé sur les véhicules sélectionnés et d’éviter les
              mauvaises surprises.
            </p>
          </dd>
          <dt>Je suis un professionnel négociant automobile :</dt>
          <dd>
            <p class="indented">
              Fiabilisez et valorisez votre stock de véhicules
              d’occasion en permettant à votre entreprise et vos
              clients de vérifier l’historique des véhicules acquis.
            </p>
          </dd>
          <dt>Je loue ma voiture à des particuliers :</dt>
          <dd>
            <p class="indented">
              Je peux rassurer mes clients potentiels en fournissant
              gratuitement un historique officiel du véhicule.
            </p>
          </dd>
        </dl>
      `
    },
    {
      title: 'D’où proviennent les informations d’HistoVec ?',
      body: `
        <p class="indented">
          Les informations du rapport sont issues du système
          d’immatriculation des véhicules (SIV) du ministère de
          l’intérieur.
        </p>
      `
    },
    {
      title: 'Comment consulter le rapport d’un véhicule qui ne m’appartient pas ?',
      body: `
        <p class="indented">
          Seul le propriétaire du certificat d’immatriculation peut
          générer le rapport HistoVec de son véhicule, qu’il choisit
          de transmettre à des tiers.
        </p>
      `
    },
    {
      title: 'Quelles sont les garanties d’HistoVec ?',
      body: `
        <dl>
          <dt>Officiel :</dt>
          <dd>
            <p class="indented">
              HistoVec est un site produit par le ministère de
              l’intérieur et fournit les données du système
              d’immatriculation des véhicules (SIV).
            </p>
          </dd>
          <dt>Confidentiel :</dt>
          <dd>
            <p class="indented">
              Seul le propriétaire du certificat d’immatriculation
              peut générer le rapport HistoVec de son véhicule, qu’il
              choisit de transmettre à des tiers.
            </p>
          </dd>
          <dt>Gratuit :</dt>
          <dd>
            <p class="indented">
              HistoVec est entièrement gratuit pour les vendeurs et
              les acheteurs. Il s’agit d’un service public pour
              contribuer à la sécurisation des transactions de
              véhicules d’occasion.
            </p>
          </dd>
        </dl>
      `
    },
    {
      title: 'Est-ce que les informations sont complètes ?',
      body: `
        <p class="indented">
          Seules les informations connues du Ministère de l’Intérieur
          sont fournies. Par exemple, ne sont enregistrés que les
          sinistres déclarés à l’assureur et pour lesquels un expert a
          enregistré une procédure VRC (Véhicule à Réparation
          Contrôlée).
        </p>
      `
    },
    {
      title: 'Comment signaler une information manquante ou inexacte ?',
      body: `
        <p class="indented">
          <a
            id="contact_hook_${id}"
            href="mailto:histovec@interieur.gouv.fr?subject=Signaler%20une%20erreur"
          >
            contactez-nous
          </a>
        </p>
      `,
      callbacks: contactHook(`contact_hook_${id++}`, contact.mode.contact, contact.subject.error),
      react: { object: store.state.config, key: 'v1'}
    },
    {
      title: 'Je ne trouve pas mon véhicule ?',
      body: `
        <p class="indented">
          Vérifiez que vous avez saisi très précisément dans les
          champs du formulaire les informations telles qu'elles
          figurent sur la carte grise (nom et prénom(s),
          immatriculation, numéro de formule ou date du certificat
          d'immatriculation).
        </p>
        <p class="indented">
          Pour les anciens numéros d'immatriculation, veillez à bien
          saisir vos nom et prénom(s) dans le même ordre que celui qui
          apparaît sur la carte grise.
        </p>
        <p class="indented">
          Immatriculation au format SIV (AA-123-AA): où trouver les
          informations sur votre carte grise.
        </p>
        <p class="indented">
          <img
            class="img-responsive"
            src="${aideSIV}"
          />
        </p>
        <br />
        <p class="indented">
          Immatriculation au format FNI (123 ABC 45): où trouver les
          informations sur votre carte grise (plusieurs modèles).
        </p>
        <p class="indented">
          <img
            class="img-responsive"
            src="${aideFNI}"
          />
        </p>
        <br />
        <p class="indented">
          Si vous êtes locataire longue durée du véhicule, essayez
          avec les informations du titulaire propriétaire (par exemple
          pour une société de location, cliquez sur l'onglet
          Entreprise du formulaire pour remplir les informations
          correspondantes).
        </p>
        <p class="indented">
          Il se peut aussi qu'il y ait une erreur sur la date de
          naissance enregistrée dans le système d’immatriculation des
          véhicules (SIV) :
          <a
            id="contact_hook_${id}"
            href="mailto:histovec@interieur.gouv.fr?subject=Je%20ne%20trouve%20pas%20mon%20vehicule&body=${mailBody}"
          >contactez-nous</a>.
        </p>
      `,
      callbacks: contactHook(`contact_hook_${id++}`, contact.mode.contact, contact.subject.holderNotFound, mailBody),
      react: { object: store.state.config, key: 'v1'}
    },
    {
      title: 'Où se trouve le numéro de formule ?',
      body: `
        <p class="indented">
          Le numéro de formule est situé en bas à gauche de la carte
          grise. (p. ex. : 2015XX012345)
        </p>
      `
    },
    {
      title: 'Que signifient les termes des opérations historiques ?',
      body: `
        <p class="indented">
          <strong>- Première immatriculation d'un véhicule neuf,</strong>
          opération d'immatriculation d'un véhicule qui n'a jamais été
          immatriculé.
        </p>
        <p class="indented">
          <strong>- Première immatriculation à l'étranger,</strong> le
          véhicule a été immatriculé en tant que véhicule neuf à
          l'étranger.
        </p>
        <p class="indented">
          <strong>- Première immatriculation d'un véhicule importé,</strong>
          véhicule déjà immatriculé à l'étranger qui se fait
          immatriculer en France pour la première fois.
        </p>
        <p class="indented">
          <strong>- Première immatriculation (source incertaine),</strong>
          opération fournie à titre indicatif lorsque aucune opération
          telle que « Première immatriculation d'un véhicule neuf » ou
          « Première immatriculation à l'étranger » n'est associée à
          la date présente dans le fichier. Cela peut être dû à
          l'origine du véhicule (p. ex. anciens véhicules militaires
          qui disposaient d'une immatriculation spéciale) ou à
          l'absence de la donnée dans les anciens fichiers
          d'immatriculation (p. ex. certains véhicules anciens).
        </p>
        <p class="indented">
          <strong>- Conversion au nouveau format d'immatriculation,</strong>
          changement d'immatriculation d'un véhicule passant du format
          1234 ABC 56 au format AB-123-CD.
        </p>
        <p class="indented">
          <strong>- Cession (vente du véhicule),</strong> véhicule
          vendu par un particulier ou par un professionnel.
        </p>
        <p class="indented">
          <strong>- Changement de titulaire,</strong> opération
          correspondant au moment où un particulier effectue sa
          demande de carte grise pour la mettre à son nom.
        </p>
        <p class="indented">
          <strong>- Achat ou reprise par un professionnel,</strong>
          opération correspondant au moment où un professionnel
          devient acquéreur du véhicule.
        </p>
        <p class="indented">
          <strong>
            - Fin d'usage démonstration pour vente du véhicule,
          </strong>
          véhicule de garage ayant servi de véhicule de démonstration.
        </p>
        <p class="indented">
          <strong>- Opposition au transfert de la carte grise,</strong>
          état bloquant tout changement de titulaire.
        </p>
        <p class="indented">
          <strong>- Procédure de réparation contrôlée,</strong>
          procédure pendant laquelle les réparations sont contrôlées
          par un expert en automobile.
        </p>
        <p class="indented">
          <strong>- Premier rapport d'expert,</strong> rapport de
          l'expert en automobile qui détermine la dangerosité du
          véhicule, établit la liste des réparations et en évalue le
          montant.
        </p>
        <p class="indented">
          <strong>- Second rapport d'expert,</strong> rapport de
          l'expert en automobile qui indique notamment que le véhicule
          est apte à circuler dans des conditions normales de
          sécurité.
        </p>
      `
    },
    {
      title: 'Quelle différence y a-t-il entre la notion de propriétaire et titulaire ?',
      body: `
        <p class="indented">
          Propriétaire du véhicule et titulaire du certificat
          d'immatriculation sont deux notions différentes :
        </p>
        <p class="indented">
          <strong>Propriétaire</strong>: il s'agit du propriétaire du
          bien qu'est le véhicule et qui peut donc le vendre.
        </p>
        <p class="indented">
          <strong>Titulaire</strong>: il s'agit de la ou les
          personne(s) titulaire du droit à circuler avec le véhicule.
        </p>
        <p class="indented">
          Le propriétaire du véhicule et titulaire du certificat
          d'immatriculation sont le plus souvent la même personne,
          mais peuvent être différents. C'est pourquoi, Histovec
          distingue les opérations qui correspondent à la vente du
          véhicule ("cession/vente par un particulier" et
          "achat/reprise par un professionnel ") du changement de
          titulaire.
        </p>
      `
    },
    {
      title: 'Quelle est la politique de protection des données personnelles ?',
      body: `
        <p class="indented">
          Vous pouvez les consulter dans
          <a href="legal">mentions légales.</a>
        </p>
      `
    },
    {
      title: 'Que dois-je faire pour vendre mon véhicule ?',
      body: `
      <p class="indented">
      Vendre un véhicule vous impose de remettre certains documents au nouveau propriétaire
      et d'avertir l'administration via un téléservice. Afin de connaitre les conditions préalables
      à la vente ainsi que les démarches à entreprendre, nous vous invitons à consulter
      le site du <a href="https://www.service-public.fr/particuliers/vosdroits/F1707">Service Public</a>
      </p>
      <p class="indented">
        Ce que vous pouvez faire grâce à HistoVec:
      </p>
      <ul>
        <li>Transmettre l'historique administratif du véhicule à l'acheteur (en cliquant sur Transmettre le rapport) ;</li>
        <li>Télécharger le certificat de situation administrative détaillé (CSA ; téléchargeable en cliquant sur Transmettre le rapport).</li>
      </ul>
      `
    },
    {
      title: 'Acheteur: le lien fourni ne fonctionne pas',
      body: `
      <p class="indented">
      Le titulaire du véhicule vous a transmis un lien, celui-ci ne fonctionne pas. Les cas suivants peuvent être rencontrés :
      </p>
      <p class="indented">
      1. Le lien a été probablement mal copié ou transmis - HistoVec vous signale alors une erreur:
      </p>
      <ul class="indented">
        <li> Le lien transmis est incomplet </li>
        <li> Le rapport a été trouvé, mais la clé pour l'ouvrir est invalide </li>
      </ul>
      <p class="indented">
      <br />Pensez à l'alternative de l'envoi par QR-Code si les mails n'ont pas permis d'aboutir.
      </p>
      <p class="indented">
      2. Le rapport n'existe pas, ou n'est plus disponible pour des raisons de sécurité - HistoVec vous signale alors une erreur:
      </p>
      <ul class="indented">
          <li> Le rapport ne semble pas ou plus disponible </li>
        </ul>
      </p>
      <p class="indented"> <b> Dans tous ces cas, il convient de demander à nouveau le rapport à votre vendeur </b> </p>
      <p class="indented">
      Si jamais le problème persiste avec votre vendeur :
        <a
          id="contact_hook_${id}"
          href="mailto:histovec@interieur.gouv.fr?subject=Signaler%20une%20erreur%20de%20lien%20invalide"
        >
          contactez-nous
        </a>
      </p>
      `,
      callbacks: contactHook(`contact_hook_${id++}`, contact.mode.contact, contact.subject.buyerNotFound),
      react: { object: store.state.config, key: 'v1'}
    }
  ]

  return faqContent.map(content => ({
    ...content,
    id: slugify(content.title)
  }))
}
