<template>
  <v-app>
    <AppHeader />
    <v-content>
      <Dashboard />
    </v-content>
    <AppFooter />
  </v-app>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import Dashboard from '@/components/Dashboard'
import AppFooter from '@/components/AppFooter'

export default {
  name: 'App',
  components: {
    AppHeader,
    Dashboard,
    AppFooter
  }
}
</script>
