<template>
  <v-container fluid>
    <v-row align="center">
      <v-col cols="12">
        <v-toolbar-title>Countries selection</v-toolbar-title>
        <v-autocomplete
          :items="country"
          :loading="isLoading"
          :search-input.sync="search"
          hide-no-data
          hide-selected
          label="Countries"
          return-object
          :value="location"
          outlined
          @change="fetchLocationData"
        />
      </v-col>

      <v-col cols="12">
        <v-card>
          <v-toolbar color="light-green" dark>
            <v-toolbar-title>COVID 19 Total Cumulative Cases - {{location}}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <line-chart :chart-data="lineData" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-toolbar color="light-green" dark>
            <v-toolbar-title>COVID 19 Daily New Cases - {{location}}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <bar-chart :chart-data="barData" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import LineChart from './LineChart.js'
import BarChart from './BarChart.js'

export default {
  components: { LineChart, BarChart },
  data: function () {
    return {
      lineData: {
        labels: [],
        datasets: []
      },
      barData: {
        labels: [],
        datasets: []
      },
      chartColors: {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)'
      },
      country: [],
      gData: {
        labels: [],
        datasets: []
      },
      location: 'Canada',
      model: null,
      search: null,
      isLoading: false,
      loading: true,
      errored: false
    }
  },
  methods: {
    async getGlobal () {
      const res = await fetch('https://api.covid19api.com/summary')
      const data = await res.json()
      const gDataOpts = [
        { id: 1, color: 'blue', label: 'NewConfirmed' },
        { id: 2, color: 'red', label: 'NewDeaths' },
        { id: 3, color: 'red', label: 'NewRecovered' }
      ]
      this.gData = this.getUpdatedCartData(data.Global, gDataOpts)
    },
    getUpdatedCartData (data, opts) {
      const datasets = opts.map(element => {
        return {
          label: element.label,
          data: data.data.map(item => item[element.label])
        }
      })
      console.log(datasets)
      return {
        labels: data.data.map(item => {
          return item.Global
        }),
        datasets: datasets
      }
    },
    fetchLocationData (location) {
      axios.get(`https://api.covid19api.com/country/${location}`).then(data => {
        this.location = location
        const lineDataOpts = [
          { id: 1, color: 'blue', label: 'Confirmed' }, // total Active
          { id: 2, color: 'red', label: 'Deaths' } // total deaths
        ]
        const barDataOpts = [
          { id: 3, color: 'green', label: 'Recovered' }, // daily new cases
          { id: 4, color: 'red', label: 'Active' } // daily deaths
        ]
        this.lineData = this.getUpdatedChartData(data, lineDataOpts)
        this.barData = this.getUpdatedChartData(data, barDataOpts)
      })
    },
    getUpdatedChartData (data, opts) {
      const datasets = opts.map(element => {
        return {
          label: element.label,
          fill: false,
          borderColor: this.chartColors[element.color],
          backgroundColor: this.chartColors[element.color],
          pointBackgroundColor: 'white',
          borderWidth: 1,
          pointBorderColor: '#249EBF',
          data: data.data.map(item => item[element.label])
        }
      })
      return {
        labels: data.data.map(item => {
          return moment(item.Date).format('YYYY-MM-DD')
        }),
        datasets: datasets
      }
    }
  },
  watch: {
    search (val) {
      if (this.fetchLocationData.length > 0) return
      if (this.isLoading) return
      this.isLoading = true
      fetch('https://api.covid19api.com/countries')
        .then(res => res.json())
        .then(res => {
          const { count, Country } = res
          this.count = count
          this.Country = Country
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    }
  },
  mounted () {
    this.getGlobal()
    axios
      .get('https://api.covid19api.com/countries')
      .then(response => {
        this.country = response.data.map(item => {
          return item.Country
        })
      })
      .then(this.fetchLocationData(this.location))
      .catch(error => {
        console.log(error)
        this.errored = true
      })
  }
}
</script>
