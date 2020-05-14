<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">COVID 19 Dashboard</div>
      <v-spacer></v-spacer>
      <v-btn text @click="showAbout = true">About</v-btn>
    </v-app-bar>

    <v-content>
      <Dashboard />
    </v-content>
    <About :dialog="showAbout" v-on:close-about="closeDialog" />
  </v-app>
</template>

<script>
import Dashboard from './components/Dashboard'
import About from './components/About'

export default {
  name: 'App',

  components: {
    Dashboard,
    About
  },

  data: () => ({
    showAbout: false
  }),
  methods: {
    closeDialog () {
      this.showAbout = false
    }
  }
}
</script>
