<template>
  <div>
    <app-header />

    <router-view></router-view>

    <Authentication />
  </div>
</template>

<script>
import AppHeader from './components/Header.vue'
import Authentication from './components/Authentication.vue'
import { auth } from './includes/firebase'
import { mapWritableState } from 'pinia'
import useUserStore from './stores/user'

export default {
  name: 'App',
  components: { AppHeader, Authentication },
  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn']),
  },
  created() {
    if (auth.currentUser) this.userLoggedIn = true
    
  }
}
</script>
