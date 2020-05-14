<template>
  <div>
    <v-app-bar app dense dark flat color="primary">
      <v-toolbar-title> COVID-19 Dashboard </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="showAbout = true">About</v-btn>
    </v-app-bar>
    <About :dialog="showAbout" v-on:close-about="closeDialog" />
  </div>
</template>

<script>
import About from './About'

export default {
  name: 'AppHeader',
  components: {
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
