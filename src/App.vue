<template>
  <div>
    <app-header v-if="userLoggedIn"/>

    <router-view v-if="userLoggedIn"></router-view>

    <Authentication v-else/>
  </div>
</template>

<script>
import AppHeader from './components/Header.vue'
import Authentication from './components/Authentication.vue'
import { auth } from './includes/firebase'
import { mapWritableState } from 'pinia'
import useUserStore from './stores/user'
import useAuthModalStore from './stores/authModal'

export default {
  name: 'App',
  components: { AppHeader, Authentication },
  computed: {
    ...mapWritableState(useUserStore, ['userLoggedIn']),
    ...mapWritableState(useAuthModalStore,['isOpen'])
  },
  created() {
    if (auth.currentUser) this.userLoggedIn = true
    else this.isOpen = true
  }
}
</script>
