<template>
  <!-- Auth Modal -->
  <div class="fixed z-50 inset-0 overflow-y-auto" id="modal" :class="hiddenClass">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
      >
        <div class="py-2 text-left px-2">
          <!--Title-->
          <div
            class="modal-close text-sm text-gray-500 text-right cursor-pointer z-50"
            @click="modalVisibility = false"
          >
            <i class="fas fa-times"></i>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div class="col-span-1 flex items-center justify-center" :class="{'order-last' : tab === 'login'}">             
                <img src="../../public/assets/login2.jpg" />              
            </div>

            <div class="col-span-1">
              <h1 class="text-emerald-600 bold text-3xl text-center" style="font-family: cursive;">Kaaraat</h1>
              <app-login :tab="tab" @updateTab="tab = 'register'" v-if="tab === 'login'" />
              <app-register :tab="tab" @updateTab="tab = 'login'" v-else />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapWritableState } from 'pinia'
import useAuthModalStore from '@/stores/authModal'
import AppLogin from '@/components/Login.vue'
import AppRegister from '@/components/Register.vue'

export default {
  name: 'Authentication',
  components: { AppLogin, AppRegister },
  data() {
    return {
      tab: 'login'
    }
  },
  computed: {
    ...mapState(useAuthModalStore, ['hiddenClass']),
    ...mapWritableState(useAuthModalStore, {
      modalVisibility: 'isOpen'
    })
  }
}
</script>
