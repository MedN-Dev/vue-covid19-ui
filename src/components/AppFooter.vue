<template>
  <v-footer color="primary" app>
    <span class="white--text">{{ info }}</span>
    <v-spacer />
    <span class="white--text">&copy; 2020</span>
  </v-footer>
</template>

<script>
export default {
  name: 'AppFooter',
  computed: {
    info () {
      return process.env.NODE_ENV + ': ' + process.env.VUE_APP_VERSION
    }
  }
}
</script>
