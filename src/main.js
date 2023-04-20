import { createApp } from 'vue'
import App from './App.vue'

import componentsUI from '@/components/UI'

import router from '@/router/router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
//import * as components from 'vuetify/components'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VDataTable } from 'vuetify/labs/VDataTable'
//import { VTabs } from 'vuetify/components/VTabs'
//import { VDivider } from 'vuetify/components/VDivider'
//import { VWindow } from 'vuetify/components/VWindow'

//Icons
//import 'material-design-icons-iconfont/dist/material-design-icons.css'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const app = createApp(App)

console.log(componentsUI)

componentsUI.forEach(component =>{
    app.component(component.name, component)
})

const vuetify = createVuetify({
  components: {
    ...components,
    VDataTable,
    /*VTabs,
    VDivider,
    VWindow*/
  },
  directives,
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
            primary: "#504136",
            secondary: "#EFEBE9",
            accent: "#004D40",
            error: "#7776BC",
            warning: "#007EA7",
            info: "#2196f3",
            success: "#83E8BA"
        }
      },
      dark: {
        dark: true,
        colors: {
            primary: "#504136",
            secondary: "#EFEBE9",
            accent: "#004D40",
            error: "#7776BC",
            warning: "#007EA7",
            info: "#2196f3",
            success: "#83E8BA"
        }
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    }
  },
})

app
    .use(router)
    .use(vuetify)
    .mount('#app')
