<template>
  <div>
    <h6 class="text-center">
      Certificat de situation administrative détaillé
    </h6>
    <br />
    <p class="text-center">
      L'article R.322-4 du code de la route, précise que la remise du certificat d'immatriculation
      doit être accompagnée d'un certificat de situation administrative détaillé (CSA), établi depuis moins de quinze jours
      par le ministre de l'intérieur, attestant à sa date d'édition de la situation administrative du véhicule.
    </p>
    <p class="text-center">
      <button
        v-if="imagesLoading === 0"
        type="button"
        class="btn btn-animated btn-default btn-sm"
        title="certificat de situation administrative"
        @click="generatePDF"
      >
        Imprimer le CSA
        <i class="fa fa-print"></i>
      </button>
    </p>
  </div>
</template>

<script>

import moment from 'moment'
import JsPdf from 'jspdf'
import Qr from 'qr.js'

export default {
  props: {
    v: {
      type: Object,
      default: () => {}
    },
    url: {
      type: String,
      default: ''
    },
    baseurl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      imagesLoading: -1,
      images: {
        marianne: {
          url: 'assets/images/logo_mi_header.png'
        },
        histovec: {
          url: 'assets/images/histovec-logo-droite-name.png'
        }
      }
    }
  },
  computed: {
    validityDate () {
      return moment().add(-7, 'days').add(2, 'months').date(0).format('DD/MM/YYYY')
    }
  },
  created () {
    this.imagesLoading = Object.keys(this.images).length
    Object.keys(this.images).forEach((key) => {
      this.images[key].status = false
      this.images[key].img = new Image()
      this.images[key].img.src = this.images[key].url
      this.images[key].img.onload = () => {
        this.imagesLoading = this.imagesLoading - 1
      }
    })
  },
  mounted () {
    this.$store.dispatch('log', `${this.$route.path}/csa`)
  },
  methods: {
    pad (n, width, z) {
      z = z || '0'
      n = n + ''
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
    },
    generatePDF () {
      this.$store.dispatch('log', `${this.$route.path}/csa/download`)

      var pdf = new JsPdf({compress: true})
      let self = this
      // globall params
      pdf.setFont('helvetica')
      let p = {
        qr: {
          render: true,
          img: {
            pos: [170, 257],
            size: [0.4, 0.4, 0.4, 0.4],
            type: 'F'
          },
          logo: {
            pos: [170, 241, 24, 15]
          },
          text: {
            pos: [169, 282],
            rot: 90,
            size: 5
          }
        },
        marianne: {
          render: true,
          pos: [82, 10, 46, 24]
        },
        title: {
          render: true,
          size: 20,
          type: 'bold',
          align: 'center',
          pos: [105, 50],
          inter: 5,
          sub: {
            type: 'normal',
            size: 10
          }
        },
        id: {
          render: true,
          pos: [15, 67],
          inter: 7,
          htab: [5, 85, 100],
          title: {
            type: 'bold',
            size: 12
          },
          content: {
            type: 'normal',
            size: 10
          }
        },
        situation1: {
          render: true,
          pos: [15, 7],
          inter: 7,
          htab: [5, 10, 105, 110],
          title: {
            type: 'bold',
            size: 12
          },
          key: {
            type: 'bold',
            size: 10,
            inter: 4,
            intra: 4
          },
          value: {
            type: 'normal',
            size: 10,
            inter: 8,
            intra: 4
          }
        },
        situation2: {
          render: true,
          pos: [105, 7],
          inter: 7,
          htab: [5, 10],
          title: {
            type: 'bold',
            size: 12
          },
          key: {
            type: 'bold',
            size: 10,
            inter: 4,
            intra: 4
          },
          value: {
            type: 'normal',
            size: 10,
            inter: 6,
            intra: 4
          }
        },
        historique: {
          render: true,
          pos: [15, 105, 90],
          inter: 7,
          limit: 10,
          maxLengthText: 190,
          splitText: 65,
          htab: [5, 25, 105, 125],
          title: {
            type: 'bold',
            size: 12
          },
          content: {
            type: 'normal',
            size: 10,
            inter: 5
          }
        },
        date: {
          render: true,
          pos: [15, 245],
          htab: [5],
          inter: 7,
          title: {
            type: 'bold',
            size: 12
          },
          content: {
            type: 'normal',
            size: 10
          }
        },
        mentions: {
          render: true,
          pos: [15, 262],
          inter: 5,
          content: {
            type: 'italic',
            size: 8
          }
        }
      }

      // rendering
      if (p.qr.render) { // render QR Code
        let qrcode = Qr(self.url)
        let cells = qrcode.modules

        cells.forEach(function (row, rdx) {
          row.forEach(function (cell, cdx) {
            // console.log(cell, rdx, cdx)
            if (cell === true) {
              pdf.rect(p.qr.img.pos[0] + cdx * p.qr.img.size[0],
                p.qr.img.pos[1] + rdx * p.qr.img.size[1], p.qr.img.size[2],
                p.qr.img.size[3], p.qr.img.type)
            }
          })
        })
        pdf.setFontSize(p.qr.text.size)
        pdf.text(p.qr.text.pos[0], p.qr.text.pos[1], self.baseurl, null, p.qr.text.rot)
        pdf.addImage(this.images['histovec'].img, 'PNG', p.qr.logo.pos[0], p.qr.logo.pos[1], p.qr.logo.pos[2], p.qr.logo.pos[3])
      } // end of QR Code
      if (p.marianne.render) { // logo Marianne
        pdf.addImage(this.images['marianne'].img, 'PNG', p.marianne.pos[0], p.marianne.pos[1], p.marianne.pos[2], p.marianne.pos[3])
      } // end of logo Marianne
      if (p.title.render) { // pdf title
        pdf.setFontType(p.title.type)
        pdf.setFontSize(p.title.size)
        pdf.text(p.title.pos[0], p.title.pos[1], 'Certificat de situation administrative détaillé', null, null, p.title.align)
        pdf.setFontType(p.title.sub.type)
        pdf.setFontSize(10)
        pdf.text(p.title.pos[0], p.title.pos[1] + p.title.inter, '(Articles L.322-2 et R.322-4 du code de la route)', null, null, p.title.align)
      } // end of title
      if (p.id.render) { // identification du véhicule
        // title
        pdf.setFontType(p.id.title.type)
        pdf.setFontSize(p.id.title.size)
        pdf.text(p.id.pos[0], p.id.pos[1], 'Identification du véhicule')
        // content
        pdf.setFontType(p.id.content.type)
        pdf.setFontSize(p.id.content.size)
        let i = 1
        pdf.text(p.id.pos[0] + p.id.htab[0], p.id.pos[1] + p.id.inter * (i), 'Numéro d\'immatriculation du véhicule :')
        pdf.text(p.id.pos[0] + p.id.htab[1], p.id.pos[1] + p.id.inter * (i++), self.$store.state.identity.plaque.toUpperCase())
        pdf.text(p.id.pos[0] + p.id.htab[0], p.id.pos[1] + p.id.inter * (i), 'Date de première immatriculation du véhicule :')
        pdf.text(p.id.pos[0] + p.id.htab[1], p.id.pos[1] + p.id.inter * (i++), self.v.certificat.premier)
        pdf.text(p.id.pos[0] + p.id.htab[0], p.id.pos[1] + p.id.inter * (i), 'Numéro VIN du véhicule (ou numéro de série) :')
        pdf.text(p.id.pos[0] + p.id.htab[1], p.id.pos[1] + p.id.inter * (i++), self.v.ctec.vin)
        pdf.text(p.id.pos[0] + p.id.htab[0], p.id.pos[1] + p.id.inter * (i), 'Marque :')
        pdf.text(p.id.pos[0] + p.id.htab[1], p.id.pos[1] + p.id.inter * (i++), self.v.ctec.marque)
      } // identification du véhicule
      if (p.situation1.render) { // situation administrative
        let histoLength = self.v.historique.length
        if (self.v.historique.length > p.historique.limit) {
          histoLength = (self.v.historique.length + 5) / 2
        }
        p.situation1.pos[1] = p.situation1.pos[1] + p.historique.pos[1] + p.historique.inter + histoLength * p.historique.content.inter
        pdf.setFontType(p.situation1.title.type)
        pdf.setFontSize(p.situation1.title.size)
        pdf.text(p.situation1.pos[0], p.situation1.pos[1], 'Situation administrative du véhicule')
        let data = [
            {
              key: '- Opposition au transfert du certificat\n  d\'immatriculation (OTCI)',
              value: self.v.administratif.otci === 'Aucune' ? 'Aucune' : (self.v.administratif.pv ? 'PV en attente' : 'Oui')
            },
            {
              key: '- Procédure de réparation contrôlée',
              value: ((self.v.administratif.ove !== 'Aucune') || (this.$store.state.siv.v.suspensions && this.$store.state.siv.v.suspensions.includes('PVE')) ? 'Oui' : 'Aucune')
            },
            {
              key: '- Déclaration valant saisie',
              value: self.v.administratif.saisie
            },
            {
              key: '- Gage',
              value: self.v.administratif.gage
            }
        ]
        let offset = p.situation1.inter
        data.forEach(d => {
          pdf.setFontType(p.situation1.key.type)
          pdf.setFontSize(p.situation1.key.size)
          pdf.text(p.situation1.pos[0] + p.situation1.htab[0], p.situation1.pos[1] + offset, d.key)
          offset = offset + p.situation1.key.intra * (d.key.split('\n').length - 1) + p.situation1.key.inter
          pdf.setFontType(p.situation1.value.type)
          pdf.setFontSize(p.situation1.value.size)
          pdf.text(p.situation1.pos[0] + p.situation1.htab[1], p.situation1.pos[1] + offset, d.value)
          offset = offset + p.situation1.value.intra * (d.value.split('\n').length - 1) + p.situation1.value.inter
        })
      } // situation administrative
      if (p.situation2.render) { // situation administrative 2ème section
        let histoLength = self.v.historique.length
        if (self.v.historique.length > p.historique.limit) {
          histoLength = (self.v.historique.length + 5) / 2
        }
        p.situation2.pos[1] = p.situation2.pos[1] + p.historique.pos[1] + p.historique.inter + histoLength * p.historique.content.inter
        let data = [
            {
              key: '- Immatriculation suspendue',
              value: (self.v.administratif.suspension !== 'Non') ? self.v.administratif.suspensions.join(', ') : 'Non'
            },
            {
              key: '- Immatriculation annulée',
              value: self.v.administratif.annulation
            },
            {
              key: '- Véhicule volé',
              value: self.v.administratif.vol === 'NON' ? 'Non' : 'Oui'
            },
            {
              key: '- Certificat d\'immatriculation volé',
              value: self.v.administratif.titre.vol === 'NON' ? 'Non' : 'Oui'
            },
            {
              key: '- Certificat d\'immatriculation perdu',
              value: self.v.administratif.titre.perte === 'NON' ? 'Non' : 'Oui'
            },
            {
              key: '- Certificat d\'immatriculation duplicata',
              value: self.v.administratif.titre.duplicata === 'NON' ? 'Non' : 'Oui'
            }
        ]
        let offset = p.situation2.inter
        data.forEach(d => {
          pdf.setFontType(p.situation2.key.type)
          pdf.setFontSize(p.situation2.key.size)
          pdf.text(p.situation2.pos[0] + p.situation2.htab[0], p.situation2.pos[1] + offset, d.key)
          offset = offset + p.situation1.key.intra * (d.key.split('\n').length - 1) + p.situation1.key.inter
          pdf.setFontType(p.situation2.value.type)
          pdf.setFontSize(p.situation2.value.size)
          pdf.text(p.situation2.pos[0] + p.situation2.htab[1], p.situation2.pos[1] + offset, d.value)
          offset = offset + p.situation2.value.intra * (d.value.split('\n').length - 1) + p.situation2.value.inter
        })
      } // situation administrative 2ème section
      if (p.historique.render) { // historique
        pdf.setFontType(p.historique.title.type)
        pdf.setFontSize(p.historique.title.size)
        pdf.text(p.historique.pos[0], p.historique.pos[1], 'Historique du véhicule')
        pdf.setFontType(p.historique.content.type)
        pdf.setFontSize(p.historique.content.size)
        let i = 0
        let countHisto = 0
        let column = 0
        self.v.historique.forEach(function (o) {
          if (self.v.historique.length > p.historique.limit && countHisto === Math.round((self.v.historique.length / 2))) {
            // si la limite est atteinte on passe sur 2 colonnes
            column = p.historique.pos[2] // On passe sur la deuxième colonne
            i = 0 // on repart du haut du tableau
          }
          let splitText = pdf.getTextDimensions(o.nature)
          pdf.text(p.historique.pos[0] + p.historique.htab[0] + column, p.historique.pos[1] + p.historique.inter + p.historique.content.inter * (i), o.date)
          if (splitText.w >= p.historique.maxLengthText && self.v.historique.length > p.historique.limit) {
            // Si on est dans le cas de double colonne on passe en multiligne
            let split = pdf.splitTextToSize(o.nature, p.historique.splitText)
            split.forEach(s => {
              pdf.text(p.historique.pos[0] + p.historique.htab[1] + column, p.historique.pos[1] + p.historique.inter + p.historique.content.inter * (i++), s)
            })
          } else {
            pdf.text(p.historique.pos[0] + p.historique.htab[1] + column, p.historique.pos[1] + p.historique.inter + p.historique.content.inter * (i++), o.nature)
          }
          countHisto++
        })
      } // historique
      if (p.date.render) { // date certificat
        pdf.setFontType(p.date.title.type)
        pdf.setFontSize(p.date.title.size)
        pdf.text(p.date.pos[0], p.date.pos[1], 'Certificat attestant la situation administrative au :')
        pdf.setFontType(p.date.content.type)
        pdf.setFontSize(p.date.content.size)
        let date = new Date()
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        pdf.text(p.date.pos[0] + p.date.htab[0], p.date.pos[1] + p.date.inter, date.toLocaleDateString('fr-FR', options) + ' à ' + self.pad(date.getHours(), 2) + 'h' + self.pad(date.getMinutes(), 2))
      } // date certificat
      if (p.mentions.render) { // mentions légales
        pdf.setFontType(p.mentions.content.type)
        pdf.setFontSize(p.mentions.content.size)
        let i = 0
        pdf.text(p.mentions.pos[0], p.mentions.pos[1] + p.mentions.inter * (i++), 'La valeur du certificat de situation administrative détaillé ne saurait excéder 15 jours, les données étant susceptibles')
        pdf.text(p.mentions.pos[0], p.mentions.pos[1] + p.mentions.inter * (i++), 'd\'évoluer. Le QR code ci-contre renvoie au site ' + self.baseurl + ' - il permet de vous assurer de la')
        pdf.text(p.mentions.pos[0], p.mentions.pos[1] + p.mentions.inter * (i++), 'conformité des informations retranscrites et de leurs mises à jour. Ce code sera disponible jusqu\'au changement de')
        pdf.text(p.mentions.pos[0], p.mentions.pos[1] + p.mentions.inter * (i++), 'titulaire et au plus tard jusqu\'au ' + self.validityDate + '. Au-delà, un nouveau rapport devra être généré.')
      } // mentions légales

      pdf.save('rapport.pdf')
    }
  }
}

</script>
