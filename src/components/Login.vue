<template>
  <div class="px-12 py-5">
    <!-- Login Form -->
    <vee-form :validation-schema="loginSchema" @submit="login">
      <!-- Email -->
      <div class="mb-3">
        <div class="input-wrp relative">
          <br />
          <vee-field
            name="email"
            type="email"
            placeholder="Email"
            class="inputText block w-full py-1 text-gray-800 border-b border-gray-300 transition duration-500 focus:outline-none focus:border-black"
          />
          <span class="floating-label absolute ease-all duration-200 text-gray-500">Email</span>
          <ErrorMessage class="text-red-500 text-xs" name="email" />
        </div>
      </div>
      <!-- Password -->
      <div class="mb-3">
        <div class="input-wrp relative">
          <br />
          <vee-field
            name="password"
            type="password"
            placeholder="Password"
            class="inputText block w-full py-1 text-gray-800 border-b border-gray-300 transition duration-500 focus:outline-none focus:border-black"
          />
          <span class="floating-label absolute ease-all duration-200 text-gray-500">Password</span>
          <ErrorMessage class="text-red-500 text-xs" name="password" />
        </div>
      </div>

      <button
        type="submit"
        class="block m-auto mt-8 w-1/2 bg-zinc-500 text-white py-1.5 px-3 rounded-full transition"
        :disabled="login_in_submission"
      >
        <svg
          v-if="login_in_submission"
          aria-hidden="true"
          role="status"
          class="inline w-4 h-4 mr-1 text-white animate-spin"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="#E5E7EB"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentColor"
          />
        </svg>
        Sign in
      </button>

      <div
        class="text-white text-center text-xs"
        :class="login_alert_variant"
        v-if="login_show_alert"
      >
        {{ login_alert_text }}
      </div>

      <div class="text-center text-zinc-500 mt-5">
        Don't have an account yet?
        <a class="hover:text-emerald-700 text-emerald-600 border-b" href="#" @click.prevent="updateTab"
          >Create Account</a
        >
      </div>
    </vee-form>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import useUserStore from '@/stores/user'

export default {
  name: 'LoginForm',
  props: ['tab'],
  data() {
    return {
      loginSchema: {
        email: 'required|email',
        password: 'required|min:6|max:100'
      },
      login_show_alert: false,
      login_alert_variant: 'text-blue-500',
      login_alert_text: 'Please wait! We are logging you in.',
      login_in_submission: false
    }
  },
  methods: {
    ...mapActions(useUserStore, ['authenticate']),
    async login(values) {
      this.login_show_alert = true
      this.login_in_submission = true
      this.login_alert_variant = 'text-blue-500'
      this.login_alert_text = 'Please wait! We are logging you in.'

      try {
        await this.authenticate(values)
      } catch (error) {
        this.login_in_submission = false
        this.login_alert_variant = 'text-red-500'
        this.login_alert_text = 'Invalid login'
      }

      this.login_alert_variant = 'text-green-500'
      this.login_alert_text = 'Success! You are logged in'

      window.location.reload()
    },
    updateTab() {
      this.$emit('updateTab')
    }
  }
}
</script>

<style>
.input-wrp .floating-label {
  pointer-events: none;
  top: 24px;
  opacity: 0;
}

.input-wrp input:not(:placeholder-shown) ~ .floating-label {
  top: 5px;
  font-size: 13px;
  opacity: 1;
}
</style>
