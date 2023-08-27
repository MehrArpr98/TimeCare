<template>
  <main class="container mx-auto px-4 my-5 py-5 mx-auto max-w-6xl">
    <div class="grid gap-5 my-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div
        v-for="user in users"
        :key="user.userID"
        class="flex items-center justify-center border rounded-lg relative z-10"
      >
        {{ user }}
      </div>
    </div>
  </main>
</template>

<script>
import { usersCollection } from '@/includes/firebase'

export default {
  data() {
    return {
      users: []
    }
  },
  async created() {
    const snapshot = await usersCollection.get()

    snapshot.forEach((document) => {
      this.users.push({
        userID: document.id,
        ...document.data()
      })
    })
  }
}
</script>
