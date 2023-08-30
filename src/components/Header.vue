<template>
  <header id="header" class="z-50 bg-gray-200">
    <nav class="py-2 px-4">
      <div class="w-full">
        <div class="flex justify-between w-full items-center">
          <div class="flex w-full">
            <div>
              <!-- Website Logo -->
              <router-link
                class="text-black text-l text-xl md:text-3xl mr-8 flex font-medium ease-in duration-300 font-mono"
                exact-active-class="no-active"
                :to="{ name: 'home' }"
              >
                <img src="../../public/timecare.png" class="h-14 mr-1" />
              </router-link>
            </div>

            <div class="flex-grow items-center md:flex w-full">
              <!-- Primary Navigation -->
              <div
                class="flex flex-row justify-end md:justify-between items-center mt-1 text-zinc-400 w-full"
              >
                <!-- Navigation Links -->
                <div class="hidden md:inline">
                  <router-link class="px-2 mx-2" :to="{ name: 'home' }">Home</router-link>
                  <router-link class="px-2 mx-2" :to="{ name: 'users' }">Users</router-link>
                </div>
                <!-- Mobile menu button -->
                <div class="md:hidden flex items-center mr-9 mt-4">
                  <button class="outline-none mobile-menu-button" @click="toggleMenu">
                    <i
                      class="fa w-6 h-6 text-gray-500 text-3xl"
                      :class="[isOpenMobileMenu ? 'fa-times' : 'fa-bars']"
                    ></i>
                  </button>
                </div>
                <div v-if="!userStore.userLoggedIn">
                  <div
                    class="md:pr-3 pr-0 border-0 py-1.5 pl-7 border-gray-500 md:border-r md:border-t md:border-b rounded text-sm font-light ease-all duration-300 cursor-pointer relative text-neutral-600 hover:text-neutral-800 hover:border-neutral-700"
                    @click.prevent="toggleAuthModal"
                  >
                    <span class="absolute -top-1 -left-3">
                      <i
                        class="fas fa-share fa-stack-1x absolute -left-5 text-xl text-neutral-400"
                      ></i>
                      <i class="fa fa-user-circle mr-1 text-4xl"></i> </span
                    ><span class="hidden md:inline">Login | Register</span>
                  </div>
                </div>

                <div v-else>
                  <div
                    class="md:pr-3 pr-0 border-0 py-1.5 pl-7 border-gray-500 md:border-r md:border-t md:border-b rounded text-sm font-light ease-all duration-300 cursor-pointer relative text-neutral-600 hover:text-neutral-800 hover:border-neutral-700"
                    @click.prevent="signOut"
                  >
                    <span class="absolute -top-1 -left-3">
                      <i
                        class="fas fa-share -scale-x-100 fa-stack-1x absolute -left-5 text-xl text-neutral-400"
                      ></i>
                      <i class="fa fa-user-circle mr-1 text-4xl"></i> </span
                    ><span class="hidden md:inline">Logout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- mobile menu -->
      <div
        class="bg-white border md:hidden mobile-menu z-50 mt-2"
        :class="{ hidden: !isOpenMobileMenu }"
      >
        <ul class=" ">
          <li>
            <router-link class="block text-sm px-2 py-2" :to="{ name: 'home' }">Home</router-link>
          </li>
          <li>
            <router-link class="block text-sm px-2 py-2" :to="{ name: 'users' }">Users</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
<script>
import { mapStores } from 'pinia'
import useAuthModalStore from '@/stores/authModal'
import useUserStore from '@/stores/user'

export default {
  name: 'AppHeader',
  data() {
    return {
      logoAddress: '',
      isOpenMobileMenu: false
    }
  },
  computed: {
    ...mapStores(useAuthModalStore, useUserStore)
  },
  methods: {
    toggleAuthModal() {
      this.authModalStore.isOpen = !this.authModalStore.isOpen
    },
    toggleMenu() {
      this.isOpenMobileMenu = !this.isOpenMobileMenu
    },
    signOut() {
      this.userStore.signOut()

      if (this.$route.name === 'manage') this.$router.push({ name: 'home' })
    }
  }
}
</script>
