import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#393f51',
        secondary: '#2a2e3c',
        accent: '#008fdf',
        error: '#f35b54',
        info: '#10a699',
        success: '#18BC4B',
        warning: '#ff7833'
      }
    }
  },
  options: {
    customProperties: true
  },
  icons: {
    iconfont: 'mdiSvg'
  }
})
