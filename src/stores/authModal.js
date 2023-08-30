import { defineStore } from 'pinia'

export default defineStore('authModal', {
  state: () => ({
    isOpen: false
  }),
  getters: {
    hiddenClass() {
      return this.isOpen ? '' : 'hidden'
    }
  }
})
