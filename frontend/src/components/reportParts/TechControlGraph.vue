<script>

import labels from '@/assets/json/techControl.json'
import orderBy from 'lodash.orderby'
import { Line } from 'vue-chartjs'
import moment from 'moment'

export default {
  extends: Line,
  props: {
    ct: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      colors: {
        A: 'DarkSeaGreen',
        AP: 'DarkSeaGreen',
        S: 'DarkOrange',
        SP: 'DarkOrange',
        R: 'OrangeRed',
        RP: 'OrangeRed',
        X: 'DarkGrey'
      }
    }
  },
  computed: {
    options () {
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'year'
            }
          }],
          yAxes: [{
            display: true,
            ticks: {
              beginAtZero: true
            }
          }]
        },
        tooltips: {
          callbacks: {
            title: (tooltipItem) => {
              let text = ''
              text += 'le '
              text += moment(tooltipItem.xLabel).format('DD/MM/YYYY')
              text += ': '
              text += Math.round(tooltipItem[0].yLabel * 100) / 100
              text += ' km'
              return text
            },
            label: (tooltipItem) => {
              let text = ''
              text = this.nature[tooltipItem.index]
              text += ': '
              text += this.resultat[tooltipItem.index]
              return text;
            }
          }
        }
      }
    },
    data () {
      return orderBy(this.ct.map((controle) => this.controlToPoint(controle)), ['x'], ['asc'])
    },
    pointColors () {
      return orderBy(this.ct.map((controle) => this.colors[controle.ct_resultat]), ['x'], ['asc'])
    },
    nature () {
      return orderBy(this.ct.map((controle) => labels.nature[controle.ct_nature]), ['x'], ['asc'])
    },
    resultat () {
      return orderBy(this.ct.map((controle) => labels.resultat[controle.ct_resultat]), ['x'], ['asc'])
    },
    lineData () {
      if (this.ct.length > 0) {
        return {
          datasets: [
            {
              label: 'kilomètres',
              data: this.data,
              pointBackgroundColor: this.pointColors,
              pointBorderColor: this.pointColors,
              pointHoverBackgroundColor: this.pointColors,
              pointHoverBorderColor: this.pointColors,
              pointRadius: 5,
              pointHoverRadius: 10,
            }
          ]
        }
      } else {
        return []
      }
    },
  },
  mounted () {
    this.$store.dispatch('log', `${this.$route.path}/kilometers`)

    this.renderChart(this.lineData, this.options)
  },
  methods: {
    controlToPoint (controle) {
      return {
        x: moment(controle.ct_date, 'YYYY-MM-DD').toDate(),
        y: ((typeof controle.ct_km) === 'string') ? parseInt(controle.ct_km) : controle.ct_km,
      }
    }
  }
}

</script>
