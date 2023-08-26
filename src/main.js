import './assets/base.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VeeValidatePlugin from './includes/validation'
import App from './App.vue'
import router from './router'
import { auth } from './includes/firebase'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import MasonryWall from '@yeger/vue-masonry-wall'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

var app
auth.onAuthStateChanged(() => {
  if (!app) {
    const app = createApp(App)

    app.component('VueDatePicker', VueDatePicker)
    app.use(MasonryWall)
    app.use(createPinia())
    app.use(VueSweetalert2);
    app.use(router)
    app.use(VeeValidatePlugin)

    app.mount('#app')
  }
})
