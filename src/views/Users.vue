<template>
  <main class="container mx-auto px-4 my-5 py-5 mx-auto max-w-6xl">
    <div class="grid gap-5 my-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div
        v-for="(user, index) in users"
        :key="user.username"
        class="flex items-center justify-center rounded-lg relative z-10"
      >
        <!--  {{ user }} -->
        <div class="rounded-lg bg-white h-full w-full relative z-10" style="min-height: 300px">
          <div
            class="rounded-lg bg-center bg-cover bg-no-repeat relative h-4/6"
            :style="{
              backgroundImage: `url(../../public/assets/user${(index % 8) + 1}.png)`
            }"
          >
            <div
              class="absolute bottom-0 text-white w-full text-2xl flex items-center justify-start px-3 h-10 bg-black bg-opacity-40"
            >
              {{ user.username }}
            </div>
          </div>

          <div class="w-full flex py-4 shadow-md shadow-gray-400">
            <div
              class="text-center w-1/3 border-r border-gray-100 text-zinc-400 font-light text-sm md:text-lg"
            >
              all tasks<br /><span class="text-2xl md:text-3xl">{{ user.all }}</span>
            </div>
            <div
              class="text-center w-1/3 border-r border-gray-100 text-zinc-400 font-light text-sm md:text-lg"
            >
              succeed<br /><span class="text-2xl md:text-3xl text-green-600"
                >{{ user.succeed }}%</span
              >
            </div>
            <div class="text-center w-1/3 text-zinc-400 font-light text-sm md:text-lg">
              failed<br /><span class="text-2xl md:text-3xl text-red-600">{{ user.failed }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { tasksCollection, usersCollection } from '@/includes/firebase'

export default {
  data() {
    return {
      users: []
    }
  },
  async created() {
    const snapshot = await tasksCollection.get()
    var tasks = []

    snapshot.forEach((document) => {
      tasks.push({
        ...document.data()
      })
    })

    tasks = tasks.reduce((acc, cur) => {
      const uid = cur.uid
      if (!acc[uid]) {
        acc[uid] = []
      }
      acc[uid].push(cur)
      return acc
    }, {})

    Object.keys(tasks).forEach(async(key) => {
      let all = tasks[key].length
      let succeed = 0
      let failed = 0
      tasks[key].forEach((item) => {
        if (item.done) succeed++
        else if (!item.done && item.dead) failed++
      })

      const snapshot = await usersCollection.doc(key).get()

      this.users.push({
        username: snapshot.data().name,
        all: all,
        succeed: ((succeed / all) * 100).toFixed(0),
        failed: ((failed / all) * 100).toFixed(0)
      })
    })
  }
}
</script>
