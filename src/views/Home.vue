<template>
  <main v-if="userLoggedIn" class="container mx-auto py-2 px-4">
    <!-- Add new task button -->
    <button
      class="fixed bottom-2 right-2 block z-50 font-2xl text-white border-4 border-white rounded-full bg-emerald-500 w-16 h-16 hover:bg-emerald-600 hover:w-20 hover:h-20 ease-all duration-300"
      @click="showAddModal = true"
    >
      <i class="fa fa-plus"></i>
    </button>

    <!-- Searchbox and options -->
    <div class="border-b flex justify-between max-w-6xl mx-auto my-5 py-5">
      <div class="bg-zinc-100 h-10 max-w-sm w-1/2 flex items-center rounded-full border">
        <a id="search-box-icon" class="text-md my-1 pl-3"><i class="fa fa-search"></i></a>
        <input
          type="text"
          placeholder="Search..."
          name="search"
          class="border-0 w-full rounded-full bg-zinc-100 pl-1 focus:border-0 focus:outline-0"
          v-model="searched"
        />
      </div>
      <div class="flex">
        <button
          class="block mx-2 font-2xl h-10 z-50 rounded-full px-3 bg-gray-500 hover:bg-gray-600 text-white ease-all duration-300 flex items-center"
          @click="hideDead = !hideDead"
        >
          <i class="fa fa-times pr-1" v-if="hideDead"></i>
          <i class="fas fa-broom md:hidden inline"></i>
          <span class="hidden md:inline">Hide dead tasks</span>
        </button>
        <button
          class="block font-2xl h-10 z-50 rounded-full px-3 bg-pink-500 hover:bg-pink-600 text-white ease-all duration-300 flex items-center"
          @click="sorted = !sorted"
        >
          <i class="fa fa-times pr-1" v-if="sorted"></i>
          <i class="fa fa-sort-amount-asc md:hidden inline"></i>
          <span class="hidden md:inline"> Sort by deadlin</span>
        </button>
      </div>
    </div>

    <new-task-modal
      :showAddModal="showAddModal"
      @showAddModal="showAddModal = false"
      :addToTasks="addToTasks"
    />

    <!-- Tasks container -->
    <div
      class="grid-container grid gap-5 max-w-6xl mx-auto my-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <div
        id="bg-div"
        :class="{
          short: task.text.length < 50,
          tall: task.text.length < 120 && task.text.length >= 50,
          taller: task.text.length >= 120
        }"
        v-for="(task, index) in filteredTasks"
        :key="task.taskID"
        class="flex items-center justify-center border rounded-lg relative z-10"
      >
        <Task
          :index="index"
          :sorted="sorted"
          :task="task"
          :hideDead="hideDead"
          :removeFromTasks="removeFromTasks"
          :setDeadTasks="setDeadTasks"
          :setDoneTasks="setDoneTasks"
        />
      </div>
    </div>
  </main>
  <main v-else class="container mx-auto py-2 px-4">
<div class="border-b flex justify-between max-w-6xl mx-auto my-5 py-5">

</div>
  </main>
</template>

<script>
import NewTaskModal from '../components/NewTaskModal.vue'
import { auth, tasksCollection } from '@/includes/firebase'
import Task from '../components/Task.vue'
import useUserStore from '@/stores/user'
import { mapState } from 'pinia'

export default {
  components: { NewTaskModal, Task },
  data() {
    return {
      tasks: [],
      showAddModal: false,
      startDate: new Date(),
      searched: '',
      sorted: false,
      hideDead: false
    }
  },
  async created() {
    if(!auth.currentUser)
    return
    const snapshot = await tasksCollection.where('uid', '==', auth.currentUser.uid).get()

    snapshot.forEach((document) => {
      this.tasks.push({
        taskID: document.id,
        ...document.data()
      })
    })
  },
  methods: {
    removeFromTasks(id) {
      this.tasks.forEach((task, index) => {
        if (task.taskID == id) this.tasks.splice(index, 1)
      })
    },
    async addToTasks() {
      this.tasks = []
      const snapshot = await tasksCollection.where('uid', '==', auth.currentUser.uid).get()

      snapshot.forEach((document) => {
        this.tasks.push({
          taskID: document.id,
          ...document.data()
        })
      })
    },
    setDeadTasks(id) {
      this.tasks.forEach((task) => {
        if (task.taskID == id) task.dead = true
      })
    },
    setDoneTasks(id) {
      this.tasks.forEach((task) => {
        if (task.taskID == id) task.done = true
      })
    }
  },
  computed: {
    ...mapState(useUserStore,['userLoggedIn']),
    filteredTasks() {
      let temp = [...this.tasks]

      if (this.sorted) {
        temp = temp.sort(function (a, b) {
          return new Date(a.date) - new Date(b.date)
        })
      } else {
        temp = [...temp]
      }

      if (this.hideDead) {
        temp = temp.filter((item) => {
          return !item.dead
        })
      } else {
        temp = [...temp]
      }

      temp = temp.filter((item) => {
        return item.text.toUpperCase().includes(this.searched.toUpperCase())
      })
      return temp
    }
  }
}
</script>

<style>
.grid-container {
  grid-auto-rows: 50px; 
}

.short {
  grid-row: span 3; 
}

.tall {
  grid-row: span 4;
}

.taller {
  grid-row: span 5;
}

.tallest {
  grid-row: span 6;
}

</style>
