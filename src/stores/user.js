import { defineStore } from 'pinia'
import { auth, usersCollection } from '../includes/firebase'

export default defineStore('user', {
  state: () => ({
    userLoggedIn: false
  }),
  actions: {
    async register(values) {
      const userCred = await auth.createUserWithEmailAndPassword(values.email, values.password)

      await usersCollection.doc(userCred.user.uid).set({
        name: values.name,
        email: values.email,
      })

      await userCred.user.updateProfile({
        displayName: values.name
        /* photoURL: "https://example.com/jane-q-user/profile.jpg" */
      })

      this.userLoggedIn = true
    },
     async authenticate(values) {
      await auth.signInWithEmailAndPassword(values.email, values.password)

      this.userLoggedIn = true
    },
    async signOut() {
      await auth.signOut()

      this.userLoggedIn = false
    } 
  }
})
